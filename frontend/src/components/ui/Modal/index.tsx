import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Монтируем модалку и запускаем анимацию открытия
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      // Снимаем с DOM после завершения transition
      const timeout = setTimeout(() => setIsMounted(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isMounted) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isVisible ? "scale(1)" : "scale(0.8)",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.25s ease, opacity 0.25s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};
