import React, { useMemo, useState } from 'react';
import supabase from '../utils/supabase';
import { useRouter } from 'next/router';
import { useQuery } from "@tanstack/react-query";
import Link from 'next/link';
import getStores, {getOnlineStores} from '../lib/getStores';

const OnlineStores = ({ initialData }) => {
  const [filter, setFilter] = useState('');
  const router = useRouter();



  const onlineStoresQuery = useQuery(
    ['online-stores'],getOnlineStores,
    {
      initialData: initialData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const stores = onlineStoresQuery.data.filter(item => item.website !== null || "");

  const filteredStores = useMemo(
    () =>
      stores.filter((store) =>
        store.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, stores],
  );

  return (
    <main className="px-6 mx-auto my-8 max-w-7xl md:px-4">
      <div className="w-full py-6">
        <h1 className="text-2xl font-extrabold text-accent font-georgiaBold md:text-4xl">
          Online Stockists
        </h1>

        <div className="flex items-center mt-3 ">
          <div className="flex flex-col ">
            <div className="relative">
              <div className="absolute flex items-center h-full pl-3 text-deep">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={10} cy={10} r={7} />
                  <line x1={21} y1={21} x2={15} y2={15} />
                </svg>
              </div>
              <input
                id="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex items-center h-10 pl-10 pr-20 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none focus:border focus:border-gray-700 sm:pr-32"
                placeholder="Search Online Stores"
              />
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 px-4 py-6 mt-6 border shadow md:grid-cols-2 bg-slate-50 rounded-xl border-slate-100">


          {onlineStoresQuery.isLoading ? (
            <p className="text-base text-zinc-700">Loading...</p>
          ) : (
            onlineStoresQuery.isSuccess &&
            filteredStores.map((store) => (
              <Link
                href={`https://${store.website}`}
                key={store.id}
                className="w-full p-4 bg-white rounded-lg shadow-lg shadow-zinc-800/10"
              >
                <h3 className="text-lg uppercase text-accent font-futuraBold">
                  {store.name}
                </h3>
                <p className="mt-2 text-deep">
                  Website:
                  <span className="pl-3 cursor-pointer text-sky-700">
                    <Link href={`https://${store.website}`}>
                      {store.website}
                    </Link>
                  </span>
                </p>
                <p className="mt-2 text-deep">
                  Contact: <span className="pl-3">{store.contact}</span>
                </p>
                <p className="mt-2 text-deep">
                  Address: <span className="pl-3">{store.streetAddress}</span>
                </p>
                <p className="mt-2 text-deep">
                  Ciy: <span className="pl-3">{store.city}</span>
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default OnlineStores;

export async function getServerSideProps() {

  const stores = await getOnlineStores();

  return {
    props: {
      initialData: stores,
    },
  };
}
