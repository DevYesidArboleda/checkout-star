"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./payProduct.module.css"
import { useSearchParams } from "next/navigation";
import HeaderSub from "../header/HeaderSub";

export const PayProduct = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");


  return (
    <>
    <HeaderSub/>
    <div className={styles.mainPayCatalogue}>
      <div className={styles.containerPayCatalogue}>
        <div className="">
          <Image
            src="/img/thanksPay.png"
            width={508}
            height={451}
            alt="Logo Star"
            className={styles.imagePayCatalogue}
            priority={true}
          />
        </div>
        <div className="">
          <h1 className={styles.textPayCatalogue}>
            Has realizado tu compra de manera{" "}
            <b >exitosa</b>, en tu correo
            está el resumen de tu pedido
          </h1>
        </div>
        <div>
          <h1 className={styles.textPayCatalogue2}>
            ¡Únete a nuestra comunidad de estrellas y genera ventas con
            productos de nuestros catálogos!
          </h1>
        </div>
        <div className={styles.startButton}>
          <button className="">
            <Link href={`/register?userID=${user_id}`}>
              Quiero ser una estrella
            </Link>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
