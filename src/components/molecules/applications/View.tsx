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
      <h3>{title}</h3>
      <div>
        {children}
      </div>
      <div>
        {statuses.map((status, index) => (
          <div key={index}>
            <p>{status.date.toString()}</p>
            <p>{status.name}</p>
            <p>{status.updated_by}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default View