import DataTable from "@/components/DataTable";
import MOCK_DATA from "@/components/MOCK_DATA.json";
import { format } from "date-fns";
import { useMemo } from "react";

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

export default function Home() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            <DataTable
              data={data}
              columns={columns}
              sortable
              filterable
              pagination
              caption={"React Table"}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
