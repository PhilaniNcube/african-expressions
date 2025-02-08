import supabaseService from "../../../utils/supabaseService";

export default async function handler(req, res) {
  const { city, contact, lat, long, name, streetAddress, website } = req.body;

  const { data, error } = await supabaseService
    .from("stores").insert([{
      city: city,
      contact: contact,
      lat: lat,
      long: long,
      name: name,
      streetAddress: streetAddress,
      website: website,
    }]).select("*");

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
