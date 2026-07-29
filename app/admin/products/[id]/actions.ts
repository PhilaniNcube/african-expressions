'use server';

import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import sharp from 'sharp';
import { revalidatePath, revalidateTag } from 'next/cache';

import { db } from '@/db';
import { products } from '@/db/schema';
import { deleteFromR2, getR2PublicUrl, R2_PUBLIC_URL, uploadToR2 } from '@/lib/r2';

export type UpdateProductFieldName =
  | 'name'
  | 'slug'
  | 'type'
  | 'description'
  | 'composition'
  | 'yarn_weight'
  | 'ball_weight'
  | 'yarn_length'
  | 'tension'
  | 'needle_size'
  | 'price'
  | 'main_image'
  | 'images';

export type UpdateProductState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<UpdateProductFieldName, string>>;
};

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

function getTextField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getSanitizedFileName(file: File): string {
  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
  const sanitized = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, '_').trim();
  return sanitized || 'image';
}

function getR2KeyFromUrl(url: string) {
  if (!url) return null;
  const prefix = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/`;
  if (!url.startsWith(prefix)) return null;
  return url.slice(prefix.length);
}

async function deleteObjects(keys: string[], logLabel: string) {
  const uniqueKeys = [...new Set(keys.filter(Boolean))];
  const results = await Promise.allSettled(uniqueKeys.map((key) => deleteFromR2(key)));

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Failed to ${logLabel}: ${uniqueKeys[index]}`, result.reason);
    }
  });
}

export async function updateProduct(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const id = getTextField(formData, 'id');
  const name = getTextField(formData, 'name');
  const slug = getTextField(formData, 'slug');
  const type = getTextField(formData, 'type');
  const description = getTextField(formData, 'description');
  const composition = getTextField(formData, 'composition');
  const yarnWeight = getTextField(formData, 'yarn_weight');
  const ballWeightStr = getTextField(formData, 'ball_weight');
  const yarnLengthStr = getTextField(formData, 'yarn_length');
  const tension = getTextField(formData, 'tension');
  const needleSize = getTextField(formData, 'needle_size');
  const price = getTextField(formData, 'price');

  const selectedMainImageUrl = getTextField(formData, 'selected_main_image_url');
  const retainedImagesJson = getTextField(formData, 'retained_images');

  const mainImageFile = formData.get('main_image_file');
  const newColorImageFiles = formData.getAll('new_color_images');

  const fieldErrors: Partial<Record<UpdateProductFieldName, string>> = {};

  if (!id) {
    return {
      success: false,
      error: 'Product ID is missing. Reload the page and try again.',
    };
  }

  if (!name) fieldErrors.name = 'Yarn name is required.';
  if (!slug) fieldErrors.slug = 'Slug is required.';
  if (!type) fieldErrors.type = 'Product type is required.';
  if (!description) fieldErrors.description = 'Description is required.';
  if (!composition) fieldErrors.composition = 'Composition is required.';
  if (!yarnWeight) fieldErrors.yarn_weight = 'Yarn weight is required.';

  const ballWeight = parseInt(ballWeightStr, 10);
  if (isNaN(ballWeight) || ballWeight <= 0) {
    fieldErrors.ball_weight = 'Enter a valid ball weight in grams (e.g. 50).';
  }

  const yarnLength = parseInt(yarnLengthStr, 10);
  if (isNaN(yarnLength) || yarnLength <= 0) {
    fieldErrors.yarn_length = 'Enter a valid yarn length in meters (e.g. 100).';
  }

  if (mainImageFile instanceof File && mainImageFile.size > 0) {
    if (!allowedImageTypes.has(mainImageFile.type)) {
      fieldErrors.main_image = 'Upload a PNG, JPEG, WebP, or AVIF image for main image.';
    }
  }

  for (const file of newColorImageFiles) {
    if (file instanceof File && file.size > 0) {
      if (!allowedImageTypes.has(file.type)) {
        fieldErrors.images = 'One or more color image files are not valid PNG, JPEG, WebP, or AVIF images.';
        break;
      }
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: 'Please fix the highlighted errors below.',
      fieldErrors,
    };
  }

  // Fetch existing product row
  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .then((rows) => rows[0] ?? null);

  if (!existingProduct) {
    return {
      success: false,
      error: 'Product not found in database.',
    };
  }

  let retainedImages: string[] = [];
  try {
    retainedImages = retainedImagesJson ? JSON.parse(retainedImagesJson) : existingProduct.images;
  } catch (err) {
    retainedImages = existingProduct.images;
  }

  const uploadedKeys: string[] = [];
  const keysToDelete: string[] = [];

  let nextMainImageUrl = selectedMainImageUrl || existingProduct.main_image;

  try {
    // 1. Process Main Image File Upload if provided
    if (mainImageFile instanceof File && mainImageFile.size > 0) {
      const imageInput = Buffer.from(await mainImageFile.arrayBuffer());
      const imageBuffer = await sharp(imageInput).webp({ quality: 75, effort: 4 }).toBuffer();
      const baseName = getSanitizedFileName(mainImageFile);
      const imageKey = `products/${id}/main-${baseName}.webp`;

      await uploadToR2({
        key: imageKey,
        body: imageBuffer,
        contentType: 'image/webp',
      });

      uploadedKeys.push(imageKey);
      nextMainImageUrl = getR2PublicUrl(imageKey);

      const previousMainImageKey = getR2KeyFromUrl(existingProduct.main_image);
      if (previousMainImageKey && previousMainImageKey !== imageKey) {
        keysToDelete.push(previousMainImageKey);
      }
    }

    // 2. Process New Color Images Uploads
    const newlyUploadedColorImageUrls: string[] = [];
    for (const file of newColorImageFiles) {
      if (file instanceof File && file.size > 0) {
        const input = Buffer.from(await file.arrayBuffer());
        const webpBuffer = await sharp(input).webp({ quality: 75, effort: 4 }).toBuffer();
        const baseName = getSanitizedFileName(file);
        const colorKey = `products/${id}/images/${baseName}.webp`;

        await uploadToR2({
          key: colorKey,
          body: webpBuffer,
          contentType: 'image/webp',
        });

        uploadedKeys.push(colorKey);
        newlyUploadedColorImageUrls.push(getR2PublicUrl(colorKey));
      }
    }

    // Final color gallery images list
    const finalImagesList = [...retainedImages, ...newlyUploadedColorImageUrls];

    // Find deleted color image R2 keys to clean up
    const remainingUrlsSet = new Set([nextMainImageUrl, ...finalImagesList]);
    for (const oldUrl of existingProduct.images) {
      if (!remainingUrlsSet.has(oldUrl)) {
        const r2Key = getR2KeyFromUrl(oldUrl);
        if (r2Key) {
          keysToDelete.push(r2Key);
        }
      }
    }

    // 3. Update Database
    await db
      .update(products)
      .set({
        name,
        slug,
        type,
        description,
        composition,
        yarn_weight: yarnWeight,
        ball_weight: ballWeight,
        yarn_length: yarnLength,
        tension: tension || null,
        needle_size: needleSize || null,
        price: price || null,
        main_image: nextMainImageUrl,
        images: finalImagesList,
      })
      .where(eq(products.id, id));
  } catch (error) {
    if (uploadedKeys.length > 0) {
      await deleteObjects(uploadedKeys, 'clean up newly uploaded object');
    }
    console.error('Failed to update product:', error);
    return {
      success: false,
      error: 'Failed to update product details. Please try again.',
    };
  }

  // Delete orphaned old R2 objects
  if (keysToDelete.length > 0) {
    await deleteObjects(keysToDelete, 'delete replaced/removed image object');
  }

  // Revalidate Next.js cache
  revalidateTag('products', 'max');
  revalidatePath('/yarns');
  revalidatePath(`/yarns/${slug}`);
  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);

  return {
    success: true,
    message: 'Yarn updated successfully!',
  };
}
