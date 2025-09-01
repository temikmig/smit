import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SidebarMenuItem.module.css";
import clsx from "clsx";

interface SidebarMenuItemProps {
  title: string;
  icon?: ReactNode;
  navTo?: string;
  onClick?: () => void;
}

export const SidebarMenuItem = ({
  title,
  icon,
  navTo,
  onClick,
}: SidebarMenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navTo && !onClick) navigate(navTo);
    if (onClick && !navTo) onClick();
    return;
  };

  return (
    <li
      className={clsx(styles.sidebarMenuItem, "text_medium")}
      onClick={handleClick}
    >
      {icon}
      {title}
    </li>
  );
};
