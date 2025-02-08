import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabaseService from "../../../utils/supabaseService";
import { useState, useMemo } from "react";
import getStores, { getOnlineStores } from "../../../lib/getStores";

const StoresIndex = ({ stores }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery(
    ["stores"],
    getStores,
    {
      initialData: stores,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  // Add memoized filtered stores
  const filteredStores = useMemo(() => {
    return data?.filter((store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const deleteStoreMutation = useMutation({
    mutationFn: async (storeId) => {
      const response = await fetch("/api/stores/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: storeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete store");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
    },
  });

  const handleDelete = async (storeId) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        await deleteStoreMutation.mutateAsync(storeId);
      } catch (error) {
        console.error("Error deleting store:", error);
        alert("Failed to delete store");
        setSearchTerm("");
      }
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="mb-4 text-2xl font-bold">Stores Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stores by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-3xl px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left border-b">Store Name</th>
              <th className="px-6 py-3 text-left border-b">Address</th>
              <th className="px-6 py-3 text-left border-b">Contact</th>
              <th className="px-6 py-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{store.name}</td>
                <td className="max-w-xl px-6 py-4 text-xs border-b">
                  {store.streetAddress}
                </td>
                <td className="px-6 py-4 text-xs border-b">{store.contact}</td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => handleDelete(store.id)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    {deleteStoreMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresIndex;

export async function getServerSideProps() {
  let { data: stores, error } = await supabaseService
    .from("stores")
    .select("*");

  if (error) {
    console.error("Error fetching stores:", error.message);
    return {
      props: {
        stores: [],
      },
    };
  }

  return {
    props: {
      stores: stores || [],
    },
  };
}
