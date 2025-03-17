import Modal from '@/components/templates/Modal'
import { UserApplicationStatus } from '@/core/interfaces/applications/userApplication';
import React from 'react'

interface StatusProps {
    status: UserApplicationStatus[];
    setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;

}

const Status = ({ status, setStatusModal }: StatusProps) => {
    return (
        <Modal setModal={() => setStatusModal(false)}>
            <div className="grid grid-cols-3 gap-y-2 mt-2">
                <h3 className="font-bold border-b pb-2">Estado</h3>
                <h3 className="font-bold border-b pb-2 text-center">Observación</h3>
                <h3 className="font-bold border-b pb-2 text-right">Fecha</h3>

                {status.map((status) => (
                    <React.Fragment key={status.status.name}>
                        <p className={`border-b py-2 `}>
                            {status.status.description}
                        </p>
                        <p className={`border-b py-2 `}>
                            {status.observation}
                        </p>
                        <p className={`border-b py-2 text-right`}>
                            {new Date(status.created_at).toLocaleDateString()}
                        </p>
                    </React.Fragment>
                ))}
            </div>
        </Modal>
    )
}

export default Status