// Modal.js
import React, { ReactNode, useState } from 'react';
import styles from "./ErrorModal.module.css"

interface ModalPropsError {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }

  const ErrorModel: React.FC<ModalPropsError> = ({ isOpen, onClose, children }) => {
    return (
      <div className={`${styles.visibleModal} ${isOpen ? styles.visibleModalOn : styles.visibleModalOff }`} onClick={onClose}>
        <div className={`${styles.containerModal} ${isOpen ? styles.containerModalOn : styles.containerModalOff }`} onClick={(e)=>e.stopPropagation()}>          
          {children}
          <button className={styles.buttonModal} onClick={onClose}>Aceptar</button>
        </div>
      </div>
    )
  };
  
  export default ErrorModel;