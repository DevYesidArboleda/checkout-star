import React from "react";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";
import styles from "../formCatalog/FormCatalogue.module.css";

interface FormInputProps {
  id: string;  
  type: string;
  register: UseFormRegister<z.infer<any>>;
  placeholder: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, type, register, placeholder, error }) => {
  return (
    <div className={styles.formINPUT}>
      <div className="mt-0">
        <input
          type={type}
          id={id}
          {...register(id)}
          placeholder={placeholder}
          className={styles.bg_Form_input}
        />
        {error && <p className={styles.alert_input}>{error}</p>}
      </div>
    </div>
  );
};

export default FormInput;
