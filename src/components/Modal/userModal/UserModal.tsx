// Modal.js
import React, { ReactNode, useState } from 'react';
import styles from "./UserModal.module.css"

interface ModalPropsUser {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }
  
  const UserModal: React.FC<ModalPropsUser> = ({ isOpen, onClose, children }) => {
    return (
      <div className={`${styles.visibleModal} ${isOpen ? styles.visibleModalOn : styles.visibleModalOff }`} onClick={onClose}>
        <div className={`${styles.containerModal} ${isOpen ? styles.containerModalOn : styles.containerModalOff }`} onClick={(e)=>e.stopPropagation()}>          
          {children}
          <button className={styles.buttonModal} onClick={onClose}>Aceptar</button>
        </div>
      </div>
    )
  };
  
  export default UserModal;