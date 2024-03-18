"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store";
import ProductCardPay from "../productCartPay/ProductCardPay";
import styles from "./PayCatalog.module.css"
import HeaderSub from "@/components/header/HeaderSub";

export const PayCatalog = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");
  const allProduct = useAppSelector((state) => Object.values(state.catalogo));
  const addAll = allProduct.reduce(
    (total, elemento) => total + (elemento.price*elemento.quantity),
    0
  );

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

      <div className={styles.productGridCard}>
        <div className={styles.headerProductgridCart}>
          <span>{allProduct.length} Items </span>
        </div>
            {allProduct.map((cat) => (
                <ProductCardPay key={cat.id} catalogs={cat} />
              ))}
        <div className={styles.containerPayText}>
          <div className={styles.textSection}>
            <span className={styles.text1}>Envío</span>
            <span className={styles.text2}>GRATIS</span>
          </div>
          <div className={styles.priceTotal}>
            <span className=" ">Valor total</span>
            <span className="">${new Intl.NumberFormat().format(addAll)}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
