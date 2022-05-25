import React, { useState } from 'react';
import supabase from '../../utils/supabase';

const AddPattern = ({ categories, products, stitching }) => {
  const [image, setImage] = useState('');
  const [doc, setDoc] = useState('');
  const [name, setName] = useState('');
  const [stitch, setStitching] = useState('');
  const [category, setCategory] = useState('');
  const [productId, setProductId] = useState('');

  console.log(categories);

  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    let upload = await supabase.storage
      .from('patterns')
      .upload(`${fileName}`, file);

    const fileUrl = upload.data.Key;

    setImage(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/patterns/${fileUrl}`,
    );
  };

  const handleDocUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select an document to upload.');
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    let upload = await supabase.storage
      .from('patterns')
      .upload(`${fileName}`, file);

    const fileUrl = upload.data.Key;

    setDoc(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/patterns/${fileUrl}`,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patternReq = await fetch(`/api/pattern`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: image,
        document: doc,
        name: name,
        stitching: stitch,
        category: category,
        productId: productId,
      }),
    });

    const response = await patternReq.json();

    console.log(response);

    if (response.status === 200) {
      alert('Pattern has been added succesfull');
    } else {
      alert('There was a problem saving the pattern');
    }

    setImage('');
    setName('');
    setDoc('');
    setStitching('');
    setCategory('');
    setProductId('');
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-4 lg:px-0 py-12">
      <h1 className="text-3xl text-deep font-georgiaBold">Add A Pattern</h1>

      <form className="w-full md:w-1/2 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col ">
          <label
            htmlFor="name"
            className="pb-2 text-sm font-bold text-gray-800 "
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500  shadow-sm"
          />
        </div>

        <div className="mb-6 flex flex-col">
          <label
            htmlFor="category"
            className="pb-2 text-sm font-bold text-gray-800 "
          >
            Category
          </label>
          <select
            type="text"
            id="category"
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500  shadow-sm"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6 flex flex-col">
          <label
            htmlFor="productId"
            className="pb-2 text-sm font-bold text-gray-800 "
          >
            Yarn
          </label>
          <select
            type="text"
            id="productId"
            name="productId"
            required
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500  shadow-sm"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6 flex flex-col">
          <label
            htmlFor="stitch"
            className="pb-2 text-sm font-bold text-gray-800 "
          >
            Stitching
          </label>
          <select
            type="text"
            id="stitch"
            name="stitch"
            required
            value={stitch}
            onChange={(e) => setStitching(e.target.value)}
            className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500  shadow-sm"
          >
            <option value="">Select Stitching</option>
            {stitching.map((stitch) => (
              <option key={stitch.id} value={stitch.id}>
                {stitch.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex space-x-6">
          <div className="flex justify-center">
            <div className=" w-full">
              <label
                htmlFor="image"
                className="form-label text-xs inline-block mb-1 text-gray-700"
              >
                Upload Image
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="image"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className=" w-full">
              <label
                htmlFor="doc"
                className="form-label inline-block mb-1 text-gray-700 text-xs"
              >
                Upload Document
              </label>
              <input
                onChange={handleDocUpload}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="doc"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-accent text-white text-lg font-medium px-8 rounded py-1 mt-3"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default AddPattern;

export async function getServerSideProps() {
  let { data: category } = await supabase.from('category').select('id, name');

  let { data: products } = await supabase.from('products').select('id,name');

  let { data: stitching } = await supabase.from('stitching').select('id, name');

  return {
    props: {
      categories: category,
      products,
      stitching,
    },
  };
}
