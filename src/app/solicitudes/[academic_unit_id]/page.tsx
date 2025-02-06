import View from '@/modules/applications/by_academic_unit/Pages/View'
import React from 'react'

function page({params}: {params: {academic_unit_id: string}}) {
  return (
    <View id={params.academic_unit_id} />
  )
}

export default page