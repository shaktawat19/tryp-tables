import React, { useState } from "react";
import "regenerator-runtime/runtime";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value1) => {
    setFilter(value1 || undefined);
  }, 1000);

  return (
    <span>
      Search:{" "}
      <input
        className="p-1 rounded-md border-none outline-none shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
