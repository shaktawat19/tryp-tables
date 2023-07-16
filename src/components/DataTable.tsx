import React, { useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  Row,
} from "react-table";
import GlobalFilter from "./GlobalFilter";

const DataTable = ({
  data,
  columns,
  sortable,
  filterable,
  pagination,
  caption,
}) => {
  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      initialState: { pageIndex: 2 },
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [rowData, setRowData] = useState(pagination ? page : rows);

  useEffect(() => {
    if (pagination) {
      const rowData = Object.keys(rows).length <= pageSize ? rows : page;
      setRowData(rowData);
    }
  }, [rows, pageSize, page, pagination]);

  return (
    <div className="pb-4">
      <div className="flex flex-col sm:flex sm:gap-x-2">
        {caption && <h2 className="text-xl my-4 font-semibold">{caption}</h2>}
        {filterable && (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}
      </div>

      {/* table */}

      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                className="min-w-full divide-y divide-gray-200"
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {sortable
                        ? headerGroup.headers.map((column) => (
                            <th
                              className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              <div className="flex items-center justify-between">
                                {column.render("Header")}
                                <span>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <span className="w-4 h-4 text-gray-400">
                                        🔽
                                      </span>
                                    ) : (
                                      <span className="w-4 h-4 text-gray-400">
                                        🔼
                                      </span>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </th>
                          ))
                        : headerGroup.headers.map((column) => (
                            <th
                              className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps()}
                            >
                              <div className="flex items-center justify-between">
                                {column.render("Header")}
                              </div>
                            </th>
                          ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  {...getTableBodyProps()}
                >
                  {rowData.map((row) => {
                    prepareRow(row);

                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              className="px-6 py-4 whitespace-nowrap"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* pagination */}

      {pagination && (
        <div className="py-3 flex items-center justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-gray-700">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <div>
              Go to page:
              <input
                className="ml-1 p-1 rounded-md border-gray-300 outline-none shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
              />
            </div>
          </div>

          <div>
            <select
              className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show: {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div
            className="rounded-md p-1 flex items-center justify-between bg-white"
            aria-label="Pagination"
          >
            <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
              <span className="  p-2 h-3 w-5 text-gray-400" aria-hidden="true">
                {"<<"}
              </span>
            </button>
            <button disabled={!canPreviousPage} onClick={() => previousPage()}>
              <span className=" p-2 h-3 w-5 text-gray-400" aria-hidden="true">
                {"<"}
              </span>
            </button>
            <button disabled={!canNextPage} onClick={() => nextPage()}>
              <span className=" p-2 h-3 w-5 text-gray-400" aria-hidden="true">
                {">"}
              </span>
            </button>

            <button
              disabled={!canNextPage}
              onClick={() => gotoPage(pageCount - 1)}
            >
              <span className=" p-2 h-3 w-5 text-gray-400" aria-hidden="true">
                {">>"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
