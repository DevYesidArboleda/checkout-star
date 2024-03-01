import React, { useState } from "react";
import { SimpleCatalog } from "../../../../interfaces";
import ProductCard from "../ProductCart/ProductCard";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { resetCatalog } from "@/store/catalog/catalogs";
import Image from "next/image";
import styles from "./ProdutcGrid.module.css";

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

            {catalog.map((cat) => (
              <ProductCard key={cat.id} catalogs={cat} />
            ))}
          </div>

          <div className="flex flex-col bg-white rounded-2xl overflow-hidden p-4">
            <div className="text-[#53545C] text-base flex justify-between border-b-1 border-[#BBC1CA6B] py-3">
              <span>Items totales</span>
              <span className="">{allProduct.length}</span>
            </div>
            <div className="flex flex-col gap-3 py-3">
              <div className="flex flex-row justify-between">
                <span className="text-[#53545C] text-base">Envío</span>
                <span className="text-[#2FCB70] text-base">GRATIS</span>
              </div>
              <div className="flex flex-row justify-between text-[#53545C] text-base font-semibold">
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
                className=" bg-[#F6A97D] rounded-2xl w-full h-[54px] text-xl font-bold text-[#53545C]"
                type="button"
                onClick={handleOpenModal}
              >
                Continuar con la compra
              </button>
            ) : (
              ""
            )}
          </div>
          {/* <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
              <FormCatalog onSubmit={handleFormSubmit} />
            </ModalForm> */}
        </div>
      </div>
    </>
  );
}
