import supabaseService from "../../../utils/supabaseService";

export default async function handler(req, res) {
  const { id } = req.body;

  const { data, error } = await supabaseService
    .from("stores")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    res.send(error);
    return;
  }

  console.log({ data, error });

  if (data) {
    res.send({ status: 200, body: data });
  }
}
