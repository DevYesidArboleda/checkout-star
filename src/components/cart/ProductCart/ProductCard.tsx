import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SimpleCatalog } from "../../../../interfaces";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleCatalog, removeCatalogItem } from "@/store/catalog/catalogs";
import styles from "./ProductCart.module.css";
import Image from "next/image";
import PopUpComponentCatalogue from "@/components/varationsPopUpCatalogue/PopUpComponentCatalogue";

interface Props {
  catalogs: SimpleCatalog;
}

export default function ProductCard(catalog: Props) {
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [resultData, setResultData] = useState<any>("");

  const addProduct = useAppSelector((state) => Object.values(state.catalogo));

  // Actualizar la cantidad cuando cambia el catálogo
  useEffect(() => {
    setCantidad(catalog.catalogs.quantity || 1);
  }, [catalog.catalogs.id]); 

  useEffect(() => {
    onToggle(catalog.catalogs.id, catalog.catalogs.name, catalog.catalogs.description, cantidad, catalog.catalogs.price, catalog.catalogs.thumbnail, catalog.catalogs.variations, catalog.catalogs.attributes, resultData);
  }, [resultData]); 

  const addCount = () => {
    const newCantidad = cantidad + 1;
    setCantidad(newCantidad);
    onToggle(catalog.catalogs.id, catalog.catalogs.name, catalog.catalogs.description, newCantidad, catalog.catalogs.price, catalog.catalogs.thumbnail, catalog.catalogs.variations, catalog.catalogs.attributes, resultData);
  };

  // Función para restar al valor
  const subtractCount = () => {
    if (cantidad > 1) {
      const newCantidad = cantidad - 1;
      setCantidad(newCantidad);
      onToggle(catalog.catalogs.id, catalog.catalogs.name, catalog.catalogs.description, newCantidad, catalog.catalogs.price, catalog.catalogs.thumbnail, catalog.catalogs.variations, catalog.catalogs.attributes, resultData);
    }
  };

  const onToggle = (
    id: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    thumbnail: string,
    variations: any,
    attributes: any,
    variation_id: string
  ) => {
    const catalog = { id, name, description, quantity, price, thumbnail, variations, attributes, variation_id };
    console.log(catalog);
    dispatch(toggleCatalog(catalog));
  };

  const offToggle = (id: string) => {
    dispatch(removeCatalogItem(id));
  };

  //popUp 

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePopupSubmit = (data: any) => {
    // Recibe el resultado del popup 
    setResultData(data);
    console.log("data d envio",data);
  };

  return (
    <div className={styles.mainProductCart}>
      <div className={styles.productCartColumn}>
        <div className={styles.productCartContainerImage}>
          <div>
            <img
              className={styles.productCartImage}
              src={catalog.catalogs.thumbnail}
              alt={`${catalog.catalogs.name} thumbnail`}
            />
          </div>
          <div className={styles.productCartContainerInfo}>
            <span className="">
              {catalog.catalogs.name}
            </span>
          </div>
          <div className="">
            <span className={styles.productCartPrice}>
              $ {new Intl.NumberFormat().format(catalog.catalogs.price)}
            </span>
          </div>
        </div>
        <div className={styles.productCartModify}>
          {catalog.catalogs.variations?.length === 0 ? (
            <div>
            </div>
          ) : (
            <div className="">
              <button className={styles.productCartModifyButton} onClick={openPopup}>
                Modificar
              </button>
            </div>
          )}
          <div className={styles.containerTrashAdd}>
            <div className={styles.productCartAddRestButton}>
              {/* Botón para sumar */}
              <button onClick={subtractCount}>-</button>
              <span>{cantidad}</span>
              {/* Botón para restar */}
              <button onClick={addCount}>+</button>
            </div>
            <div className={styles.emptyCartContainer} onClick={() =>offToggle(catalog.catalogs.id)}>
                <Image
                    src="/img/trash.svg"
                    alt=""
                    width={16}
                    height={16}
                    className=""
                  />
              </div>
          </div>
        </div>
      </div>
      <PopUpComponentCatalogue isOpen={showPopup} onClose={closePopup} onSubmit={handlePopupSubmit} finalData={catalog.catalogs} />
    </div>
  );
}
