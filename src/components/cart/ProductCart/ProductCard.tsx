import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SimpleCatalog } from "../../../../interfaces";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleCatalog } from "@/store/catalog/catalogs";
import styles from "./ProductCart.module.css";

interface Props {
  catalogs: SimpleCatalog;
}

export default function ProductCard(catalog: Props) {
  const [cantidad, setCantidad] = useState(0);
  const dispatch = useAppDispatch();

  // Actualizar la cantidad cuando cambia el catálogo
  useEffect(() => {
    setCantidad(catalog.catalogs.quantity || 1);
  }, [catalog.catalogs.id]); 

  const addCount = () => {
    const newCantidad = cantidad + 1;
    setCantidad(newCantidad);
    onToggle(catalog.catalogs.id, catalog.catalogs.name, catalog.catalogs.description, newCantidad, catalog.catalogs.price, catalog.catalogs.thumbnail, catalog.catalogs.variations);
  };

  // Función para restar al valor
  const subtractCount = () => {
    if (cantidad > 1) {
      const newCantidad = cantidad - 1;
      setCantidad(newCantidad);
      onToggle(catalog.catalogs.id, catalog.catalogs.name, catalog.catalogs.description, newCantidad, catalog.catalogs.price, catalog.catalogs.thumbnail, catalog.catalogs.variations);
    }
  };

  const onToggle = (
    id: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    thumbnail: string,
    variations: any
  ) => {
    const catalog = { id, name, description, quantity, price, thumbnail, variations };
    console.log(catalog);
    dispatch(toggleCatalog(catalog));
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
          {catalog.catalogs.variations.length === 0 ? (
            <div>
            </div>
          ) : (
            <div className="">
              <button className={styles.productCartModifyButton}>
                Modificar
              </button>
            </div>
          )}
          <div>
            <div className={styles.productCartAddRestButton}>
              {/* Botón para sumar */}
              <button onClick={subtractCount}>-</button>
              <span>{cantidad}</span>
              {/* Botón para restar */}
              <button onClick={addCount}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
