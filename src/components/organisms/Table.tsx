"use client";

import React from "react";
import Head from "@/components/molecules/table/Head";
import Body from "@/components/molecules/table/Body";

interface TableProps {
  headers: string[];
  rows: string[][];
  link?: boolean;
}

const Table = ({ headers, rows, link }: TableProps) => (
    <div className="overflow-x-auto shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <Head headers={headers} />
        <Body rows={rows} link={link} />
      </table>
    </div>
  );

export default Table;
