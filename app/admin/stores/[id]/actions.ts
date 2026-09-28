'use server';

import { eq } from 'drizzle-orm';
import sharp from 'sharp';
import { revalidatePath, revalidateTag } from 'next/cache';
import { db } from '@/db';
import { stores } from '@/db/schema';
import { deleteFromR2, getR2PublicUrl, R2_PUBLIC_URL, uploadToR2 } from '@/lib/r2';

export type UpdateStoreState = {
  success: boolean;
  message?: string;
  error?: string;
};

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

function getText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getR2KeyFromUrl(url: string): string | null {
  if (!url) return null;
  const clean = url.split('?')[0];
  const prefix = `${R2_PUBLIC_URL.replace(/\/+$/, '')}/`;
  if (clean.startsWith(prefix)) return clean.slice(prefix.length);
  if (clean.includes('stores/')) return clean.slice(clean.indexOf('stores/'));
  return null;
}

function getSanitizedFileName(file: File): string {
  const base = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .trim();
  return base || 'image';
}

export async function updateStore(
  _prevState: UpdateStoreState,
  formData: FormData,
): Promise<UpdateStoreState> {
  const id = getText(formData, 'id');
  const name = getText(formData, 'name');
  const streetAddress = getText(formData, 'streetAddress');
  const city = getText(formData, 'city');
  const contact = getText(formData, 'contact');
  const website = getText(formData, 'website');
  const latRaw = getText(formData, 'lat');
  const longRaw = getText(formData, 'long');

  if (!id) {
    return { success: false, error: 'Store ID is missing. Reload the page and try again.' };
  }

  if (!name || !streetAddress || !city) {
    return { success: false, error: 'Name, street address, and city are required.' };
  }

  const lat = latRaw ? Number(latRaw) : null;
  const long = longRaw ? Number(longRaw) : null;
  if (lat !== null && !Number.isFinite(lat)) {
    return { success: false, error: 'Latitude must be a valid number.' };
  }
  if (long !== null && !Number.isFinite(long)) {
    return { success: false, error: 'Longitude must be a valid number.' };
  }

  const existing = await db
    .select()
    .from(stores)
    .where(eq(stores.id, id))
    .then((rows) => rows[0] ?? null);

  if (!existing) {
    return { success: false, error: 'Store not found.' };
  }

  let nextImage = existing.image;

  const imageFile = formData.get('image_file');
  if (imageFile instanceof File && imageFile.size > 0) {
    if (!allowedImageTypes.has(imageFile.type)) {
      return { success: false, error: 'Upload a PNG, JPEG, WebP, or AVIF image.' };
    }

    try {
      const input = Buffer.from(await imageFile.arrayBuffer());
      const webpBuffer = await sharp(input).webp({ quality: 75, effort: 4 }).toBuffer();
      const imageKey = `stores/${id}/main-${getSanitizedFileName(imageFile)}.webp`;

      await uploadToR2({ key: imageKey, body: webpBuffer, contentType: 'image/webp' });
      nextImage = `${getR2PublicUrl(imageKey)}?v=${Date.now()}`;

      const previousKey = existing.image ? getR2KeyFromUrl(existing.image) : null;
      if (previousKey && previousKey !== imageKey) {
        try {
          await deleteFromR2(previousKey);
        } catch (err) {
          console.error('Failed to delete replaced store image:', err);
        }
      }
    } catch (error) {
      console.error('Failed to process store image:', error);
      return { success: false, error: 'Failed to upload the image. Please try again.' };
    }
  }

  try {
    await db
      .update(stores)
      .set({
        name,
        streetAddress,
        city,
        contact: contact || null,
        website: website || null,
        lat,
        long,
        image: nextImage,
      })
      .where(eq(stores.id, id));
  } catch (error) {
    console.error('Failed to update store:', error);
    return { success: false, error: 'Failed to save the store. Please try again.' };
  }

  revalidateTag('stores', 'max');
  revalidatePath('/admin/stores');
  revalidatePath(`/admin/stores/${id}`);
  revalidatePath('/stores');
  revalidatePath('/online_agents');

  return { success: true, message: 'Store updated successfully.' };
}
