// FormularioPedido.tsx
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "../../../lib/schema";
import { fetchCity, fetchDeparment } from "../utils/funtions";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./FormProductMobile.module.css";
import FormInput from "../inputComponent/formInput";
import { dataApi } from "../../../api";
import ErrorModel from "../Modal/ErrorModal/ErrorModal";
import Image from "next/image";

interface FormularioPedidoProps {
  onSubmit: (data: any) => void;
  dataFinal: any;
}

type Inputs = z.infer<typeof FormDataSchema>;

const FormProductMobile: React.FC<FormularioPedidoProps> = ({
  onSubmit,
  dataFinal,
}) => {
  const [department, setDepartment] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [cityid, setCityid] = useState(0);
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");
  const router = useRouter();
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState<boolean>(false);
  const product_id = searchParams.get("productID");
  const [quantity, setQuantity] = useState(1);
  const [variation, setVaration] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  //Envio de formulario
  const processForm: SubmitHandler<Inputs> = async (data) => {
    const client_quantity = quantity;
    const variation_id = variation;
    const dataClient: any = {
      client_name: data.name,
      client_direction: data.street,
      department_id: data.department,
      city_id: data.city,
      client_surname: data.lastname,
      client_phone: data.phone,
      client_email: data.email,
    };

    const newData = {
      ...dataClient,
      user_id,
      product_id,
      client_quantity,
      variation_id,
    };
    try {
      console.log(dataClient);
      const response = await dataApi.post<any>("/orders/create-order", newData);
      console.log(response);
      console.log("Se creo la orden");
      router.push(`/completePayProduct?userID=${user_id}`);
    } catch (error: any) {
      console.error("Error al enviar los datos:", error);
      console.log(error.response.data.stack.message);
      setError(error.response.data.stack.message);
      handleErrorModal();
    }
  };

  const handleErrorModal = () => {
    setOpenError(true);
  };

  useEffect(() => {
    fetchDeparment().then((e) => {
      setDepartment(e);
      setCityid(e[0]?.dropi_id)
    });
  }, []);

  const handleInputDeparment = (e: any) => {
    let index = e.target.selectedIndex;
    setCityid(e.target.options[index].value);
  };

  useEffect(() => {
    if (cityid !== 0) {
      fetchCity(cityid).then((e: any) => {
        setCity(e);
      });
    }
  }, [cityid]);

  //Variaciones Mobile
  //Prueba variaciones

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
    const attributeIndex = dataFinal.attributes?.findIndex(
      (attribute: any) => attribute.description === currentAttributeName
    );

    if (attributeIndex !== undefined && dataFinal.attributes) {
      dataFinal.attributes
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
    return dataFinal.variations?.find((variation: any) => {
      return Object.entries(newVariations).every(([key, value]) => {
        return variation.values.some(
          (v: any) => v.attribute_name === key && v.id === value
        );
      });
    });
  };

  return (
    <div className={styles.containerPrincipalMobile}>
      <div className={styles.containerRound}>
        <div className={styles.containerTextTotal}>
          <span className={styles.textTotalTitle}>Valor total</span>
          <span className={styles.dataPrice}>
            $ {new Intl.NumberFormat().format(dataFinal.price)}
          </span>
        </div>
        <div className={styles.containerTextTotal}>
          <span className={styles.textTotalTitle}>Cantidad</span>
          <div className={styles.containerQuantity}>
            {quantity === 1 ? (
              <button className={styles.quantityRest}>-</button>
            ) : (
              <button
                className={styles.quantityRestON}
                onClick={() => setQuantity((quantity) => quantity - 1)}
              >
                -
              </button>
            )}
            <span className={styles.quantityResult}>{quantity}</span>
            <button
              className={styles.quantitySum}
              onClick={() => setQuantity((quantity) => quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className={styles.box}>
          <div className="text-black ">
            {dataFinal.attributes?.map((attribute: any, index: number) => (
              <div key={attribute.id} className={styles.containerMainSelect}>
                <label
                  htmlFor={attribute.description}
                  className={styles.containerLabel}
                >{`Seleccionar ${attribute.description}:`}</label>
                <select
                  key={attribute.stock}
                  id={attribute.description}
                  className={styles.containerSelect}
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
                  <option value="" disabled className={styles.containerOption1}>
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
              <div className={styles.popUpError}>
                <p>¡La combinación seleccionada no está disponible!</p>
              </div>
            )}            
          </div>
        </div>
      </div>

      <div className={styles.containerRound}>
        <div className={styles.containerRoundEnter}>
          <h1 className="">Resumen</h1>
        </div>
        <div className={styles.containerResume}>
          <div className={styles.containerResumeCol}>
            <h1 className="">Producto</h1>
            <br />
            <h5 className="">{dataFinal && dataFinal.name}</h5>
          </div>
        </div>
        <div className={styles.containerResumeText}>
          <h1 className="">Método de pago</h1>
          <span className="">Paga al recibir</span>
        </div>
        <div className={styles.containerResumeText}>
          <h1 className="">Envío</h1>
          <span className={styles.freePrice}>GRATIS</span>
        </div>
          {/* Aquí puedes mostrar los resultados obtenidos después de seleccionar las opciones */}
          {Object.entries(selectedVariations).map(([description, value]) => (
            <div className={styles.containerResumeText} key={description}>{<h1>{description}</h1> }{<span>{value}</span>}</div>
          ))}
        <div className={styles.containerResumeText}>
          <h1 className="">Color</h1>
          <span className="">Por definir</span>
        </div>
        <div className={styles.containerResumeText}>
          <h1 className="">Tallas</h1>
          <span className="">{variation}</span>
        </div>
        <div className={styles.containerResumeText}>
          <h1 className={styles.Total}>Total</h1>
          <span className={styles.totalPrice}>
            ${" "}
            {dataFinal &&
              new Intl.NumberFormat().format(dataFinal.price * quantity)}
          </span>
        </div>
      </div>

      <button className={styles.buttonPageTo}>
        <a
          href="#page2" className={styles.scroll_link}
        >
          Continuar con la compra
        </a>
      </button>

      <div id="page2" className={styles.containerFormPrincipal}>
        <form onSubmit={handleSubmit(processForm)}>
          <div className={styles.mainProductForm}>
            <h2 className="">Ingresar Información</h2>

            <div className={styles.containerForm}>
              <FormInput
                id="name"
                type="text"
                register={register}
                placeholder="Nombres"
                error={errors.name?.message}
              />

              <FormInput
                id="lastname"
                type="text"
                register={register}
                placeholder="Apellidos"
                error={errors.lastname?.message}
              />

              <FormInput
                id="phone"
                type="number"
                register={register}
                placeholder="Telefono"
                error={errors.phone?.message}
              />

              <FormInput
                id="email"
                type="email"
                register={register}
                placeholder="Correo Electrónico"
                error={errors.email?.message}
              />

              <FormInput
                id="street"
                type="text"
                register={register}
                placeholder="Dirección"
                error={errors.street?.message}
              />

              <div className="xl:col-span-full sm:col-span-3">
                <div className={styles.select_container}>
                  <select
                    id="department"
                    {...register("department")}
                    autoComplete=""
                    className={styles.bg_Form_input}
                    onChange={handleInputDeparment}
                  >
                    Departamento
                    {department.length > 0 &&
                      department.map((items: any, index: number) => {
                        return (
                          <option key={index} value={items.dropi_id}>
                            {items.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.department?.message && (
                    <span className={styles.alert_input}>
                      {errors.department.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="xl:col-span-full sm:col-span-3">
                <div className={styles.select_container}>
                  <select
                    id="city"
                    {...register("city")}
                    autoComplete=""
                    className={styles.bg_Form_input}
                  >
                    Ciudad
                    {city.length > 0 &&
                      city.slice()
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((items: any, index: number) => {
                        return (
                          <option key={index} value={items.dropi_id}>
                            {items.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.city?.message && (
                    <span className={styles.alert_input}>
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>
              <label className={styles.noteText}>Notas adicionales</label>
              <div className="col-span-full mt-2">
                <div className="mt-5 ">
                  <textarea
                    id="note"
                    placeholder="Notas o información adicional"
                    className={styles.bg_Form_input_notes}
                    autoComplete="street-address"
                    //onChange={handleInputNote}
                  />
                </div>
              </div>
            </div>
            <div className={styles.containerPayButton}>
              <button className={styles.containerbuttomForm} type="submit">
                <div className={styles.buttonPay} data-ripple-light="true">
                  <button className={styles.button}>Finalizar Compra</button>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
      <ErrorModel isOpen={openError} onClose={() => setOpenError(false)}>
        <div className={styles.containerErrorModal}>
          <div className="">
            <Image src="/img/task_alt.svg" alt="" width={32} height={32} />
          </div>
          <span className={styles.textErrorModal}>{error}</span>
        </div>
      </ErrorModel>
    </div>
  );
};

export default FormProductMobile;
