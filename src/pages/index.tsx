import DataTable from "@/components/DataTable";
// import MOCK_DATA from "@/components/MOCK_DATA.json";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
    disableFilters: true,
  },
  {
    Header: "First Name",
    accessor: "first_name",
    Footer: "First Name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    Footer: "Last Name",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
    Footer: "Date of Birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Country",
    accessor: "country",
    Footer: "Country",
  },
  {
    Header: "Phone",
    accessor: "phone",
    Footer: "Phone",
  },
];

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/dataTable", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function dataFetch() {
      const data = await getData();
      setData(data);
      setIsLoading(false);
    }
    dataFetch();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            {isLoading ? (
              <span className="text-5xl">{"Loading..."}</span>
            ) : (
              <DataTable
                data={data}
                columns={COLUMNS}
                sortable
                filterable
                pagination
                caption={"React Table"}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
