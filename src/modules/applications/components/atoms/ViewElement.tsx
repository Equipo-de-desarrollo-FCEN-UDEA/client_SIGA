import React from 'react'

interface ViewElementProps {
    label: string;
    body: string;
}

const ViewElement = ({ label, body }: ViewElementProps) =>(
        <div>
            <h3 className='font-bold text-sm'>{label}</h3>
            <p className='text-base'>{body}</p>
        </div>
    )

export default ViewElement