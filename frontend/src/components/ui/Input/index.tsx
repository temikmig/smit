import {
  type InputHTMLAttributes,
  type ReactNode,
  useState,
  useId,
} from "react";
import styles from "./Input.module.css";
import { EyeCrossedIcon, EyeIcon } from "../../../assets/icons";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
}

const Input = ({
  className = "",
  label,
  leftIcon,
  rightIcon,
  type = "text",
  error = false,
  errorMessage,
  helperText,
  disabled,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputId = useId();

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            "text_medium",
            styles.label,
            disabled && styles.labelDisabled,
            error && styles.labelError
          )}
        >
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.wrapper,
          error && styles.error,
          disabled && styles.disabled
        )}
      >
        {leftIcon && (
          <span className={clsx(styles.icon, styles.left)}>{leftIcon}</span>
        )}

        <input
          id={inputId}
          className={styles.input}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          disabled={disabled}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeCrossedIcon /> : <EyeIcon />}
          </button>
        ) : (
          rightIcon && (
            <span className={clsx(styles.icon, styles.right)}>{rightIcon}</span>
          )
        )}
      </div>

      {error && errorMessage ? (
        <p className={clsx("text_small", styles.errorMessage)}>
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className={clsx("text_small", styles.helperText)}>{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
