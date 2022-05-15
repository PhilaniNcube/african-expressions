import supabase from '../utils/supabase';

const getProducts = async () => {
  let { data: products, error } = await supabase.from('products').select('*');

  return {
    products: products,
    error: error,
  };
};

export default getProducts;
