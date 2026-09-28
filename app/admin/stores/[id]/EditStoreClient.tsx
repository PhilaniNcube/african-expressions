'use client';

/* eslint-disable @next/next/no-img-element */
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import type { Store } from '../../../../types';
import { updateStore, type UpdateStoreState } from './actions';

type StoreFormValues = {
  name: string;
  streetAddress: string;
  city: string;
  contact: string;
  lat: string;
  long: string;
  website: string;
};

const initialState: UpdateStoreState = { success: false };

export default function EditStoreClient({ store }: { store: Store }) {
  const [state, formAction, isPending] = useActionState(updateStore, initialState);

  const {
    register,
    formState: { errors },
  } = useForm<StoreFormValues>({
    defaultValues: {
      name: store.name ?? '',
      streetAddress: store.streetAddress ?? '',
      city: store.city ?? '',
      contact: store.contact ?? '',
      lat: store.lat != null ? String(store.lat) : '',
      long: store.long != null ? String(store.long) : '',
      website: store.website ?? '',
    },
  });

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Store</h1>
        <Link href="/admin/stores" className="text-blue-600">
          Back to stores
        </Link>
      </div>

      {state.error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
          {state.error}
        </div>
      )}

      {state.success && state.message && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={store.id} />

        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">
            Store Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Store name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="streetAddress" className="block mb-1 text-sm font-medium">
            Street Address *
          </label>
          <input
            type="text"
            id="streetAddress"
            {...register('streetAddress', { required: 'Street address is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.streetAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.streetAddress.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block mb-1 text-sm font-medium">
            City *
          </label>
          <input
            type="text"
            id="city"
            {...register('city', { required: 'City is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>

        <div>
          <label htmlFor="contact" className="block mb-1 text-sm font-medium">
            Contact Number
          </label>
          <input
            type="tel"
            id="contact"
            {...register('contact')}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="lat" className="block mb-1 text-sm font-medium">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              id="lat"
              {...register('lat')}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="long" className="block mb-1 text-sm font-medium">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              id="long"
              {...register('long')}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block mb-1 text-sm font-medium">
            Website
          </label>
          <input
            type="url"
            id="website"
            {...register('website')}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="image_file" className="block mb-1 text-sm font-medium">
            Store Image (optional)
          </label>
          {store.image && (
            <img
              src={store.image}
              alt={store.name}
              className="object-cover w-32 h-32 mb-2 rounded"
            />
          )}
          <input
            type="file"
            id="image_file"
            name="image_file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="block w-full text-sm text-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500">
            Uploading a new image replaces the current one (stored in R2).
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Store'}
        </button>
      </form>
    </div>
  );
}
