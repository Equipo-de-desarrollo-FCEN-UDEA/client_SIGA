"use client";
import React from 'react';
import { useParams } from "next/navigation";
import EditCommissionComponent from '@/modules/applications/commission/pages/Edit';


const Page = () => {
  const { id } = useParams();
  return(
    <EditCommissionComponent id={id as string} />
);
}

export default Page;