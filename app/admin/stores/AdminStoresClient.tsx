'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import getStores from '../../../lib/getStores';
import type { Store } from '../../../types';

interface AdminStoresClientProps {
  initialStores: Store[];
}

export default function AdminStoresClient({ initialStores }: AdminStoresClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data } = useQuery(['stores'], getStores, {
    initialData: initialStores,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const filteredStores = useMemo(
    () => data?.filter((store) => store.name?.toLowerCase().includes(searchTerm.toLowerCase())),
    [data, searchTerm],
  );

  const deleteStoreMutation = useMutation({
    mutationFn: async (storeId: string) => {
      const response = await fetch('/api/stores/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: storeId }),
      });
      if (!response.ok) throw new Error('Failed to delete store');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['stores']);
    },
  });

  const handleDelete = async (storeId: string) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStoreMutation.mutateAsync(storeId);
      } catch (error) {
        console.error('Error deleting store:', error);
        alert('Failed to delete store');
        setSearchTerm('');
      }
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="mb-4 text-2xl font-bold">Stores Management</h1>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search stores by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-3xl px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link className="block mt-2 text-blue-600" href="/admin/stores/new">
          <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Add New Store
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left border-b">Store Name</th>
              <th className="px-6 py-3 text-left border-b">Address</th>
              <th className="px-6 py-3 text-left border-b">Contact</th>
              <th className="px-6 py-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores?.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{store.name}</td>
                <td className="px-6 py-4 border-b">{store.streetAddress}, {store.city}</td>
                <td className="px-6 py-4 border-b">{store.contact}</td>
                <td className="px-6 py-4 border-b">
                  <div className="flex space-x-2">
                    <Link href={`/admin/stores/${store.id}`}>
                      <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(store.id)}
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
