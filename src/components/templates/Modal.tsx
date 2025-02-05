import { Icon } from "@iconify/react/dist/iconify.js";

type modalProps = {
  setModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ setModal, children }: modalProps) => {
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative bg-white z-20 w-full max-w-md mx-auto border shadow-lg p-4 rounded-md">
        <Icon
          icon="iconamoon:close-bold"
          className="text-2xl absolute top-3 right-3 cursor-pointer text-black"
          onClick={setModal}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;