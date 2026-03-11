'use server';

import { randomUUID } from 'node:crypto';

import sharp from 'sharp';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { patterns } from '@/db/schema';
import { deleteFromR2, getR2PublicUrl, uploadToR2 } from '@/lib/r2';

export type PatternFormFieldName =
  | 'name'
  | 'category'
  | 'productId'
  | 'stitching'
  | 'image'
  | 'document';

export type CreatePatternState = {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<PatternFormFieldName, string>>;
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

function getTextField(formData: FormData, key: Exclude<PatternFormFieldName, 'image' | 'document'>) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getUploadedFile(formData: FormData, key: Extract<PatternFormFieldName, 'image' | 'document'>) {
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

async function cleanupUploadedObjects(keys: string[]) {
  const results = await Promise.allSettled(keys.map((key) => deleteFromR2(key)));

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Failed to clean up uploaded object: ${keys[index]}`, result.reason);
    }
  });
}

export async function createPattern(
  _prevState: CreatePatternState,
  formData: FormData,
): Promise<CreatePatternState> {
  const name = getTextField(formData, 'name');
  const category = getTextField(formData, 'category');
  const productId = getTextField(formData, 'productId');
  const stitching = getTextField(formData, 'stitching');
  const imageFile = getUploadedFile(formData, 'image');
  const documentFile = getUploadedFile(formData, 'document');

  const fieldErrors: Partial<Record<PatternFormFieldName, string>> = {};

  if (!name) fieldErrors.name = 'Pattern name is required.';
  if (!category) fieldErrors.category = 'Select a category.';
  if (!productId) fieldErrors.productId = 'Select a yarn.';
  if (!stitching) fieldErrors.stitching = 'Select a stitching type.';

  if (!imageFile) {
    fieldErrors.image = 'Pattern image is required.';
  } else if (!allowedImageTypes.has(imageFile.type)) {
    fieldErrors.image = 'Upload a PNG, JPEG, WebP, or AVIF image.';
  }

  const documentExtension = documentFile ? getFileExtension(documentFile.name) : '';

  if (!documentFile) {
    fieldErrors.document = 'Pattern document is required.';
  } else if (!isAllowedDocument(documentFile, documentExtension)) {
    fieldErrors.document = 'Upload a PDF, DOC, DOCX, ZIP, or RAR file.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: 'Fix the highlighted fields and try again.',
      fieldErrors,
    };
  }

  const safeImageFile = imageFile;
  const safeDocumentFile = documentFile;

  if (!safeImageFile || !safeDocumentFile) {
    return {
      success: false,
      error: 'Fix the highlighted fields and try again.',
      fieldErrors: {
        ...fieldErrors,
        image: fieldErrors.image ?? 'Pattern image is required.',
        document: fieldErrors.document ?? 'Pattern document is required.',
      },
    };
  }

  const patternId = randomUUID();
  const uploadedKeys: string[] = [];

  try {
    const imageInput = Buffer.from(await safeImageFile.arrayBuffer());
    const imageBuffer = await sharp(imageInput).webp({ quality: 75, effort: 4 }).toBuffer();
    const imageKey = `patterns/${patternId}/image.webp`;

    await uploadToR2({
      key: imageKey,
      body: imageBuffer,
      contentType: 'image/webp',
    });
    uploadedKeys.push(imageKey);

    const normalizedDocumentExtension = documentExtension || 'bin';
    const documentKey = `patterns/${patternId}/document.${normalizedDocumentExtension}`;
    const documentBuffer = new Uint8Array(await safeDocumentFile.arrayBuffer());

    await uploadToR2({
      key: documentKey,
      body: documentBuffer,
      contentType: getDocumentContentType(safeDocumentFile, normalizedDocumentExtension),
    });
    uploadedKeys.push(documentKey);

    await db.insert(patterns).values({
      id: patternId,
      name,
      image: getR2PublicUrl(imageKey),
      document: getR2PublicUrl(documentKey),
      product_id: productId,
      category,
      stitching,
    });
  } catch (error) {
    if (uploadedKeys.length > 0) {
      await cleanupUploadedObjects(uploadedKeys);
    }

    console.error('Failed to create pattern:', error);

    return {
      success: false,
      error: 'Failed to save the pattern. Please try again.',
    };
  }

  revalidateTag('patterns', 'max');
  revalidatePath('/admin/patterns');
  redirect('/admin/patterns');
}