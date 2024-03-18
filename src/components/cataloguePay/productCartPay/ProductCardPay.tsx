import Link from "next/link";
import React, { useState } from "react";
import { SimpleCatalog } from "../../../../interfaces";
import { useAppSelector } from "@/store";
import styles from "./ProductCardPay.module.css"

interface Props {
  catalogs: SimpleCatalog;
}

export default function ProductCardPay(catalog: Props) {  

  return (
    <div className={styles.maincontainerProductCartPay}>
      <div className={styles.containerProductCartPay}>
        <div className={styles.containerProductCartPaySection}>
          <div>
            <img
              className={styles.prductCardpayImg}
              src={catalog.catalogs.thumbnail}
              alt={`${catalog.catalogs.name} thumbnail`}
            />
          </div>
          <div className={styles.conatinerProductCartName}>
            <span className={styles.productCartName}>
              {catalog.catalogs.name}
            </span>
          </div>
          <div className="">
            <span className={styles.productCartPrice}>
              $ {new Intl.NumberFormat().format(catalog.catalogs.price)}
            </span>
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">          
        </div>
      </div>
    </div>
  );
}
