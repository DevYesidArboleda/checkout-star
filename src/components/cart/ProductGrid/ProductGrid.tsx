import React, { useState } from "react";
import { SimpleCatalog } from "../../../../interfaces";
import ProductCard from "../ProductCart/ProductCard";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { resetCatalog } from "@/store/catalog/catalogs";
import Image from "next/image";
import styles from "./ProdutcGrid.module.css";
import ModalForm from "@/components/Modal/ModalForm/ModalForm";
import FormCatalog from "@/components/formCatalog/FormCatalog";

interface Props {
  catalog: SimpleCatalog[];
}

export default function ProductGrid({ catalog }: Props) {
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
                  {allProduct.length} items
                </span>
                <span
                  onClick={handleLimpiarCatalogo}
                  className={styles.cleanCart}
                >
                  Limpiar carrito
                </span>
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
                    {allProduct.length}
                  </span>
                </div>
              </div>
            </div>

            {allProduct.length === 0 ? (
              <div className={styles.emptyCartContainer}>
                <Image
                    src="/img/emptyCart.svg"
                    alt=""
                    width={108}
                    height={95}
                    className="lg:flex hidden"
                  />
                  <span className={styles.emptycartText}>Carrito de compra vacío</span>
              </div>
            ) : (
              catalog.map((cat) => <ProductCard key={cat.id} catalogs={cat} />)
            )}
          </div>

          <div className={styles.itemAllItems}>
            <div className={styles.itemAllItemsTextContainer}>
              <span>Items totales</span>
              <span className="">{allProduct.length}</span>
            </div>
            <div className={styles.priceAllItems}>
              <div className={styles.freeShippingTextContainer}>
                <span className={styles.freeShipping}>Envío</span>
                <span className={styles.freeShippingGreen}>GRATIS</span>
              </div>
              <div className={styles.priceAllItemsTextContainer}>
                <span className=" ">Valor total</span>
                <span className="">
                  ${new Intl.NumberFormat().format(addAll)}
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
