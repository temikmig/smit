import clsx from "clsx";
import React, { useState, useRef, useEffect, type RefObject } from "react";
import styles from "./ContextMenu.module.css";

export interface ContextMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  color: "default" | "blue" | "red";
  onClick: () => void;
}

interface ContextMenuProps {
  anchorRef: RefObject<HTMLElement | null>;
  items: ContextMenuItem[];
  open: boolean;
  onClose: () => void;
  offsetX?: number;
  offsetY?: number;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorRef,
  items,
  open,
  onClose,
  offsetX = 0,
  offsetY = 8,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      cancelAnimationFrame(animationRef.current!);
      requestAnimationFrame(() => {
        if (menuRef.current) {
          menuRef.current.style.transition =
            "opacity 0.3s ease, transform 0.3s ease";
          menuRef.current.style.opacity = "1";
          menuRef.current.style.transform = "translateY(0)";
        }
      });
    } else if (isMounted) {
      if (menuRef.current) {
        menuRef.current.style.opacity = "0";
        menuRef.current.style.transform = "translateY(-10px)";
      }
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(() => setIsMounted(false), 150);
      });
    }
    return () => cancelAnimationFrame(animationRef.current!);
  }, [open, isMounted]);

  const updatePosition = () => {
    if (!menuRef.current || !anchorRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    let top = anchorRect.bottom + offsetY;
    let left = anchorRect.left + offsetX;

    if (anchorRect.bottom + menuRect.height > window.innerHeight) {
      top = anchorRect.top - menuRect.height - offsetY;
    }

    if (anchorRect.left + menuRect.width > window.innerWidth) {
      left = window.innerWidth - menuRect.width - 10;
    }

    if (left < 10) left = 10;
    if (top < 10) top = 10;

    menuRef.current.style.top = `${top}px`;
    menuRef.current.style.left = `${left}px`;
  };

  useEffect(() => {
    if (!isMounted) return;
    updatePosition();

    const handleUpdate = () => {
      if (isMounted) updatePosition();
    };

    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);
    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [isMounted, anchorRef]);

  // Закрытие при клике вне
  useEffect(() => {
    if (!isMounted) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted, onClose, anchorRef]);

  if (!isMounted) return null;

  return (
    <div
      ref={menuRef}
      className={clsx(styles.menu)}
      style={{
        position: "fixed",
        zIndex: 1000,
        opacity: 0,
        transform: "translateY(-10px)",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={clsx(styles.item, {
            [styles.blue]: item.color === "blue",
            [styles.red]: item.color === "red",
          })}
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
