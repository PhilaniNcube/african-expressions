'use client';

import React, { useState } from 'react';
import supabase from '../../../utils/supabase';
import type { Category, Product, Stitching } from '../../../types';

interface AddPatternClientProps {
  categories: Category[];
  products: Pick<Product, 'id' | 'name'>[];
  stitching: Stitching[];
}

export default function AddPatternClient({ categories, products, stitching }: AddPatternClientProps) {
  const [image, setImage] = useState('');
  const [doc, setDoc] = useState('');
  const [name, setName] = useState('');
  const [stitch, setStitching] = useState('');
  const [category, setCategory] = useState('');
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const upload = await supabase.storage.from('patterns').upload(fileName, file);
    const fileUrl = (upload.data as any)?.Key;
    if (fileUrl?.length > 0) alert('File Uploaded');
    setImage(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`);
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
    if (fileUrl?.length > 0) alert('File Uploaded');
    setDoc(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image || !doc || !name || !stitch || !category || !productId) {
      alert('Please fill in all fields');
      return;
    }
    const res = await fetch('/api/pattern', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, document: doc, name, stitching: stitch, category, productId }),
    });
    const response = await res.json();
    if (response.status === 200) {
      alert('Pattern has been added successfully');
    } else {
      alert('There was a problem saving the pattern');
    }
    setImage(''); setName(''); setDoc(''); setStitching(''); setCategory(''); setProductId('');
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-4 lg:px-0 py-12">
      <h1 className="text-3xl text-deep font-georgiaBold">Add A Pattern</h1>
      <form className="w-full md:w-1/2 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col">
          <label htmlFor="name" className="pb-2 text-sm font-bold text-gray-800">Name</label>
          <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm" />
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="category" className="pb-2 text-sm font-bold text-gray-800">Category</label>
          <select id="category" name="category" required value={category} onChange={(e) => setCategory(e.target.value)} className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm">
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="productId" className="pb-2 text-sm font-bold text-gray-800">Yarn</label>
          <select id="productId" name="productId" required value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm">
            <option value="">Select Product</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="stitch" className="pb-2 text-sm font-bold text-gray-800">Stitching</label>
          <select id="stitch" name="stitch" required value={stitch} onChange={(e) => setStitching(e.target.value)} className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500 shadow-sm">
            <option value="">Select Stitching</option>
            {stitching.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="w-full flex space-x-6">
          <div className="flex justify-center">
            <div className="w-full">
              <label htmlFor="image" className="form-label text-xs inline-block mb-1 text-gray-700">Upload Image</label>
              <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded" type="file" id="image" onChange={handleImageUpload} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <label htmlFor="doc" className="form-label inline-block mb-1 text-gray-700 text-xs">Upload Document</label>
              <input onChange={handleDocUpload} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded" type="file" id="doc" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={loading} className="bg-accent text-white text-lg font-medium px-8 rounded py-1 mt-3">
          {loading ? 'Please wait...' : 'Submit'}
        </button>
      </form>
    </main>
  );
}
