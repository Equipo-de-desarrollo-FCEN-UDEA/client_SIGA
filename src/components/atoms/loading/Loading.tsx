"use client";

import React from 'react'
import { BlinkBlur } from 'react-loading-indicators'

import { useLoading } from '@/core/providers/LoadingProvider'

const Loading = () => {

  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <BlinkBlur color="#00950a" size="large" text="Cargando" textColor="" />
    </div>
  )
}

export default Loading
