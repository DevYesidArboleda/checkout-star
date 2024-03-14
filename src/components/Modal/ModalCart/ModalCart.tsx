import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import style from "./ModalCart.module.css"
//import { NavBar } from "../ui";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalCart: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        // initial={{ x: "100%", opacity: 0 } }
        // animate={ { x: 0, opacity: 1 } }
        // exit={{ x: "100%", opacity: 0 } }   // Establecer la opacidad en 0 al salir
        // transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#E7ECEF",
            display: "flex",
            alignItems: "start",
            justifyContent: "end",
            flexDirection: "column",
            height:`${"100vh"}`,
            zIndex:40,
        }}
      >
        <div className={`""flex w-full h-9""`}>
            {/* <NavBar /> */}
          </div>
        <motion.div
          // initial={ { opacity: 0, x: 50 } }
          // animate={ { opacity: 1, x: 0 } }
          // exit={ { opacity: 0, x: 50 } }
          // transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            background: `${"#E7ECEF"}`,
            padding: `${"16px"}`,
            borderRadius: "8px",
            width: `${"100%"}`,
            height: "100vh",
            overflowY: "auto"
          }}
        >          
          <div className={`${style.mainContainerModal}`}>
            <button onClick={onClose}><Image src={`${ "/img/backToPage.svg"}`} alt="" width={20} height={20}  /></button>
            <span className= {`${""}`}>Carrito de compra</span>
          </div>
          {children}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCart;