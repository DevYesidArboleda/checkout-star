import React, { useEffect, useState } from "react";
import { SimpleCatalog } from "../../../../interfaces";
import ProductCard from "../ProductCart/ProductCard";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { resetCatalog } from "@/store/catalog/catalogs";
import Image from "next/image";
import styles from "./OnlyProdutcGrid.module.css";
import ModalForm from "@/components/Modal/ModalForm/ModalForm";
import FormCatalog from "@/components/formCatalog/FormCatalog";

export default function OnlyProductGrid({ catalog }: any) {
  const [finalData, setFinalData] = useState<any>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const final: any = catalog.data;
      final.forEach((element: any) => {
        setFinalData(element);
      });
    };

    fetchData();
  }, [catalog]);

  console.log("OnlyProductGrid", finalData);
  const allProduct = useAppSelector((state) => Object.values(state.catalogo));
  const addAll = allProduct.reduce(
    (total, elemento) => total + elemento.price * elemento.quantity,
    0
  );

  const dispatch = useDispatch();

  const handleLimpiarCatalogo = () => {
    dispatch(resetCatalog());
  };

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
      <div className={styles.mainProductGrid}>
        <div className={styles.productGridCol}>
          <div className={styles.productGridCard}>
            <div className={styles.headerProductgridCart}>
              <div className={styles.headerProductGridCartItems}>
                <span className={styles.headerProductgridCartText}>
                  1 items
                </span>
                {/* <span
                  onClick={handleLimpiarCatalogo}
                  className={styles.cleanCart}
                >
                  Limpiar carrito
                </span> */}
              </div>
              <div className={styles.headerProductgridCartImage}>
                <div className={styles.headerProductgridCartImageMain}>
                  <Image
                    src="/img/cart.svg"
                    alt=""
                    width={25}
                    height={25}
                    className="lg:flex hidden"
                  />
                  <span className={styles.headerProductgridCartImageRounde}>
                    {1}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.mainProductCart}>
              <div className={styles.productCartColumn}>
                <div className={styles.productCartContainerImage}>
                  <div>
                    <img
                      className={styles.productCartImage}
                      src={finalData.thumbnail}
                      alt={`${finalData.name} thumbnail`}
                    />
                  </div>
                  <div className={styles.productCartContainerInfo}>
                    <span className="">{finalData.name}</span>
                  </div>
                  <div className="">
                    <span className={styles.productCartPrice}>
                      $ {new Intl.NumberFormat().format(finalData.price)}
                    </span>
                  </div>
                </div>
                <div className={styles.productCartModify}>
                  {finalData.variations?.length === 0 ? (
                    <div></div>
                  ) : (
                    <div className="">
                      <button className={styles.productCartModifyButton}>
                        Modificar
                      </button>
                    </div>
                  )}
                  <div>
                    <div className={styles.productCartAddRestButton}>
                      {/* Botón para restar */}
                      <button onClick={() =>
                            {quantity > 1 && setQuantity((quantity) => quantity - 1)}
                          }>-</button>
                      <span>{quantity}</span>
                      {/* Botón para sumar */}
                      <button onClick={() => setQuantity((quantity) => quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.itemAllItems}>
            <div className={styles.itemAllItemsTextContainer}>
              <span>Items totales</span>
              <span className="">{quantity}</span>
            </div>
            <div className={styles.priceAllItems}>
              <div className={styles.freeShippingTextContainer}>
                <span className={styles.freeShipping}>Envío</span>
                <span className={styles.freeShippingGreen}>GRATIS</span>
              </div>
              <div className={styles.priceAllItemsTextContainer}>
                <span className=" ">Valor total</span>
                <span className="">
                  ${new Intl.NumberFormat().format(finalData.price * quantity)}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
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
      </div>
      <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormCatalog onSubmit={handleFormSubmit} />
      </ModalForm>
    </>
  );
}
