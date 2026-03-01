import supabaseService from "../../utils/supabaseService";

export default async function handler(req, res) {
  const { data, error } = await supabaseService
    .from("products")
    .update([
      {
        main_image: req.body.image,
      },
    ])
    .eq("id", req.body.id);



  if (error) {
    res.send(error);
    return;
  }

  if (data) {
    res.send({ status: 200, body: data });
  }
}
