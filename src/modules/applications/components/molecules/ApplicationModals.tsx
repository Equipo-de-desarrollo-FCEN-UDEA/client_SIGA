import Response from '@/modules/applications/components/molecules/Response';
import Modal from '@/components/templates/Modal';
import Reject from '@/modules/applications/components/molecules/Reject';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import MainButton from '@/components/atoms/buttons/MainButton';

type ApplicationModalsProps = Readonly<{
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
}>;

export default function ApplicationModals(props: ApplicationModalsProps) {
  return (
    <>
      {props.modal && (
        <Response
          user_application_id={props.applicationId}
          academic_unit_id={props.academicUnitId}
        />
      )}

      {props.confirmModal && (
        <Modal setModal={() => props.setConfirmModal(false)}>
          <h3 className="text-lg font-bold mb-4">¿Estás seguro de que deseas enviar esta solicitud?</h3>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => props.setConfirmModal(false)} />
            <MainButton text="Confirmar" onClick={props.createVoting} />
          </div>
        </Modal>
      )}

      {props.responseModal && (
        <Modal setModal={() => props.setResponseModal(false)}>
          <h3 className="text-lg font-bold mb-4">Responder solicitud</h3>
          <p>¿Estás seguro de que deseas aprobar esta solicitud?</p>
          <div className="flex justify-end gap-4">
            <SecondaryButton text="Cancelar" onClick={() => props.setResponseModal(false)} />
            <MainButton text="Aprobar" onClick={props.approveApplication} />
          </div>
        </Modal>
      )}

      {props.rejectModal && props.userApplication && (
        <Reject 
          userApplicationId={props.userApplication.id} 
          setRejectModal={props.setRejectModal} 
        />
      )}
    </>
  );
}
