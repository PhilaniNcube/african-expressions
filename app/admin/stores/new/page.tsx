'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type StoreFormData = {
  city: string;
  contact: string;
  lat: string;
  long: string;
  name: string;
  streetAddress: string;
  website: string;
};

export default function NewStorePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<StoreFormData>({
    city: '',
    contact: '',
    lat: '',
    long: '',
    name: '',
    streetAddress: '',
    website: '',
  });

  const addStoreMutation = useMutation({
    mutationFn: async (newStore: StoreFormData) => {
      const response = await fetch('/api/stores/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore),
      });
      if (!response.ok) throw new Error('Failed to create store');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['stores']);
      router.push('/admin/stores');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addStoreMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error creating store:', error);
      alert('Failed to create store');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Add New Store</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">Store Name *</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="streetAddress" className="block mb-1 text-sm font-medium">Street Address *</label>
          <input type="text" id="streetAddress" name="streetAddress" required value={formData.streetAddress} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="city" className="block mb-1 text-sm font-medium">City *</label>
          <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="contact" className="block mb-1 text-sm font-medium">Contact Number</label>
          <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="lat" className="block mb-1 text-sm font-medium">Latitude</label>
            <input type="number" step="any" id="lat" name="lat" value={formData.lat} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="long" className="block mb-1 text-sm font-medium">Longitude</label>
            <input type="number" step="any" id="long" name="long" value={formData.long} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label htmlFor="website" className="block mb-1 text-sm font-medium">Website</label>
          <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button
          type="submit"
          disabled={addStoreMutation.isLoading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {addStoreMutation.isLoading ? 'Creating...' : 'Create Store'}
        </button>
      </form>
    </div>
  );
}
