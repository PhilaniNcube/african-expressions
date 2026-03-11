'use client';

import { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';

import type { Category, Product, Stitching } from '../../../types';
import { createPattern, type CreatePatternState } from './actions';

interface AddPatternClientProps {
  categories: Category[];
  products: Pick<Product, 'id' | 'name'>[];
  stitching: Stitching[];
}

type AddPatternFormValues = {
  name: string;
  category: string;
  productId: string;
  stitching: string;
  image: FileList;
  document: FileList;
};

const initialState: CreatePatternState = { success: false };

export default function AddPatternClient({ categories, products, stitching }: AddPatternClientProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createPattern, initialState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddPatternFormValues>({
    defaultValues: {
      name: '',
      category: '',
      productId: '',
      stitching: '',
    },
    mode: 'onSubmit',
  });

  const selectedImage = watch('image')?.[0];
  const selectedDocument = watch('document')?.[0];

  const getFieldErrors = (fieldName: keyof AddPatternFormValues) => {
    const clientError = errors[fieldName];
    const serverError = state.fieldErrors?.[fieldName];

    if (clientError?.message) {
      return [clientError];
    }

    return serverError ? [serverError] : undefined;
  };

  const onSubmit = handleSubmit(() => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-4 lg:px-0 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-3xl text-deep font-georgiaBold">Add A Pattern</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Save the pattern record to Neon and upload the preview image and download file directly to R2.
        </p>

        {state.error && (
          <div
            aria-live="polite"
            className="mt-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.error}
          </div>
        )}

        <form
          ref={formRef}
          noValidate
          encType="multipart/form-data"
          className="mt-8 space-y-8"
          onSubmit={onSubmit}
        >
          <FieldSet className="rounded border border-gray-200 bg-white p-6 shadow-sm">
            <FieldLegend>Pattern Details</FieldLegend>
            <FieldDescription>
              Choose the yarn and stitching metadata that should be attached to this pattern.
            </FieldDescription>

            <FieldGroup className="md:grid-cols-2">
              <Field data-invalid={Boolean(getFieldErrors('name')?.length)}>
                <FieldLabel htmlFor="name">Pattern Name</FieldLabel>
                <input
                  id="name"
                  type="text"
                  autoComplete="off"
                  aria-invalid={Boolean(getFieldErrors('name')?.length)}
                  {...register('name', {
                    required: 'Pattern name is required.',
                    minLength: {
                      value: 2,
                      message: 'Pattern name must be at least 2 characters.',
                    },
                  })}
                  className="w-full rounded border border-gray-300 bg-transparent px-3 py-3 text-sm text-deep shadow-sm outline-none transition focus:border-accent"
                />
                <FieldError errors={getFieldErrors('name')} />
              </Field>

              <Field data-invalid={Boolean(getFieldErrors('category')?.length)}>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select
                  id="category"
                  aria-invalid={Boolean(getFieldErrors('category')?.length)}
                  {...register('category', { required: 'Select a category.' })}
                  className="w-full rounded border border-gray-300 bg-transparent px-3 py-3 text-sm text-deep shadow-sm outline-none transition focus:border-accent"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <FieldError errors={getFieldErrors('category')} />
              </Field>

              <Field data-invalid={Boolean(getFieldErrors('productId')?.length)}>
                <FieldLabel htmlFor="productId">Yarn</FieldLabel>
                <select
                  id="productId"
                  aria-invalid={Boolean(getFieldErrors('productId')?.length)}
                  {...register('productId', { required: 'Select a yarn.' })}
                  className="w-full rounded border border-gray-300 bg-transparent px-3 py-3 text-sm text-deep shadow-sm outline-none transition focus:border-accent"
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <FieldError errors={getFieldErrors('productId')} />
              </Field>

              <Field data-invalid={Boolean(getFieldErrors('stitching')?.length)}>
                <FieldLabel htmlFor="stitching">Stitching</FieldLabel>
                <select
                  id="stitching"
                  aria-invalid={Boolean(getFieldErrors('stitching')?.length)}
                  {...register('stitching', { required: 'Select a stitching type.' })}
                  className="w-full rounded border border-gray-300 bg-transparent px-3 py-3 text-sm text-deep shadow-sm outline-none transition focus:border-accent"
                >
                  <option value="">Select Stitching</option>
                  {stitching.map((stitchType) => (
                    <option key={stitchType.id} value={stitchType.id}>
                      {stitchType.name}
                    </option>
                  ))}
                </select>
                <FieldError errors={getFieldErrors('stitching')} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet className="rounded border border-gray-200 bg-white p-6 shadow-sm">
            <FieldLegend>Files</FieldLegend>
            <FieldDescription>
              Images are converted to WebP before upload. Documents keep their original file type in R2.
            </FieldDescription>

            <FieldGroup className="md:grid-cols-2">
              <Field data-invalid={Boolean(getFieldErrors('image')?.length)}>
                <FieldLabel htmlFor="image">Pattern Image</FieldLabel>
                <input
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  aria-invalid={Boolean(getFieldErrors('image')?.length)}
                  {...register('image', {
                    validate: (files: FileList | undefined) =>
                      (files?.length ?? 0) > 0 || 'Pattern image is required.',
                  })}
                  className="block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-deep shadow-sm file:mr-4 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-accent focus:border-accent focus:outline-none"
                />
                <FieldDescription>
                  {selectedImage ? `Selected: ${selectedImage.name}` : 'Upload a PNG, JPEG, WebP, or AVIF image.'}
                </FieldDescription>
                <FieldError errors={getFieldErrors('image')} />
              </Field>

              <Field data-invalid={Boolean(getFieldErrors('document')?.length)}>
                <FieldLabel htmlFor="document">Pattern Document</FieldLabel>
                <input
                  id="document"
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.rar,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip,application/x-rar-compressed,application/vnd.rar"
                  aria-invalid={Boolean(getFieldErrors('document')?.length)}
                  {...register('document', {
                    validate: (files: FileList | undefined) =>
                      (files?.length ?? 0) > 0 || 'Pattern document is required.',
                  })}
                  className="block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-deep shadow-sm file:mr-4 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-accent focus:border-accent focus:outline-none"
                />
                <FieldDescription>
                  {selectedDocument
                    ? `Selected: ${selectedDocument.name}`
                    : 'Upload a PDF, DOC, DOCX, ZIP, or RAR file.'}
                </FieldDescription>
                <FieldError errors={getFieldErrors('document')} />
              </Field>
            </FieldGroup>
          </FieldSet>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center rounded bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-yellow-800/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Saving Pattern...' : 'Save Pattern'}
          </button>
        </form>
      </div>
    </main>
  );
}
