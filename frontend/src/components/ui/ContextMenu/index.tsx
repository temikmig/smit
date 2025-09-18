import clsx from "clsx";
import React, { type RefObject } from "react";
import styles from "./ContextMenu.module.css";
import { Dropdown } from "../Dropdown";

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
  return (
    <Dropdown
      anchorRef={anchorRef}
      open={open}
      onClose={onClose}
      offsetX={offsetX}
      offsetY={offsetY}
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
    </Dropdown>
  );
};
