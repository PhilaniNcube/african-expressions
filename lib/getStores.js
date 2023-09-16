import supabase from '../utils/supabase';

const getStores = async () => {
  let { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .order('name');

    if(error) {
      throw new Error(error)
    }

  return stores;
};

export const getOnlineStores = async () => {
  let { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .order('name').neq('website', null || ""  );

    if(error) {
      throw new Error(error)
    }

  return stores;
};

export default getStores;
