import supabase from '../utils/supabase';

const getProducts = async () => {
  let { data: products, error } = await supabase.from('products').select('*').order('type', {ascending: true});

  if(error) {
    throw new Error(error.details)
  }

return products
};

export default getProducts;
