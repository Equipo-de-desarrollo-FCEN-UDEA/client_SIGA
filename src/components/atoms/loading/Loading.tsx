import React from 'react'
import { BlinkBlur } from 'react-loading-indicators'

const Loading = () => (
    <div className='flex justify-center items-center h-screen'>
      <BlinkBlur color="#00950a" size="large" text="Cargando" textColor="" />
    </div>
  )

export default Loading
