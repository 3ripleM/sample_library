import React from "react";
import RModal from "react-modal";
import CloseSvg from "../assets/close.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    width: "50%",
    backgroundColor: "#242424",
    padding: 0,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

export type ModalProps = {
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  children: React.ReactNode;
  title: string;
};

export const Modal = ({ modalState, children, title }: ModalProps) => {
  const [isOpen, setIsOpen] = modalState;

  return (
    <RModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(true)}
      style={customStyles}
    >
      <div className="flex flex-col text-white">
        <div className="flex justify-between border-b-[1px] border-white p-4">
          <span>{title}</span>
          <button>
            <img
              className="w-5 h-5"
              onClick={() => setIsOpen(false)}
              alt="close"
              src={CloseSvg}
            />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </RModal>
  );
};
