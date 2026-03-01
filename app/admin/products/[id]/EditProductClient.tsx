'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import supabase from '../../../../utils/supabase';
import type { Product } from '../../../../types';

interface EditProductClientProps {
  product: Product;
}

export default function EditProductClient({ product }: EditProductClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const upload = await supabase.storage.from('products').upload(fileName, file);
    const fileUrl = (upload.data as any)?.Key;
    if (fileUrl?.length > 0) alert('File Uploaded');
    setImage(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, id: product.id }),
    });
    const response = await res.json();
    if (response.status === 200) {
      alert('Image has been added successfully');
      router.push('/admin/products');
    } else {
      alert('There was a problem saving the Image');
    }
    setImage('');
  };

  return (
    <main className="my-8">
      <section className="max-w-7xl mx-auto px-4">
        <div>
          <p className="text-2xl text-gray-700 font-bold">{product.name}</p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="w-full">
                <label htmlFor="image" className="form-label text-xs inline-block mb-1 text-gray-700">
                  Upload Image
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded"
                  type="file"
                  id="image"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-8 py-2 rounded mt-2">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
}
