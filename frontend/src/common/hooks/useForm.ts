import React, { useEffect, useState } from "react";
import * as yup from "yup";

type FormErrors<T> = Partial<Record<keyof T, string>>;
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

export function useForm<Schema extends yup.AnyObjectSchema>(
  inputValue: yup.InferType<Schema>,
  validationSchema?: Schema
) {
  type T = yup.InferType<Schema>;

  const [values, setValues] = React.useState<T>(inputValue);
  const [fieldErrors, setFieldErrors] = useState<FormErrors<T>>({});
  const [touchedFields, setTouchedFields] = useState<FormTouched<T>>({});

  const [isValid, setIsValid] = useState(!validationSchema);

  useEffect(() => {
    if (!validationSchema) {
      setIsValid(true);
      return undefined;
    }

    const validate = async () => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        setFieldErrors((prev) => (Object.keys(prev).length > 0 ? {} : prev));
        setIsValid((prev) => (prev === false ? true : prev));
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const newErrors = err.inner.reduce(
            (acc, error) =>
              error.path ? { ...acc, [error.path]: error.message } : acc,
            {} as FormErrors<T>
          );

          setFieldErrors((prev) => {
            const prevJson = JSON.stringify(prev);
            const newJson = JSON.stringify(newErrors);
            return prevJson === newJson ? prev : newErrors;
          });

          setIsValid(false);
        }
      }
    };

    let timer: NodeJS.Timeout | null = null;
    timer = setTimeout(validate, 150);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [values, validationSchema]);

  const handleBlur = async (e: BlurEvent) => {
    const name =
      (e.target as HTMLInputElement).name ||
      (e.currentTarget as HTMLElement)?.getAttribute?.("name") ||
      "";

    if (!name) return;

    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = async (e: ChangeEvent) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (name !== "password") sessionStorage.setItem(name, String(value));

    if (validationSchema) {
      try {
        await validationSchema.validateAt(name, values);
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          setFieldErrors((prev) => ({ ...prev, [name]: err.message }));
        }
      }
    }
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
    isValid,
    resetForm,
  };
}
