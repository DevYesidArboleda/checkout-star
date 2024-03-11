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
      //client_notes,
      variation_id,
    };
    try {
      console.log(dataClient);
      const response = await dataApi.post<any>("/orders/create-order", newData);
      console.log(response);
      console.log("Se creo la orden");
      router.push(`/completePayCatalogue?userID=${user_id}`);
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
      <div className="w-full px-12 pt-10 pb-9 bg-white border border-gray-200 rounded-lg">
        <div className="flex flex-col pb-3 w-full border-b-1 border-[#D9D9D9] mb-3">
          <span className="mb-3 font-light text-base text-[#53545C]">
            Valor total
          </span>
          <span className="mb-3 font-semibold text-black text-base">
            $ {dataFinal.price}
          </span>
        </div>
        <div className="flex flex-col pb-3 w-full border-b-1 border-[#D9D9D9] mb-3">
          <span className="mb-3 font-light text-base text-[#53545C]">
            Cantidad
          </span>
          <div className="flex gap-4">
            {quantity === 1 ? (
              <button className="text-[#53545C] w-3">-</button>
            ) : (
              <button
                className="text-[#53545C]"
                onClick={() => setQuantity((quantity) => quantity - 1)}
              >
                -
              </button>
            )}
            <span className="text-black">{quantity}</span>
            <button
              className="text-[#42E184]"
              onClick={() => setQuantity((quantity) => quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-black ">
            {dataFinal.attributes?.map((attribute: any, index: number) => (
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

      <div className="flex flex-col px-12 w-full bg-white border border-gray-200 rounded-lg">
        <div className="border-b-1 lg:border-[#D9D9D9] border-transparent w-full">
          <h1 className="text-black font-bold text-base items-center flex justify-center py-6">
            Resumen
          </h1>
        </div>
        <div className="border-b-1 border-[#D9D9D9] w-full">
          <div className="flex justify-between">
            <h1 className="my-4 text-xs text-[#53545C]  font-bold ">
              Producto
            </h1>
            <br />
            <h5 className="my-4 font-light text-[#53545C] text-xs">
              {dataFinal && dataFinal.name}
            </h5>
          </div>
        </div>
        <div className="border-b-1 border-[#D9D9D9] w-full justify-between flex">
          <span className="my-4 font-bold text-[#53545C] text-xs">
            Método de pago
          </span>
          <span className="my-4 font-light text-[#53545C] text-xs">
            Paga al recibir
          </span>
        </div>
        <div className="border-b-1 border-[#D9D9D9] w-full justify-between flex">
          <span className="my-4 font-bold text-xs text-[#53545C] ">Envío</span>
          <span className="my-4 font-bold 2xl:text-xl text-xs text-[#42E184] ">
            GRATIS
          </span>
        </div>
        <div className="border-b-1 border-[#D9D9D9] w-full flex justify-between">
          <span className="my-4 font-bold text-xs text-[#53545C]">Color</span>
          <span className="my-4 text-xs font-light tracking-tight text-[#53545C]">
            Por definir
          </span>
        </div>
        <div className="border-b-1 border-[#D9D9D9] w-full flex justify-between">
          <h1 className="my-4 font-bold text-xs text-[#53545C]">Tallas</h1>
          <span className="my-4 text-xs font-light tracking-tight text-[#53545C]">
            {variation}
          </span>
        </div>
        <div className="w-full flex justify-between pb-6">
          <h1 className="my-4 font-bold text-base text-[#42E184]">Total</h1>
          <span className="my-4 text-xs font-light tracking-tight text-[#53545C]">
            {dataFinal && dataFinal.price*quantity}
          </span>
        </div>
      </div>

      {/* ... (resto del código del formulario) ... */}
      <div className={styles.containerFormPrincipal}>
        <form onSubmit={handleSubmit(processForm)}>
          {/* ... (resto de tus campos de entrada) ... */}
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
                      city.map((items: any, index: number) => {
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
        <div className="gap-2">
          <div className="flex justify-center w-full gap-2">
            <Image src="/img/task_alt.svg" alt="" width={32} height={32} />
          </div>
          <span className="flex justify-center text-sm text-justify text-black p-4">
            {error}
          </span>
        </div>
      </ErrorModel>
    </div>
  );
};

export default FormProductMobile;
