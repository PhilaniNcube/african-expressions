import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommandOutput,
  DeleteObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UploadToR2Params } from '../types';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET = process.env.R2_SECRET!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;

const isDev = process.env.NODE_ENV !== 'production';

/**
 * The public base URL for the R2 bucket.
 * Uses the dev URL in development, prod URL in production.
 */
export const R2_PUBLIC_URL: string = isDev
  ? (process.env.R2_PUBLIC_DEV_URL as string)
  : (process.env.R2_PUBLIC_PROD_URL as string);

/**
 * S3-compatible client configured for Cloudflare R2.
 * Use on the server side only (API routes, Server Actions, etc.)
 */
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET,
  },
});

/**
 * Returns the public URL for a given object key in the R2 bucket.
 */
export function getR2PublicUrl(key: string): string {
  const cleanKey = key.replace(/^\/+/, '');
  return `${R2_PUBLIC_URL}/${cleanKey}`;
}

/**
 * Upload a file to the R2 bucket.
 */
export async function uploadToR2({
  key,
  body,
  contentType,
}: UploadToR2Params): Promise<PutObjectCommandOutput> {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  return r2Client.send(command);
}

/**
 * Delete an object from the R2 bucket.
 */
export async function deleteFromR2(key: string): Promise<DeleteObjectCommandOutput> {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });
  return r2Client.send(command);
}

/**
 * Generate a presigned URL for temporary private access to an object.
 * @param key - The object key.
 * @param expiresIn - Expiry time in seconds (default 1 hour).
 */
export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });
  return getSignedUrl(r2Client, command, { expiresIn });
}
