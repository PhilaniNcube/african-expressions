"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { createStore, type CreateStoreState } from "./actions";

type StoreFormValues = {
  name: string;
  streetAddress: string;
  city: string;
  contact: string;
  lat: string;
  long: string;
  website: string;
};

const initialState: CreateStoreState = { success: false };

export default function NewStorePage() {
  const [state, formAction, isPending] = useActionState(createStore, initialState);

  const {
    register,
    formState: { errors },
  } = useForm<StoreFormValues>({
    defaultValues: {
      name: "",
      streetAddress: "",
      city: "",
      contact: "",
      lat: "",
      long: "",
      website: "",
    },
  });

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Add New Store</h1>

      {state.error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">
            Store Name *
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Store name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="streetAddress" className="block mb-1 text-sm font-medium">
            Street Address *
          </label>
          <input
            type="text"
            id="streetAddress"
            {...register("streetAddress", { required: "Street address is required" })}
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
            {...register("city", { required: "City is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact" className="block mb-1 text-sm font-medium">
            Contact Number
          </label>
          <input
            type="tel"
            id="contact"
            {...register("contact")}
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
              {...register("lat")}
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
              {...register("long")}
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
            {...register("website")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
}
