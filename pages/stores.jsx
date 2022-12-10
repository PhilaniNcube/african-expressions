import { Fragment } from "react";

import MapComponent from "../components/MapComponent";
import getStores from "../lib/getStores";

const stores = ({stores}) => {
  return (
    <Fragment>
      <div className="max-w-7xl mx-auto">
        <MapComponent stores={stores} />
      </div>
    </Fragment>
  );
};
export default stores;


export async function getServerSideProps() {
  const stores = await getStores();

  return {
    props: {
      stores,
    },
  };
}
