// FormularioPedido.tsx
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "../../../lib/schema";
import { fetchCity, fetchDeparment } from "../utils/funtions";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./FormProduct.module.css";
import FormInput from "../inputComponent/formInput";
import { dataApi } from "../../../api";
import ErrorModel from "../Modal/ErrorModal/ErrorModal";
import Image from 'next/image'

interface FormularioPedidoProps {
  onSubmit: (data: any) => void;
  dataFinal:any;
}

type Inputs = z.infer<typeof FormDataSchema>;

const FormProduct: React.FC<FormularioPedidoProps> = ({ onSubmit, dataFinal  }) => {
  const [department, setDepartment] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [cityid, setCityid] = useState(0);
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");
  const router = useRouter();
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState<boolean>(false);
  const product_id = searchParams.get("productID");

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
    const client_quantity = dataFinal.quantity;
    const variation_id = dataFinal.resultData;
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

 

  return (
    <div className="">
      {/* ... (resto del código del formulario) ... */}
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
      <ErrorModel isOpen={openError} onClose={() => setOpenError(false)}>
      <div className={styles.containerErrorModal}>
          <div className="">
            <Image src="/img/task_alt.svg" alt="" width={32} height={32} />
          </div>
          <span className={styles.textErrorModal}>
            {error}
          </span>
        </div>
          </ErrorModel>
    </div>
  );
};

export default FormProduct;
