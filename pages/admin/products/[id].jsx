import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../../../utils/supabase";

const Product = ({product}) => {

  const router = useRouter('/admin/products')

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  console.log({product})

    const handleImageUpload = async (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      setLoading(true);

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;

      let upload = await supabase.storage
        .from("products")
        .upload(`${fileName}`, file);

      const fileUrl = upload.data.Key;

      if (fileUrl.length > 0) {
        alert("File Uploaded");
      }

      setImage(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`
      );

      setLoading(false);
    };


      const handleSubmit = async (e) => {
        e.preventDefault();

        const productImage = await fetch(`/api/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: image,
            id: product.id
          }),
        });

        const response = await productImage.json();

        if (response.status === 200) {
          alert("Pattern has been added succesfull");
          router.push('/admin/products')
        } else {
          alert("There was a problem saving the pattern");
        }

        setImage("");

      };

  return (
    <main className="my-8">
      <section className="max-w-7xl mx-auto px-4">
        <div className="">
          <p className="text-2xl text-gray-700 font-bold">{product.name}</p>
          <form onSubmit={handleSubmit}>
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

            <button className="bg-blue-600 text-white px-8 py-2 rounded mt-2">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Product;


export async function getServerSideProps({ params: { id } }) {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      product: products,
    },
  };
}
