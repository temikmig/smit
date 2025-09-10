import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  icon,
  className = "",
  children,
  ...props
}) => {
  let buttonClass = styles.button;

  if (variant) buttonClass += ` ${styles[variant]}`;
  if (size && size !== "medium") buttonClass += ` ${styles[size]}`;
  if (className) buttonClass += ` ${className}`;

  return (
    <button className={buttonClass} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
