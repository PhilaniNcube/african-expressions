import React, { useMemo, useState } from 'react';
import supabase from '../utils/supabase';
import { useRouter } from 'next/router';
import { useQuery } from "@tanstack/react-query";
import Link from 'next/link';
import getStores from '../lib/getStores';

const OnlineStores = ({ initialData }) => {
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const onlineStoresQuery = useQuery(
    ['online-stores'],getStores,
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
    <main className="max-w-7xl mx-auto my-8 px-6 md:px-4">
      <div className="w-full py-6">
        <h1 className="text-accent font-extrabold font-georgiaBold text-2xl md:text-4xl">
          Online Stockists
        </h1>

        <div className="flex mt-3 items-center ">
          <div className="flex flex-col ">
            <div className="relative">
              <div className="absolute text-deep flex items-center pl-3 h-full">
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
                className="text-deep bg-white  focus:outline-none focus:border focus:border-gray-700 font-normal pr-20 sm:pr-32 h-10 flex items-center pl-10 text-sm border-gray-300 rounded border shadow"
                placeholder="Search Online Stores"
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 bg-slate-50 py-6 rounded-xl px-4 shadow border border-slate-100 gap-8">


          {onlineStoresQuery.isLoading ? (
            <p className="text-base text-zinc-700">Loading...</p>
          ) : (
            onlineStoresQuery.isSuccess &&
            filteredStores.map((store) => (
              <Link
                href={`https://${store.website}`}
                key={store.id}
                className="bg-white w-full rounded-lg shadow-lg shadow-zinc-800/10 p-4"
              >
                <h3 className="text-accent font-futuraBold uppercase text-lg">
                  {store.name}
                </h3>
                <p className="mt-2 text-deep">
                  Website:
                  <span className="pl-3 text-sky-700 cursor-pointer">
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

  const stores = await getStores();

  return {
    props: {
      initialData: stores,
    },
  };
}
