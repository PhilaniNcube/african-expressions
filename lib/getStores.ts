import supabase from '../utils/supabase';
import { Store } from '../types';

const getStores = async (): Promise<Store[]> => {
  const { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return (stores ?? []) as Store[];
};

export const getOnlineStores = async (): Promise<Store[]> => {
  const { data: stores, error } = await supabase
    .from('stores')
    .select('*')
    .order('name')
    .not('website', 'is', null)
    .neq('website', '');

  if (error) {
    throw new Error(error.message);
  }

  return (stores ?? []) as Store[];
};

export default getStores;
