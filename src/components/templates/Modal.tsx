import { Icon } from "@iconify/react/dist/iconify.js";

type modalProps = {
  setModal: () => void;
  children: React.ReactNode;
}

const Modal = ({setModal, children}:modalProps) => {
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="absolute bg-white z-20 mt-14 min-w-3xl md:w-[500px] border shadow-lg p-10 rounded-md">
            <Icon
              icon="iconamoon:close-bold"
              className="text-4xl absolute top-5 right-5 cursor-pointer text-black"
              onClick={setModal}
            />
            {children}
          </div>
        </div>
  )
}

export default Modal
