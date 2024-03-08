import React, { ReactNode } from 'react';
import Image from "next/image";
import styles from "./ModalInfo.module.css"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`${styles.visibleModal} ${isOpen ? styles.visibleModalOn : styles.visibleModalOff }`} onClick={onClose}>
        <div className={`${styles.containerModal} ${isOpen ? styles.containerModalOn : styles.containerModalOff }`} onClick={(e)=>e.stopPropagation()}>          
        <button className={styles.buttonClose} onClick={onClose}>
          <Image src="/img/close.svg" alt="" width={24} height={24} />
        </button>
          {children}          
        </div>
      </div>
  )
};

export default Modal;