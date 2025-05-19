import Response from '@/modules/applications/components/molecules/Response';
import Modal from '@/components/templates/Modal';
import Reject from '@/modules/applications/components/molecules/Reject';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import MainButton from '@/components/atoms/buttons/MainButton';

interface ApplicationModalsProps {
  modal: boolean;
  confirmModal: boolean;
  responseModal: boolean;
  rejectModal: boolean;
  userApplication: any;
  applicationId: string;
  academicUnitId: string;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  setResponseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRejectModal: React.Dispatch<React.SetStateAction<boolean>>;
  createVoting: () => void;
  approveApplication: () => void;
}

export default function ApplicationModals({
  modal,
  confirmModal,
  responseModal,
  rejectModal,
  userApplication,
  applicationId,
  academicUnitId,
  setConfirmModal,
  setResponseModal,
  setRejectModal,
  createVoting,
  approveApplication
}: ApplicationModalsProps) {
  return (
    <>
      {modal && (
        <Response
          user_application_id={applicationId}
          academic_unit_id={academicUnitId}
        />
      )}

      {confirmModal && (
        <Modal setModal={() => setConfirmModal(false)}>
          <h3 className="text-lg font-bold mb-4">¿Estás seguro de que deseas enviar esta solicitud?</h3>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => setConfirmModal(false)} />
            <MainButton text="Confirmar" onClick={createVoting} />
          </div>
        </Modal>
      )}

      {responseModal && (
        <Modal setModal={() => setResponseModal(false)}>
          <h3 className="text-lg font-bold mb-4">Responder solicitud</h3>
          <p>¿Estás seguro de que deseas aprobar esta solicitud?</p>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => setResponseModal(false)} />
            <MainButton text="Aprobar" onClick={approveApplication} />
          </div>
        </Modal>
      )}

      {rejectModal && userApplication && (
        <Reject 
          userApplicationId={userApplication.id} 
          setRejectModal={setRejectModal} 
        />
      )}
    </>
  );
}
