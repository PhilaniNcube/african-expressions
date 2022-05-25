import supabaseService from '../../utils/supabaseService';

export default async function handler(req, res) {
  const { data, error } = await supabaseService.from('patterns').insert([
    {
      name: req.body.name,
      image: req.body.image,
      document: req.body.document,
      product_id: req.body.productId,
      stitching: req.body.stitching,
      category: req.body.category,
    },
  ]);

  if (error) {
    res.send(error);
    return;
  }

  if (data) {
    res.send({ status: 200, body: data });
  }
}
