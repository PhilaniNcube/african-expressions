'use client';

import React, { useState, useActionState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  PhotoIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import type { Product } from '@/types';
import { updateProduct, UpdateProductState } from './actions';

interface EditProductClientProps {
  product: Product;
}

const initialState: UpdateProductState = {
  success: false,
};

export default function EditProductClient({ product }: EditProductClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(updateProduct, initialState);

  // Main Image selection / preview
  const [selectedMainImageUrl, setSelectedMainImageUrl] = useState(product.main_image);
  const [mainImageFilePreview, setMainImageFilePreview] = useState<string | null>(null);

  // Retained color gallery images
  const [retainedImages, setRetainedImages] = useState<string[]>(product.images || []);

  // New color image files preview
  const [newColorFilePreviews, setNewColorFilePreviews] = useState<string[]>([]);

  // Form field states
  const [name, setName] = useState(product.name || '');
  const [slug, setSlug] = useState(product.slug || '');
  const [type, setType] = useState(product.type || '');
  const [description, setDescription] = useState(product.description || '');
  const [composition, setComposition] = useState(product.composition || '');
  const [yarnWeight, setYarnWeight] = useState(product.yarn_weight || '');
  const [ballWeight, setBallWeight] = useState(product.ball_weight?.toString() || '');
  const [yarnLength, setYarnLength] = useState(product.yarn_length?.toString() || '');
  const [tension, setTension] = useState(product.tension || '');
  const [needleSize, setNeedleSize] = useState(product.needle_size || '');
  const [price, setPrice] = useState(product.price?.toString() || '');

  // Auto-generate slug from name if needed
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!product.id) {
      setSlug(
        newName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  // Handle Main Image file selection
  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImageFilePreview(URL.createObjectURL(file));
    } else {
      setMainImageFilePreview(null);
    }
  };

  // Handle New Color Image files selection
  const handleNewColorFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((f) => URL.createObjectURL(f));
      setNewColorFilePreviews(previews);
    } else {
      setNewColorFilePreviews([]);
    }
  };

  // Remove an existing color image
  const handleRemoveExistingColor = (urlToRemove: string) => {
    setRetainedImages((prev) => prev.filter((url) => url !== urlToRemove));
    if (selectedMainImageUrl === urlToRemove) {
      setSelectedMainImageUrl(product.main_image);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 mb-2 transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 mr-1" />
            Back to Yarns & Products
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-georgiaBold">
            Edit Yarn: <span className="text-amber-700">{product.name}</span>
          </h1>
        </div>
      </div>

      {/* Alert Messages */}
      {state.success && state.message && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-medium">{state.message}</span>
        </div>
      )}

      {state.error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span className="text-sm font-medium">{state.error}</span>
        </div>
      )}

      {/* Main Form */}
      <form action={formAction} className="space-y-8">
        <input type="hidden" name="id" value={product.id} />
        <input type="hidden" name="selected_main_image_url" value={selectedMainImageUrl} />
        <input type="hidden" name="retained_images" value={JSON.stringify(retainedImages)} />

        {/* 1. Basic Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 font-georgiaBold">
            Yarn Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yarn Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Yarn Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {state.fieldErrors?.name && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.name}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {state.fieldErrors?.slug && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.slug}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Product Type <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                placeholder="e.g. yarn"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {state.fieldErrors?.type && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.type}</p>
              )}
            </div>

            {/* Yarn Weight */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Yarn Weight / Category <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="yarn_weight"
                value={yarnWeight}
                onChange={(e) => setYarnWeight(e.target.value)}
                required
                placeholder="e.g. Lace Weight, DK, 4-Ply"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {state.fieldErrors?.yarn_weight && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.yarn_weight}</p>
              )}
            </div>

            {/* Composition */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Composition / Blend <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="composition"
                value={composition}
                onChange={(e) => setComposition(e.target.value)}
                required
                placeholder="e.g. 78% Mohair, 13% Wool, 9% Nylon"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {state.fieldErrors?.composition && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.composition}</p>
              )}
            </div>

            {/* Ball Weight (g) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Ball Weight (grams) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="ball_weight"
                value={ballWeight}
                onChange={(e) => setBallWeight(e.target.value)}
                required
                min="1"
                placeholder="50"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {state.fieldErrors?.ball_weight && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.ball_weight}</p>
              )}
            </div>

            {/* Yarn Length (m) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Yarn Meterage (meters) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="yarn_length"
                value={yarnLength}
                onChange={(e) => setYarnLength(e.target.value)}
                required
                min="1"
                placeholder="210"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
              {state.fieldErrors?.yarn_length && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.yarn_length}</p>
              )}
            </div>

            {/* Tension */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Tension Gauge
              </label>
              <input
                type="text"
                name="tension"
                value={tension}
                onChange={(e) => setTension(e.target.value)}
                placeholder="e.g. 20 sts x 28 rows = 10x10cm"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Needle Size */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Recommended Needle Size
              </label>
              <input
                type="text"
                name="needle_size"
                value={needleSize}
                onChange={(e) => setNeedleSize(e.target.value)}
                placeholder="e.g. 3.25mm - 4.5mm"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Price (Optional)
              </label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 85.00"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
            {state.fieldErrors?.description && (
              <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.description}</p>
            )}
          </div>
        </div>

        {/* 2. Main Display Image Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-900 font-georgiaBold">Main Display Image</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              This image is shown as the primary preview on product cards and yarn detail pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Preview Box */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold uppercase text-gray-500 mb-2">Current Main Image</span>
              <div className="relative w-48 h-48 rounded-xl overflow-hidden bg-gray-100 border-2 border-amber-500 shadow-sm">
                <Image
                  src={mainImageFilePreview || selectedMainImageUrl}
                  alt="Main yarn image preview"
                  fill
                  className="object-cover"
                />
              </div>
              {mainImageFilePreview && (
                <span className="text-xs text-amber-600 font-medium mt-2">New main file selected</span>
              )}
            </div>

            {/* Options */}
            <div className="md:col-span-2 space-y-4">
              {/* Option A: Upload New Main File */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Upload Replacement Main Image File
                </label>
                <input
                  type="file"
                  name="main_image_file"
                  accept="image/png, image/jpeg, image/webp, image/avif"
                  onChange={handleMainFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Uploads image to Cloudflare R2 and converts it to WebP format.
                </p>
                {state.fieldErrors?.main_image && (
                  <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.main_image}</p>
                )}
              </div>

              {/* Option B: Choose from existing color images */}
              {retainedImages.length > 0 && (
                <div className="pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Or select an existing color image as main image
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {retainedImages.map((url, i) => {
                      const isSelected = selectedMainImageUrl === url && !mainImageFilePreview;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setSelectedMainImageUrl(url);
                            setMainImageFilePreview(null);
                          }}
                          className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                            isSelected
                              ? 'border-amber-500 ring-2 ring-amber-300 scale-105'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <Image src={url} alt={`Color ${i}`} fill className="object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-amber-600/30 flex items-center justify-center">
                              <StarIconSolid className="w-5 h-5 text-white shadow-sm" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Color Gallery Images Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900 font-georgiaBold">Color Gallery Images</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Add, manage, or remove color variant images available for this yarn.
              </p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-full w-fit">
              {retainedImages.length} Existing Image{retainedImages.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Existing Images Grid */}
          {retainedImages.length > 0 ? (
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Existing Gallery Images
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {retainedImages.map((url, index) => {
                  const filename = url.split('/').pop() || `Color ${index + 1}`;
                  const isMain = selectedMainImageUrl === url;

                  return (
                    <div
                      key={index}
                      className="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex flex-col"
                    >
                      <div className="relative aspect-square w-full">
                        <Image src={url} alt={filename} fill className="object-cover" />
                        {isMain && (
                          <span className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                            MAIN
                          </span>
                        )}
                      </div>
                      <div className="p-2 flex items-center justify-between gap-1 bg-white border-t border-gray-100">
                        <span className="text-[10px] text-gray-600 truncate flex-1" title={filename}>
                          {filename}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingColor(url)}
                          className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Remove image"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No existing color images retained.</p>
          )}

          {/* Upload New Color Images */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Upload New Color Images
              </label>
              <input
                type="file"
                name="new_color_images"
                multiple
                accept="image/png, image/jpeg, image/webp, image/avif"
                onChange={handleNewColorFilesChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                Select one or multiple images to add to this yarn's color gallery.
              </p>
              {state.fieldErrors?.images && (
                <p className="text-xs text-rose-600 mt-1">{state.fieldErrors.images}</p>
              )}
            </div>

            {/* New Color Images Preview */}
            {newColorFilePreviews.length > 0 && (
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                  New Images to Upload ({newColorFilePreviews.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {newColorFilePreviews.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border-2 border-amber-400">
                      <Image src={src} alt="New color preview" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Actions Toolbar */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/products"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving Changes...
              </>
            ) : (
              'Save Product & Images'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
