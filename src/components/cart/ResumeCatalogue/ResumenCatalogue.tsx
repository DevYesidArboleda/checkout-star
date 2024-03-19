"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store";
import styles from "./ResusmenCatalogue.module.css";
import ProductCardPay from "@/components/cataloguePay/productCartPay/ProductCardPay";
import ModalForm from "@/components/Modal/ModalForm/ModalForm";
import FormCatalog from "@/components/formCatalog/FormCatalog";

export const ResumenCatalogue = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");
  const allProduct = useAppSelector((state) => Object.values(state.catalogo));
  const addAll = allProduct.reduce(
    (total, elemento) => total + elemento.price * elemento.quantity,
    0
  );

  //carrito abrir y cerrar
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    // Lógica de manejo de datos del formulario
    console.log("Datos del formulario:", data);
  };

  return (
    <>
      <div className={styles.mainResumenCatalogue}>
        <div className={styles.productGridCard}>
          <div className={styles.headerProductgridCart}>
            <span>{allProduct.length} Items </span>
          </div>
          <div className={styles.containerItemCat}>
            {allProduct.map((cat) => (
              <ProductCardPay key={cat.id} catalogs={cat} />
            ))}
          </div>
          <div className={styles.containerPayText}>
            <div className={styles.textSection}>
              <span className={styles.text1}>Envío</span>
              <span className={styles.text2}>GRATIS</span>
            </div>
            <div className={styles.priceTotal}>
              <span className=" ">Valor total</span>
              <span className={styles.fontTotalPrice}>
                ${new Intl.NumberFormat().format(addAll)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.conatinerButtonShop}>
          {allProduct.length !== 0 ? (
            <button
              className={styles.nextShopButton}
              type="button"
              onClick={handleOpenModal}
            >
              Continuar con la compra
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormCatalog onSubmit={handleFormSubmit} />
      </ModalForm>
    </>
  );
};
