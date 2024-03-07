// FormularioPedido.tsx
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "../../../lib/schema";
import { fetchCity, fetchDeparment } from "../utils/funtions";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./PopUp.module.css";
import FormInput from "../inputComponent/formInput";
import { dataApi } from "../../../api";
import ErrorModel from "../Modal/ErrorModal/ErrorModal";
import Image from "next/image";

type PopupComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  finalData: any;
};

const PopUpComponent: React.FC<PopupComponentProps> = ({
  isOpen,
  onClose,
  onSubmit,
  finalData,
}) => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {    
    onSubmit(variation);
    onClose(); // Cierra el popup después de procesar la información
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
      finalData.attributes
        .slice(attributeIndex + 1)
        .forEach((attribute: any) => {
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
    <div className="">
      {/* ... (resto del código del formulario) ... */}

      {/* ... (resto de tus campos de entrada) ... */}
      <div className={` ${styles.modal} ${isOpen ? styles.is_active : ''}`}>
        <div className={styles.modal_background} onClick={onClose}></div>
        <div className={styles.modal_content}>
          <div className={styles.box}>
            <div className="text-black ">
              {finalData.attributes?.map((attribute: any, index: number) => (
                <div key={attribute.id} className="flex flex-col">
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
                    value={selectedVariations[attribute.description] || ""}
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
              ))}

              {combinationUnavailable && (
                <div className="text-red-500 pt-2">
                  <p>¡La combinación seleccionada no está disponible!</p>
                </div>
              )}              
            </div>
          </div>
          {combinationUnavailable == false && variation !== "" &&  <button onClick={handleSubmit}>Enviar</button>}
        </div>       
      </div>
    </div>
  );
};

export default PopUpComponent;