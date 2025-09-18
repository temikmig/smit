import { type InputHTMLAttributes, useId } from "react";
import styles from "./Checkbox.module.css";
import { CheckIcon } from "../../../assets/icons";
import clsx from "clsx";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Checkbox = ({
  label,
  error,
  errorMessage,
  disabled,
  ...props
}: CheckboxProps) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <label
        htmlFor={id}
        className={clsx(styles.wrapper, disabled && styles.disabled)}
      >
        <input
          id={id}
          type="checkbox"
          className={styles.input}
          disabled={disabled}
          {...props}
        />
        <span className={clsx(styles.box, error && styles.error)}>
          <CheckIcon className={styles.icon} />
        </span>
        {label && (
          <span className={clsx("text_medium", styles.label)}>{label}</span>
        )}
      </label>

      {error && errorMessage && (
        <p className={clsx("text_small", styles.errorMessage)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
