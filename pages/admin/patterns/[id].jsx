import supabase from "../../../utils/supabase";

const Pattern = ({pattern}) => {

  console.assert(pattern)

  return <div>Pattern</div>;
};
export default Pattern;


export async function getServerSideProps({params: {id}}) {

  //fetch the pattern with the id of id from supabase
  const {data: pattern, error} = await supabase.from("patterns").select("*, product_id(*), category(*), stitching(*)").eq("id", id).single()

  if(error) {
    console.log(error.message)
    throw new Error("Something went wrong: " + error.message)
  }

  return {
    props: {
      pattern
    }
  }

}
