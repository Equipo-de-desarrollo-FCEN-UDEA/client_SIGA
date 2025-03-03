import React, { ReactNode, FC } from 'react'
import UserApplicationStatus from '@/core/interfaces/applications/applicationsStatus'
import "./View.css"

interface Props {
  title: string;
  statuses: UserApplicationStatus[];
  children: ReactNode;
}

const View: FC<Props> = ({ title, statuses, children }) => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>{title}</h1>
      <div>
        {children}
      </div>
      <div>
        {statuses.map((status, index) => (
          index === (statuses.length - 1) && (
            <div key={index} className='grid grid-cols-3 mb-6'>
            <div>
              <h5>Fecha</h5>
              <p>{status.date.toString().substring(0, 9)}</p>
            </div>
            <div>
              <h5>Estado</h5>
              <div className="w-fit px-1 h-7 border-2 border-green-800 text-green-800 rounded-lg font-bold">
                <p>{status.name}</p>
              </div>
            </div>
          </div>
          )
        ))}
      </div>
    </div>
  )
}

export default View