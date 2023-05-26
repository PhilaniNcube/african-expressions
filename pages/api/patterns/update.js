import supabaseService from "../../../utils/supabaseService";

export default async function handler(req, res) {

  const {name, image, document, product, stitching, category, id} = req.body;

  console.log({ name, image, document, product, stitching, category, id });

  const { data, error } = await supabaseService.from("patterns").update(
    {
      name: name,
      image: image,
      document: document,
      product_id: product,
      stitching: stitching,
      category: category,
    },
  ).eq("id", id);

  if (error) {
    res.send(error);
    return;
  }

  if (data) {
    res.send({ status: 200, body: data });
  }
}
