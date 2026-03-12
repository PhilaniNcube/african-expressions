'use client';

import { useActionState } from 'react';
import type { Pattern, Category, Product, Stitching } from '../../../../types';
import { updatePattern, type UpdatePatternState } from './actions';

interface EditPatternClientProps {
  pattern: Pattern;
  categories: Category[];
  products: Pick<Product, 'id' | 'name'>[];
  stitching: Stitching[];
}

type EditPatternFormValues = {
  name: string;
  category: string;
  product: string;
  stitching: string;
  image: FileList;
  document: FileList;
};

const initialState: UpdatePatternState = { success: false };

export default function EditPatternClient({ pattern, categories, products, stitching }: EditPatternClientProps) {
  const [state, formAction, isPending] = useActionState(updatePattern, initialState);

  const getFieldError = (fieldName: keyof EditPatternFormValues) => {
    return state.fieldErrors?.[fieldName];
  };

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-montExtraBold text-2xl text-accent">Edit {pattern.name}</h1>
        <hr className="text-accent h-[2px] mt-3 rounded-lg bg-accent" />

        {state.error && (
          <div
            aria-live="polite"
            className="mt-6 w-full rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 lg:w-2/3"
          >
            {state.error}
          </div>
        )}

        {state.success && state.message && (
          <div
            aria-live="polite"
            className="mt-6 w-full rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 lg:w-2/3"
          >
            {state.message}
          </div>
        )}

        <form
          action={formAction}
          noValidate
          className="w-full lg:w-2/3 py-4 px-3 rounded-md border border-accent mt-6 bg-slate-50"
        >
          <input type="hidden" name="id" value={pattern.id} />
          <div className="flex flex-col lg:w-2/3">
            <label htmlFor="name" className="font-semibold">Pattern Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={pattern.name}
              aria-invalid={Boolean(getFieldError('name'))}
              className="outline-none rounded-md border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm"
            />
            {getFieldError('name') && <p className="mt-2 text-sm text-red-600">{getFieldError('name')}</p>}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-bold text-gray-800">Category</label>
              <select
                id="category"
                name="category"
                required
                defaultValue={pattern.category.id}
                aria-invalid={Boolean(getFieldError('category'))}
                className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              {getFieldError('category') && <p className="mt-2 text-sm text-red-600">{getFieldError('category')}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="product" className="text-sm font-bold text-gray-800">Product Name</label>
              <select
                id="product"
                name="product"
                required
                defaultValue={pattern.product_id.id}
                aria-invalid={Boolean(getFieldError('product'))}
                className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm"
              >
                <option value="">Select Product</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              {getFieldError('product') && <p className="mt-2 text-sm text-red-600">{getFieldError('product')}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="stitching" className="text-sm font-bold text-gray-800">Stitching</label>
              <select
                id="stitching"
                name="stitching"
                required
                defaultValue={pattern.stitching.id}
                aria-invalid={Boolean(getFieldError('stitching'))}
                className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm"
              >
                <option value="">Select stitching</option>
                {stitching.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {getFieldError('stitching') && <p className="mt-2 text-sm text-red-600">{getFieldError('stitching')}</p>}
            </div>
          </div>
          <div className="w-full flex space-x-6 mt-4">
            <div className="flex justify-center">
              <div className="w-full">
                <label htmlFor="image" className="form-label text-xs inline-block mb-1 text-gray-700">Upload Image</label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded"
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  aria-invalid={Boolean(getFieldError('image'))}
                />
                <p className="mt-2 text-xs text-gray-500">Leave blank to keep the current image.</p>
                <a href={pattern.image} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-accent underline">
                  View current image
                </a>
                {getFieldError('image') && <p className="mt-2 text-sm text-red-600">{getFieldError('image')}</p>}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full">
                <label htmlFor="doc" className="form-label text-xs inline-block mb-1 text-gray-700">Upload Document</label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded"
                  type="file"
                  id="doc"
                  name="document"
                  accept=".pdf,.doc,.docx,.zip,.rar,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip,application/x-rar-compressed,application/vnd.rar"
                  aria-invalid={Boolean(getFieldError('document'))}
                />
                <p className="mt-2 text-xs text-gray-500">Leave blank to keep the current document.</p>
                <a href={pattern.document} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-accent underline">
                  View current document
                </a>
                {getFieldError('document') && <p className="mt-2 text-sm text-red-600">{getFieldError('document')}</p>}
              </div>
            </div>
          </div>
          <button type="submit" disabled={isPending} className="bg-accent text-white text-lg font-medium px-8 rounded py-1 mt-3 disabled:cursor-not-allowed disabled:opacity-70">
            {isPending ? 'Please wait...' : 'Update Pattern'}
          </button>
        </form>
      </div>
    </main>
  );
}
