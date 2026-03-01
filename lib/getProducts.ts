import supabase from '../utils/supabase';
import { Product } from '../types';

const getProducts = async (): Promise<Product[]> => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('type', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (products ?? []) as Product[];
};

export default getProducts;
