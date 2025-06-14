import React, { ReactNode, FC, useState } from 'react'
import "./View.css"
import UserApplication from '@/core/interfaces/applications/userApplication';
import Link from 'next/link';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import Status from '@/modules/applications/components/molecules/Status';
import { useRouter } from 'next/navigation';
import { FaAngleLeft } from "react-icons/fa6";
import * as Tooltip from '@radix-ui/react-tooltip'


interface Props {
  title: string;
  userApplication: UserApplication;
  children: ReactNode;
}

const View: FC<Props> = ({ title, userApplication, children }) => {
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className='my-3 relative'>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => router.back()}
                  className="group bg-white rounded-md p-2 shadow transition-colors hover:bg-gray-700"
                >
                  <FaAngleLeft
                    size={20}
                    className="text-gray-800 transition-colors group-hover:text-white"
                  />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="left"
                  sideOffset={8}
                  className="z-50 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md"
                >
                  Volver
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <h1 className="text-2xl font-bold">{title}</h1>
        </div>



        <div>
          {children}
        </div>
        <div className='flex flex-col border-b-2 py-3 my-2'>
          <h5 className='font-bold'>
            Documentos:
          </h5>
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