import React, { ReactNode, FC, useState } from 'react'
import "./View.css"
import UserApplication from '@/core/interfaces/applications/userApplication';
import Link from 'next/link';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import Status from '@/modules/applications/components/molecules/Status';


interface Props {
  title: string;
  userApplication: UserApplication;
  children: ReactNode;
}

const View: FC<Props> = ({ title, userApplication, children }) => {
  const [statusModal, setStatusModal] = useState<boolean>(false);

  return (
    <div className='my-3'>
      <div>
        <h1 className='text-2xl font-bold mb-3'>{title}</h1>
        <div>
          {children}
        </div>
        <div className='flex flex-col border-b-2 py-3 my-2'>
            <h3 className='font-bold text-sm'>
              Documentos:
            </h3>
            <div className="flex">
              <div className='flex flex-col'>
                {userApplication?.documents?.map((document) => (
                  <div key={document.name}>
                    <Link href={document.url} target="_blank" rel="noopener noreferrer" className='text-blue-700'>{document.name}</Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <SecondaryButton text="Ver estados de la solicitud" onClick={() => setStatusModal(true)} />
      </div>
      {statusModal && userApplication && (
        <Status status={userApplication?.user_application_status} setStatusModal={setStatusModal} />
      )}
    </div>
  )
}

export default View