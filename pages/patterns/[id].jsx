/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/future/image'
import supabase from '../../utils/supabase';
import useMeasure from "react-use-measure";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';


const Pattern = ({ pattern }) => {

const [ref, bounds] = useMeasure();




  return (
    <main className="max-w-7xl py-12 mx-auto px-6 relative lg:px-4">

      <Link href="/patterns" passHref>
      <button className="mt-8 bg-accent px-6 py-1 rounded text-white uppercase">
        Back To Patterns
      </button>
      </Link>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full">
        <Image ref={ref} height={1080} width={1080} className="w-full object-cover" src={pattern.image} alt="image" />

        </div>



        <div className="w-full">
      <h1 className="font-georgia uppercase text-2xl text-accent md:text-4xl">
        {pattern.name}
      </h1>

          <p className="text-md text-deep mb-2">
            <span className="font-futuraBold mr-6">Stitching:</span>
            <span className="font-futuraBook">{pattern.stitching.name}</span>
          </p>
          <p className="text-md text-deep mb-2">
            <span className="font-futuraBold mr-6">Category:</span>
            <span className="font-futuraBook">{pattern.category.name}</span>
          </p>
          <p className="text-md text-deep mb-6">
            <span className="font-futuraBold mr-6">Yarns:</span>
            <span className="font-futuraBook">{pattern.product_id.name}</span>
          </p>

          <Link href={pattern.document}>
            <a className="mt-8 bg-accent text-white rounded text-base lg:text-lg px-8 py-2 uppercase">
              Download Pattern
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};






export default Pattern;

export async function getServerSideProps({ params: { id } }) {
  console.log(id);

  let { data: patterns, error } = await supabase
    .from('patterns')
    .select('*, stitching(id, name), category(id, name), product_id(id, name)')
    .eq('id', id)
    .single();

  return {
    props: {
      pattern: patterns,
    },
  };
}
