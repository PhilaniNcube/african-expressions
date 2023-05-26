import { useState } from "react";
import supabase from "../../../utils/supabase";

const Pattern = ({ pattern, categories, products, stitching }) => {
  
  const [image, setImage] = useState(pattern.image);
  const [doc, setDoc] = useState(pattern.doc);
  const [name, setName] = useState('');
  const [stitch, setStitching] = useState('');
  const [category, setCategory] = useState('');
  const [productId, setProductId] = useState('');
  
  console.log({doc})


  const [loading, setLoading] = useState(false);
  
    const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    setLoading(true);

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    let upload = await supabase.storage
      .from('patterns')
      .upload(`${fileName}`, file);

    const fileUrl = upload.data.Key;

    if (fileUrl.length > 0) {
      alert('File Uploaded');
    }

    setImage(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`,
    );

    setLoading(false);
  };

  const handleDocUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select an document to upload.');
    }

    setLoading(true);

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    let upload = await supabase.storage
      .from('patterns')
      .upload(`${fileName}`, file);
    
    console.log(upload)

    const fileUrl = upload.data.Key;

    if (fileUrl.length > 0) {
      alert('File Uploaded');
      
         const { data, error } = await supabase.from("patterns").update({ document:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${upload.data.Key}`}).eq("id", pattern.id).select('*').single();
      
      console.log({data, error)}
      
    }

    
  

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {name, product, category, stitching} = Object.fromEntries(new FormData(e.currentTarget));
    console.log({ name, product, category, stitching, image, doc });

    const { data, error } = await supabase.from("patterns").update({name, product_id:product, category, stitching, image, document:doc}).eq("id", pattern.id).select('*').single();
    
    console.log({data, error})

    if(error) {
      alert(error.message);
      setLoading(false);
      return;
    } else {
      alert("Pattern Updated");
      setLoading(false);
    }

    setLoading(false);
  }


  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-montExtraBold text-2xl text-accent">
          Edit {pattern.name}
        </h1>

        <hr className="text-accent h-[2px] mt-3 rounded-lg bg-accent" />

        <form onSubmit={handleSubmit} className="w-full lg:w-2/3 py-4 px-3 rounded-md border border-accent mt-6 bg-slate-50">
          <div className="flex flex-col lg:w-2/3">
            <label htmlFor="name" className="font-semibold">
              Pattern Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={pattern.name}
              className="outline-none rounded-md border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500  shadow-sm"
            />
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-sm font-bold text-gray-800 "
              >
                Category
              </label>
              <select
                type="text"
                id="category"
                name="category"
                required
                defaultValue={pattern.category.id}
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
            <div className="flex flex-col">
              <label
                htmlFor="product"
                className="text-sm font-bold text-gray-800 "
              >
                Product Name
              </label>
              <select
                type="text"
                id="product"
                name="product"
                required
                defaultValue={pattern.product_id.id}
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
            <div className="flex flex-col">
              <label
                htmlFor="stitching"
                className="text-sm font-bold text-gray-800 "
              >
                Stitching
              </label>
              <select
                type="text"
                id="stitching"
                name="stitching"
                required
                defaultValue={pattern.stitching.id}
                className="rounded border border-gray-400 bg-transparent py-3 px-3 text-sm text-gray-500  shadow-sm"
              >
                <option value="">Select stitching</option>
                {stitching.map((stitch) => (
                  <option key={stitch.id} value={stitch.id}>
                    {stitch.name}
                  </option>
                ))}
              </select>
            </div>
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
                name="image" 
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
                name="doc" 
              />
            </div>
          </div>
        </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white text-lg font-medium px-8 rounded py-1 mt-3"
          >
            {loading ? "Please wait...." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
};
export default Pattern;


export async function getServerSideProps({params: {id}}) {

    let { data: categories } = await supabase.from("category").select("id, name");

    let { data: products } = await supabase.from("products").select("id,name");

    let { data: stitching } = await supabase.from("stitching").select("id, name");

  //fetch the pattern with the id of id from supabase
  const {data: pattern, error} = await supabase.from("patterns").select("*, product_id(*), category(*), stitching(*)").eq("id", id).single()

  if(error) {
    console.log(error.message)
    throw new Error("Something went wrong: " + error.message)
  }

  return {
    props: {
      pattern,
      categories,
      products,
      stitching,
    },
  };

}
