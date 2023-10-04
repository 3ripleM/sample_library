import React from "react";
import RModal from "react-modal";
import CloseSvg from "../../assets/close.svg";
import "./style.scss";

export type ModalProps = {
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  children: React.ReactNode;
  title: string;
};

export const Modal = ({ modalState, children, title }: ModalProps) => {
  const [isOpen, setIsOpen] = modalState;

  return (
    <RModal isOpen={isOpen} onRequestClose={() => setIsOpen(true)}>
      <div className="flex flex-col text-white">
        <div className="flex justify-between border-b-[1px] border-white p-4">
          <h1 className="text-xl font-bold">{title}</h1>
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
