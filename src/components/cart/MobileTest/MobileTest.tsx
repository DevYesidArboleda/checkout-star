"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MobileTest.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store";
import ProductGrid from "../ProductGrid/ProductGrid";
import HeaderComponent from "@/components/header/HeaderComponent";

export const Mobiletest = () => {
  const addProduct = useAppSelector((state) => Object.values(state.catalogo));

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.containerMobileCart}>      
      <div className={`${styles.mainContainerModal}`}>
        <button onClick={handleGoBack}>
          <Image
            src={`${"/img/backToPage.svg"}`}
            alt=""
            width={20}
            height={20}
          />
        </button>
        <span className={`${""}`}>Carrito de compra</span>
      </div>
      <ProductGrid catalog={addProduct} />
    </div>
  );
};
