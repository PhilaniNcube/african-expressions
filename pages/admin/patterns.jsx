import PatternsTable from "../../components/PatternsTable";
import supabase from "../../utils/supabase";

const patterns = ({patterns}) => {


  return (
    <main className="max-w-7xl mx-auto px-6 md:px-4 lg:px-0 py-12">
      <h1 className="text-3xl text-deep font-georgiaBold">Patterns</h1>
      <hr className="text-dark" />
      <PatternsTable patterns={patterns} />

    </main>
  );
};
export default patterns;


export async function getServerSideProps() {
  let { data: patterns, error } = await supabase.from("patterns").select("*, product_id(*), category(*), stitching(*)");

  if(error) console.log(error.message)

  return {
    props: {
      patterns,
    },
   
  };
}
