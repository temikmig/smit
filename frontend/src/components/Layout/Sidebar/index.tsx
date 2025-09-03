import {
  HomeIcon,
  BoxIcon,
  CharIcon,
  PersIcon,
  SettingsIcon,
} from "../../../assets/icons";
import { SmitLogo } from "../../../assets/logo/SmitLogo";
import { SidebarMenu } from "../../SidebarMenu";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const menuItems = [
    { title: "Дашборд", icon: <HomeIcon />, navTo: "/dashboard" },
    { title: "Склад", icon: <BoxIcon />, navTo: "/storage" },
    { title: "Отчеты", icon: <CharIcon />, navTo: "/reports" },
    { title: "Сотрудники", icon: <PersIcon />, navTo: "/employees" },
    { title: "Настройки", icon: <SettingsIcon />, navTo: "/settings" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoCont}>
        <SmitLogo />
      </div>
      <SidebarMenu menuItems={menuItems} />
    </aside>
  );
};
