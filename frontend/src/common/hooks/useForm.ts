import React, { useState } from "react";

type FormErrors<T> = {
  [K in keyof T]?: string | Record<string, string>;
};
type FormTouched<T> = Partial<Record<keyof T, boolean>>;

export type FormFProps<T> = {
  values?: T;
  setValues?: React.Dispatch<React.SetStateAction<T>>;
  setFieldValue?: (name: string, value: unknown) => void;
  handleChanges?: (e: ChangeEvent) => void;
  handleBlur?: (e: BlurEvent) => void;
  fieldErrors?: FormErrors<T>;
  setFieldErrors?: React.Dispatch<React.SetStateAction<FormErrors<T>>>;
  touchedFields?: FormTouched<T>;
  isValid?: boolean;
  resetForm?: () => void;
  onSubmit?: (...args: unknown[]) => void;
};

export type FormProps<T> = {
  form: FormFProps<T>;
};

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type BlurEvent = React.FocusEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLDivElement
>;

export const useForm = <T extends Record<string, unknown>>(inputValue: T) => {
  const [values, setValues] = React.useState<T>(inputValue);
  const [fieldErrors, setFieldErrors] = useState<FormErrors<T>>({});
  const [touchedFields, setTouchedFields] = useState<FormTouched<T>>({});

  const handleBlur = async (e: BlurEvent) => {
    const name =
      (e.target as HTMLInputElement).name ||
      (e.currentTarget as HTMLElement)?.getAttribute?.("name") ||
      "";

    if (!name) return;

    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (name !== "password") sessionStorage.setItem(name, String(value));
  };

  const resetForm = () => {
    setValues(inputValue);
    setFieldErrors({});
    setTouchedFields({});

    Object.keys(inputValue).forEach((key) => sessionStorage.removeItem(key));
  };

  const setFieldValue = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    setValues,
    setFieldValue,
    handleChange,
    handleBlur,
    fieldErrors,
    setFieldErrors,
    touchedFields,
    resetForm,
  };
};
