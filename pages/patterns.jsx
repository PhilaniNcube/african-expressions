/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { Fragment, useMemo, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useQuery } from 'react-query';
import supabase from '../utils/supabase';

const Patterns = ({ initialData }) => {
  const [filter, setFilter] = useState('');
  const [image, setImage] = useState('');
  const [show, setShow] = useState('');

  const router = useRouter();

  console.log(filter);

  const productsQuery = useQuery('yarns', async () => {
    let { data: products, error } = await supabase.from('products').select('*');

    return products;
  });

  const products = productsQuery.data;

  const patternsQuery = useQuery(
    'patterns',
    async () => {
      let { data: patterns, error } = await supabase
        .from('patterns')
        .select(
          '*, stitching(id, name), category(id, name), product_id(id, name)',
        );

      return patterns;
    },
    {
      initialData: initialData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const patterns = patternsQuery.data;

  const filteredPatterns = useMemo(
    () =>
      patterns.filter((pattern) =>
        pattern.product_id.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, patterns],
  );

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`my-4 relative oveflow-scroll h-screen`}>
      <div className="max-w-7xl mx-auto">
        {show && <Modal image={image} setShow={setShow} />}
        <div className="w-full grid gap-6 grid-cols-1 relative lg:grid-cols-4">
          <div className="col-span-1 isolate relative">
            <div className="w-full absolute top-0 left-0 shadow-md px-2 py-2 rounded flex flex-row flex-wrap lg:flex-col">
              <h1 className="text-3xl font-georgiaBold text-slate-800">
                Patterns
              </h1>
              <div className="flex flex-wrap md:flex-col  md:space-y-2 w-full items-center my-8">
                {productsQuery.isLoading && (
                  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
                )}

                {productsQuery.isSuccess && (
                  <Fragment>
                    <button
                      onClick={() => setFilter('')}
                      className="bg-slate-300/20 hover:bg-slate-300/40  w-full py-1 rounded-md"
                    >
                      All
                    </button>

                    {productsQuery.data.map((product) => (
                      <button
                        onClick={() => setFilter(product.name)}
                        key={product.id}
                        className="bg-slate-300/20 hover:bg-slate-300/40  w-full py-1 rounded-md"
                      >
                        {product.name}
                      </button>
                    ))}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="columns-2 lg:columns-3 col-span-1  md:col-span-3">
            {filteredPatterns.map((pattern, i) => {
              return (
                <div
                  className="relative my-3 mx-1 rounded-md overflow-hidden"
                  key={pattern.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    alt={pattern.name}
                    src={pattern.image}
                    className={`w-full h-full block z-10 shadow-xl  hover:shadow-sm object-cover rounded-md`}
                  />

                  <div
                    className={`absolute inset-0 h-full flex flex-col transition-all duration-300 justify-center items-center z-20 ${
                      hoveredIndex === i
                        ? 'opacity-80 bg-blend-overlay bg-slate-800/50'
                        : 'opacity-0 hidden '
                    }`}
                  >
                    <h2 className="font-georgiaBold text-center px-2 text-xl text-white pb-6">
                      {pattern.name}
                    </h2>
                    <div
                      onClick={() => {
                        setShow(true);
                        setImage(pattern.image);
                      }}
                      className="flex items-center my-2"
                    >
                      <span className="bg-yellow-800 h-10 w-10 text-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                      <p className="py-3 px-9 bg-yellow-600 text-gray-800 font-georgia text-xs">
                        View Pattern
                      </p>
                    </div>
                    <div
                      onClick={() => router.push(pattern.document)}
                      className="flex items-center"
                    >
                      <span className="bg-yellow-800 h-10 w-10 text-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </span>
                      <p className="py-3 px-6 bg-yellow-600/90 text-gray-800 font-georgia text-xs">
                        Download Pattern
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patterns;

export async function getServerSideProps() {
  let { data: patterns, error } = await supabase
    .from('patterns')
    .select('*, stitching(id, name), category(id, name), product_id(id, name)');

  let { data: products } = await supabase.from('products').select('*');

  return {
    props: {
      initialData: patterns,
      error,
    },
  };
}

function Modal({ image, setShow }) {
  return (
    <div className="fixed bottom-[5%] flex items-center w-screen h-screen z-40">
      <img
        className="h-2/3  mx-auto object-cover bg-slate-300 shadow-2xl shadow-black/40 p-2 rounded-md"
        src={image}
        alt="pattern"
        onClick={() => setShow(false)}
      />
    </div>
  );
}
