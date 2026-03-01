'use client';

import { useState } from 'react';
import supabase from '../../../../utils/supabase';
import type { Pattern, Category, Product, Stitching } from '../../../../types';

interface EditPatternClientProps {
  pattern: Pattern;
  categories: Category[];
  products: Pick<Product, 'id' | 'name'>[];
  stitching: Stitching[];
}

export default function EditPatternClient({ pattern, categories, products, stitching }: EditPatternClientProps) {
  const [image, setImage] = useState(pattern.image);
  const [doc, setDoc] = useState(pattern.document);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const upload = await supabase.storage.from('patterns').upload(fileName, file);
    const fileUrl = (upload.data as any)?.Key;
    if (fileUrl?.length > 0) {
      alert('File Uploaded');
      setImage(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`);
    }
    setLoading(false);
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const upload = await supabase.storage.from('patterns').upload(fileName, file);
    const fileUrl = (upload.data as any)?.Key;
    if (fileUrl?.length > 0) {
      alert('File Uploaded');
      setDoc(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { name, product, category, stitching: stitchVal } = Object.fromEntries(
      new FormData(e.currentTarget),
    );
    const res = await fetch('/api/patterns/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, document: doc, name, stitching: stitchVal, category, product, id: pattern.id }),
    });
    const response = await res.json();
    if (response.status === 200) {
      alert('Pattern has been updated successfully');
    } else {
      alert('There was a problem saving the pattern');
    }
    setLoading(false);
  };

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-montExtraBold text-2xl text-accent">Edit {pattern.name}</h1>
        <hr className="text-accent h-[2px] mt-3 rounded-lg bg-accent" />
        <form onSubmit={handleSubmit} className="w-full lg:w-2/3 py-4 px-3 rounded-md border border-accent mt-6 bg-slate-50">
          <div className="flex flex-col lg:w-2/3">
            <label htmlFor="name" className="font-semibold">Pattern Name</label>
            <input type="text" id="name" name="name" defaultValue={pattern.name} className="outline-none rounded-md border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-bold text-gray-800">Category</label>
              <select id="category" name="category" required defaultValue={pattern.category.id} className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm">
                <option value="">Select Category</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="product" className="text-sm font-bold text-gray-800">Product Name</label>
              <select id="product" name="product" required defaultValue={pattern.product_id.id} className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm">
                <option value="">Select Product</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="stitching" className="text-sm font-bold text-gray-800">Stitching</label>
              <select id="stitching" name="stitching" required defaultValue={pattern.stitching.id} className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm">
                <option value="">Select stitching</option>
                {stitching.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div className="w-full flex space-x-6 mt-4">
            <div className="flex justify-center">
              <div className="w-full">
                <label htmlFor="image" className="form-label text-xs inline-block mb-1 text-gray-700">Upload Image</label>
                <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded" type="file" id="image" name="image" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full">
                <label htmlFor="doc" className="form-label text-xs inline-block mb-1 text-gray-700">Upload Document</label>
                <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded" type="file" id="doc" name="doc" onChange={handleDocUpload} />
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="bg-accent text-white text-lg font-medium px-8 rounded py-1 mt-3">
            {loading ? 'Please wait...' : 'Update Pattern'}
          </button>
        </form>
      </div>
    </main>
  );
}
