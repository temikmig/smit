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
    { title: "Дашборд", icon: <HomeIcon /> },
    { title: "Склад", icon: <BoxIcon /> },
    { title: "Отчеты", icon: <CharIcon /> },
    { title: "Сотрудники", icon: <PersIcon /> },
    { title: "Настройки", icon: <SettingsIcon /> },
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
