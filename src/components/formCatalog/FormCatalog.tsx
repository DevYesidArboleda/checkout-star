// FormularioPedido.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "../../../lib/schema";
import { fetchCity, fetchDeparment } from "../utils/funtions";
import { useRouter, useSearchParams } from "next/navigation";
import animationData3 from "../../../public/animations/animationBuyNow.json";
import styles  from "./FormCatalogue.module.css";

interface FormularioPedidoProps {
  onSubmit: (data: any) => void;
}

type Inputs = z.infer<typeof FormDataSchema>;

const FormCatalog: React.FC<FormularioPedidoProps> = ({ onSubmit }) => {

    const [department, setDepartment] = useState<any>([]);
    const [city, setCity] = useState<any>([]);
    const [cityid, setCityid] = useState(0);
    const searchParams = useSearchParams();
    const user_id = searchParams.get("userID");
    const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm = async (data: any) => {
    // Tu lógica de procesamiento del formulario aquí
    router.push(`/completePayCatalog?userID=${user_id}`);
    onSubmit(data);
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="">
      {/* ... (resto del código del formulario) ... */}
      <form onSubmit={handleSubmit(processForm)}>
        {/* ... (resto de tus campos de entrada) ... */}
        <div className={styles.mainCatalogueForm}>
          <h2 className="">
          Ingresar Información
          </h2>

          <div className={styles.containerForm}>
            <div className={styles.formINPUT}>
              <div className="mt-0">
                <input
                  type="text"
                  id="name"
                  {...register("name", { pattern: /^[A-Za-z]+$/i })}
                  placeholder="Nombres"
                  className={styles.bg_Form_input}
                />
                {errors.name?.message && (
                  <p className={styles.alert_input}>
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-5">
                <input
                  type="text"
                  id="lastname"
                  {...register("lastname")}
                  placeholder="Apellidos"
                  className={styles.bg_Form_input}
                />
                {errors.lastname?.message && (
                  <p className={styles.alert_input}>
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-5">
                <input
                  type="number"
                  id="phone"
                  {...register("phone")}
                  placeholder="Telefono"
                  className={styles.bg_Form_input}
                />
                {errors.phone?.message && (
                  <span className={styles.alert_input}>
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-5">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Correo Electrónico"
                  className={styles.bg_Form_input}
                />
                {errors.email?.message && (
                  <span className={styles.alert_input}>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-5">
                <input
                  type="text"
                  id="street"
                  {...register("street")}
                  autoComplete="street-address"
                  placeholder="Dirección"
                  className={styles.bg_Form_input}
                />
                {errors.street?.message && (
                  <p className={styles.alert_input}>
                    {errors.street.message}
                  </p>
                )}
              </div>
            </div>

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
                {(errors.city?.message ) && (
                  <span className="mt-3 text-sm text-red-400">
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
            <button
              className={styles.containerbuttomForm}
              type="submit"
            >
              <div className={styles.buttonPay} data-ripple-light="true"
                        >
                        <button className={styles.button}>Finalizar Compra</button>
                      </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCatalog;
