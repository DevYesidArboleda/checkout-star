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
import FormProduct from "@/components/FormProduct/FormProduct";

export default function OnlyProductGrid({ catalog }: any) {
  const [finalData, setFinalData] = useState<any>([]);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const final: any = catalog.data;
      final.forEach((element: any) => {
        setFinalData(element);
      });
    };

    setProduct({...finalData,quantity})
    fetchData();
  }, [catalog]);

  useEffect(() => {
    setProduct({...finalData,quantity})
  }, [quantity]);

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

  const handleFormSubmit = (finalData: any) => {
    // Lógica de manejo de datos del formulario
    console.log("Datos del formulario:", finalData);
  };


  //Prueba variaciones
  const [variation, setVaration] = useState("");
  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: string;
  }>({});
  const [existingVariationId, setExistingVariationId] = useState<string | null>(
    null
  );
  const [combinationUnavailable, setCombinationUnavailable] =
    useState<boolean>(false);

  const handleVariationChange = (
    attributeName: string,
    valueId: string,
    variationId: string
  ) => {
    const newVariations = { ...selectedVariations, [attributeName]: valueId };

    // Verificar si ambos selectores están diligenciados
    if (Object.values(newVariations).every((value) => !!value)) {
      const existingVariation = findExistingVariation(newVariations);

      if (existingVariation) {
        setExistingVariationId(existingVariation.id);
        setCombinationUnavailable(false); // La combinación está disponible
      } else {
        setExistingVariationId(null);
        setCombinationUnavailable(true); // La combinación no está disponible
      }
    } else {
      // Si alguno de los selectores no está diligenciado, reiniciar la verificación, el mensaje y bloquear los selectores siguientes
      setExistingVariationId(null);
      setCombinationUnavailable(false);
      resetNextSelectors(attributeName);
    }

    setSelectedVariations(newVariations);
  };

  const resetNextSelectors = (currentAttributeName: string) => {
    // Reiniciar los valores de los selectores siguientes al actual
    const attributeIndex = finalData.attributes?.findIndex(
      (attribute: any) => attribute.description === currentAttributeName
    );

    if (attributeIndex !== undefined && finalData.attributes) {
        finalData.attributes.slice(attributeIndex + 1).forEach((attribute: any) => {
        setSelectedVariations((prevVariations) => ({
          ...prevVariations,
          [attribute.description]: "",
        }));
      });
    }
  };

  const findExistingVariation = (newVariations: { [key: string]: string }) => {
    return finalData.variations?.find((variation: any) => {
      return Object.entries(newVariations).every(([key, value]) => {
        return variation.values.some(
          (v: any) => v.attribute_name === key && v.id === value
        );
      });
    });
  };

  console.log("na", existingVariationId);
  console.log("naa", variation);

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
                <div className="flex flex-col">
                          <div className="text-black ">
                            {finalData.attributes?.map(
                              (attribute: any, index: number) => (
                                <div
                                  key={attribute.id}
                                  className="flex flex-col"
                                >
                                  <label
                                    htmlFor={attribute.description}
                                    className="mb-3 font-light text-base text-[#53545C]"
                                  >{`Seleccionar ${attribute.description}:`}</label>
                                  <select
                                    key={attribute.stock}
                                    id={attribute.description}
                                    className="rounded-medium bg-default-100  p-4 text-star appearance-none  transition duration-500 transform border-none focus:outline-none text-foreground-500 text-ellipsis text-sm font-light"
                                    onChange={(e) =>
                                      handleVariationChange(
                                        attribute.description,
                                        e.target.value,
                                        e.target.selectedOptions[0]?.getAttribute(
                                          "data-value-id"
                                        ) || ""
                                      )
                                    }
                                    onClick={() => setVaration(attribute.id)}
                                    value={
                                      selectedVariations[
                                        attribute.description
                                      ] || ""
                                    }
                                  >
                                    <option
                                      value=""
                                      disabled
                                      className="text-foreground-500 text-ellipsis text-sm font-light"
                                    >
                                      Seleccionar ...
                                    </option>
                                    {attribute.values.map((value: any) => (
                                      <option
                                        key={value.id}
                                        value={value.id}
                                        data-value-id={value.id}
                                        className="text-foreground-500 text-ellipsis text-small"
                                      >
                                        {value.value}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )
                            )}

                            {combinationUnavailable && (
                              <div className="text-red-500 pt-2">
                                <p>
                                  ¡La combinación seleccionada no está
                                  disponible!
                                </p>
                              </div>
                            )}

                            {/*existingVariationId && !combinationUnavailable && (
                      <div>
                        <h2>ID de la Variación Existente:</h2>
                        <p>{existingVariationId}</p>
                      </div>
                    )*/}

                            {/* <div>
                      <h2>Variaciones Seleccionadas:</h2>
                      <pre>{JSON.stringify(selectedVariations, null, 2)}</pre>
                    </div> */}
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
        <FormProduct onSubmit={handleFormSubmit} dataFinal={product}/>
      </ModalForm>
    </>
  );
}
