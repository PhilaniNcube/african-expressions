// ─── Shared domain types ────────────────────────────────────────────────────

export interface Store {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  contact: string | null;
  website: string | null;
  lat: number | null;
  long: number | null;
  image?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: string;
  main_image: string;
  images: string[];
  description: string;
  composition: string;
  yarn_weight: string;
  ball_weight: number;
  yarn_length: number;
  tension?: string;
  needle_size?: string;
  price?: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Stitching {
  id: string;
  name: string;
}

export interface Pattern {
  id: string;
  name: string;
  image: string;
  document: string;
  product_id: Pick<Product, 'id' | 'name'>;
  category: Category;
  stitching: Stitching;
}

// ─── R2 upload helpers ───────────────────────────────────────────────────────

export interface UploadToR2Params {
  key: string;
  body: Buffer | ReadableStream | Uint8Array;
  contentType: string;
}
