import React, { type FC, useRef, useState } from "react";
import clsx from "clsx";
import { Dropdown } from "../Dropdown";
import styles from "./Select.module.css";
import { ArrowDownMinIcon } from "../../../assets/icons";

interface SelectOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  color?: "default" | "blue" | "red";
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Выберите...",
  label,
  error,
  errorMessage,
  helperText,
  disabled,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={styles.container}>
      {label && (
        <p
          className={clsx(
            "text_medium",
            styles.label,
            error && styles.labelError
          )}
        >
          {label}
        </p>
      )}

      <div
        ref={anchorRef}
        className={clsx(
          styles.wrapper,
          error && styles.error,
          disabled && styles.disabled
        )}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span className={clsx(styles.value)}>
          {selectedOption?.label || placeholder}
        </span>

        <ArrowDownMinIcon
          className={clsx(styles.iconRight, open && styles.open)}
        />
      </div>

      <Dropdown
        anchorRef={anchorRef}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        withShadow
        offsetY={8}
      >
        <div className={styles.selectCont}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={clsx(styles.selectItem, {
                [styles.blue]: opt.color === "blue",
                [styles.red]: opt.color === "red",
              })}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      </Dropdown>

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
