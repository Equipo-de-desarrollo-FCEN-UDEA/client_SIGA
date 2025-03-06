'use client'
import React from 'react'
import { useParams } from "next/navigation";
import View from '@/modules/applications/purchase/pages/View'
const Page = () => {
    const { id } = useParams();
    return (
        <View id={id as string} />
    )
}

export default Page