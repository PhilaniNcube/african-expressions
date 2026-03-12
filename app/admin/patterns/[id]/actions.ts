'use server';

import { randomUUID } from 'node:crypto';

import { eq } from 'drizzle-orm';
import sharp from 'sharp';
import { revalidatePath, revalidateTag } from 'next/cache';

import { db } from '@/db';
import { patterns } from '@/db/schema';
import { deleteFromR2, getR2PublicUrl, R2_PUBLIC_URL, uploadToR2 } from '@/lib/r2';

export type UpdatePatternFieldName =
  | 'name'
  | 'category'
  | 'product'
  | 'stitching'
  | 'image'
  | 'document';

export type UpdatePatternState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<UpdatePatternFieldName, string>>;
};

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const allowedDocumentExtensions = new Set(['pdf', 'doc', 'docx', 'zip', 'rar']);
const documentMimeTypesByExtension: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
};
const allowedDocumentTypes = new Set([
  ...Object.values(documentMimeTypesByExtension),
  'application/vnd.rar',
  'application/octet-stream',
]);

function getTextField(formData: FormData, key: 'id' | 'name' | 'category' | 'product' | 'stitching') {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getUploadedFile(formData: FormData, key: 'image' | 'document') {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function getFileExtension(fileName: string) {
  const match = /\.([a-zA-Z0-9]+)$/.exec(fileName);
  return match?.[1]?.toLowerCase() ?? '';
}

function isAllowedDocument(file: File, extension: string) {
  return allowedDocumentTypes.has(file.type) || allowedDocumentExtensions.has(extension);
}

function getDocumentContentType(file: File, extension: string) {
  if (file.type && file.type !== 'application/octet-stream') {
    return file.type;
  }

  return documentMimeTypesByExtension[extension] ?? 'application/octet-stream';
}

function getR2KeyFromUrl(url: string) {
  const prefix = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/`;

  if (!url.startsWith(prefix)) {
    return null;
  }

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

export async function updatePattern(
  _prevState: UpdatePatternState,
  formData: FormData,
): Promise<UpdatePatternState> {
  const id = getTextField(formData, 'id');
  const name = getTextField(formData, 'name');
  const category = getTextField(formData, 'category');
  const product = getTextField(formData, 'product');
  const stitching = getTextField(formData, 'stitching');
  const imageFile = getUploadedFile(formData, 'image');
  const documentFile = getUploadedFile(formData, 'document');

  const fieldErrors: Partial<Record<UpdatePatternFieldName, string>> = {};

  if (!id) {
    return {
      success: false,
      error: 'Pattern id is missing. Reload the page and try again.',
    };
  }

  if (!name) fieldErrors.name = 'Pattern name is required.';
  if (!category) fieldErrors.category = 'Select a category.';
  if (!product) fieldErrors.product = 'Select a yarn.';
  if (!stitching) fieldErrors.stitching = 'Select a stitching type.';

  if (imageFile && !allowedImageTypes.has(imageFile.type)) {
    fieldErrors.image = 'Upload a PNG, JPEG, WebP, or AVIF image.';
  }

  const documentExtension = documentFile ? getFileExtension(documentFile.name) : '';

  if (documentFile && !isAllowedDocument(documentFile, documentExtension)) {
    fieldErrors.document = 'Upload a PDF, DOC, DOCX, ZIP, or RAR file.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: 'Fix the highlighted fields and try again.',
      fieldErrors,
    };
  }

  const existingPattern = await db
    .select({
      id: patterns.id,
      image: patterns.image,
      document: patterns.document,
    })
    .from(patterns)
    .where(eq(patterns.id, id))
    .then((rows) => rows[0] ?? null);

  if (!existingPattern) {
    return {
      success: false,
      error: 'Pattern not found. Refresh the page and try again.',
    };
  }

  const uploadedKeys: string[] = [];
  const keysToDelete: string[] = [];

  let nextImageUrl = existingPattern.image;
  let nextDocumentUrl = existingPattern.document;

  try {
    if (imageFile) {
      const imageInput = Buffer.from(await imageFile.arrayBuffer());
      const imageBuffer = await sharp(imageInput).webp({ quality: 75, effort: 4 }).toBuffer();
      const imageKey = `patterns/${id}/image-${randomUUID()}.webp`;

      await uploadToR2({
        key: imageKey,
        body: imageBuffer,
        contentType: 'image/webp',
      });

      uploadedKeys.push(imageKey);
      nextImageUrl = getR2PublicUrl(imageKey);

      const previousImageKey = getR2KeyFromUrl(existingPattern.image);
      if (previousImageKey && previousImageKey !== imageKey) {
        keysToDelete.push(previousImageKey);
      }
    }

    if (documentFile) {
      const normalizedDocumentExtension = documentExtension || 'bin';
      const documentKey = `patterns/${id}/document-${randomUUID()}.${normalizedDocumentExtension}`;
      const documentBuffer = new Uint8Array(await documentFile.arrayBuffer());

      await uploadToR2({
        key: documentKey,
        body: documentBuffer,
        contentType: getDocumentContentType(documentFile, normalizedDocumentExtension),
      });

      uploadedKeys.push(documentKey);
      nextDocumentUrl = getR2PublicUrl(documentKey);

      const previousDocumentKey = getR2KeyFromUrl(existingPattern.document);
      if (previousDocumentKey && previousDocumentKey !== documentKey) {
        keysToDelete.push(previousDocumentKey);
      }
    }

    await db
      .update(patterns)
      .set({
        name,
        image: nextImageUrl,
        document: nextDocumentUrl,
        product_id: product,
        category,
        stitching,
      })
      .where(eq(patterns.id, id));
  } catch (error) {
    if (uploadedKeys.length > 0) {
      await deleteObjects(uploadedKeys, 'clean up uploaded object');
    }

    console.error('Failed to update pattern:', error);

    return {
      success: false,
      error: 'Failed to save the pattern. Please try again.',
    };
  }

  if (keysToDelete.length > 0) {
    await deleteObjects(keysToDelete, 'delete replaced object');
  }

  revalidateTag('patterns', 'max');
  revalidatePath('/admin/patterns');
  revalidatePath(`/admin/patterns/${id}`);

  return {
    success: true,
    message: 'Pattern updated successfully.',
  };
}