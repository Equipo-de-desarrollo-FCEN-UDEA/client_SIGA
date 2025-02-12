"use client";

import View from "@modules/applications/mobility/pages/View";
import { useParams } from "next/navigation";

import React from 'react'



const Page = () => {
  const { id } = useParams();
  return(
    <View id={id as string} />
);
}

export default Page;
