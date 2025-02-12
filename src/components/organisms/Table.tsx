"use client";

import React from "react";
import Head from "@/components/molecules/table/Head";
import Body from "@/components/molecules/table/Body";

type list = string[];
interface TableProps {
  headers: string[];
  rows: list[];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <Head headers={headers} />
        <Body rows={rows} />
      </table>
    </div>
  );
};

export default Table;
