import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import style from "./ModalCartResumen.module.css"
import HeaderSub from "@/components/header/HeaderSub";
//import { NavBar } from "../ui";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalCartResumen: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  

  return (
    <>
      {isOpen && (
        <div
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
        <div className={style.containerMain}>            
          <HeaderSub/>  
          </div>
        <div
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
            <span className= {`${""}`}>Resumen de la compra</span>
          </div>
          {children}
        </div>
      </div>
      )}
    </>
  );
};

export default ModalCartResumen;