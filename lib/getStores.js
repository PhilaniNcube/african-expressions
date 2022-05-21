import supabase from '../utils/supabase';

const getStores = async () => {
  let { data: stores, error } = await supabase.from('stores').select('*');

  return stores;
};

export default getStores;
