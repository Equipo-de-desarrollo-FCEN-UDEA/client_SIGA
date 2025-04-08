import View from '@/modules/applications/auxiliary/View'
import { UUID } from 'crypto'
import React from 'react'

function page({ params }: { params: { academic_unit_id: UUID } }) {
    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <h1 className="text-xl font-bold">Solicitudes</h1>
            <View />
        </div>
    )
}

export default page