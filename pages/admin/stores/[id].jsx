import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../../../utils/supabase";

const Product = ({ store }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    console.log(e);

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
        id: product.id,
      }),
    });

    const response = await productImage.json();

    if (response.status === 200) {
      alert("Image has been added succesfull");
      router.push("/admin/products");
    } else {
      alert("There was a problem saving the Image");
    }

    setImage("");
  };

  return (
    <main className="my-8">
      <section className="px-4 mx-auto max-w-7xl">
        <div className="">
          <p className="text-2xl font-bold text-gray-700">{product.name}</p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="w-full ">
                <label
                  htmlFor="image"
                  className="inline-block mb-1 text-xs text-gray-700 form-label"
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

            <button className="px-8 py-2 mt-2 text-white bg-blue-600 rounded">
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Product;

export async function getServerSideProps({ params: { id } }) {
  let { data: store, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      store: store,
    },
  };
}
