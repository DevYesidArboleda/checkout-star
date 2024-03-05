import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import { UseWindowSize } from "@/hooks/UseWindowSize";
import styles from "./ModalForm.module.css"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalForm: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const windowSize = UseWindowSize();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ x: "100%", opacity: 0 }}  // Establecer la opacidad inicial en 0
        animate={{ x: 0, opacity: 1 }}       // Establecer la opacidad en 1 al animar
        exit={{ x: "100%", opacity: 0 }}     // Establecer la opacidad en 0 al salir
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `${windowSize.width <= 767 ? "#E7ECEF": "rgba(0, 0, 0, 0.6)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height:`${windowSize.width <= 767 ? "100dvh": ""}`,
          zIndex:`${windowSize.width <= 767 ? 40: 1}`,
        }}
      >
        <button className={`${styles.buttonBack} ${windowSize.width <= 767 ? "": styles.buttonBackHidden }`}  onClick={onClose}><Image src="/img/backToPage.svg" alt="" width={20} height={20} /></button>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            background: "white",
            padding: `${windowSize.width <= 767 ? "16px": "10px 64px 50px 64px"}`,
            borderRadius: "8px",
            width: `${windowSize.width <= 767 ? "95%": "566px"}`,
          }}
        >
          <button className={`${styles.buttonClose} ${windowSize.width <= 767 ? styles.buttonBackHidden: ""}`} onClick={onClose}><Image src="/img/close.svg" alt="" width={24} height={24} /></button>
          {children}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalForm;