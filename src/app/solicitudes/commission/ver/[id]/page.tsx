"use client";
import React from 'react';
import { useParams } from "next/navigation";
import CommissionViewComponent from "@/modules/applications/commission/pages/View";

const Page = () => {
  const { id } = useParams();
  return(
    <CommissionViewComponent id={id as string} />
);
}

export default Page;