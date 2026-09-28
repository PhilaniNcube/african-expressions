import { asc, isNotNull } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../db';
import { stores } from '../db/schema';
import { Store } from '../types';

const getStores = async (): Promise<Store[]> => {
  'use cache';
  cacheLife('hours');
  cacheTag('stores');

  const result = await db
    .select()
    .from(stores)
    .orderBy(asc(stores.name));

  return result as Store[];
};

export const getOnlineStores = async (): Promise<Store[]> => {
  'use cache';
  cacheLife('hours');
  cacheTag('stores');

  const result = await db
    .select()
    .from(stores)
    .where(isNotNull(stores.website))
    .orderBy(asc(stores.name));

  return result.filter((store) => store.website !== '') as Store[];
};

export default getStores;
