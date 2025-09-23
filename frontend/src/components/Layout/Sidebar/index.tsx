import {
  HomeIcon,
  BoxIcon,
  CharIcon,
  PersIcon,
  SettingsIcon,
  CheckListIcon,
} from "../../../assets/icons";
import { SmitLogo } from "../../../assets/logo/SmitLogo";
import { SidebarMenu } from "../../SidebarMenu";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const menuItems = [
    { title: "Дашборд", icon: <HomeIcon />, navTo: "/dashboard" },
    { title: "Склад", icon: <BoxIcon />, navTo: "/storage" },
    { title: "Чеклисты", icon: <CheckListIcon />, navTo: "/checklists" },
    { title: "Отчеты", icon: <CharIcon />, navTo: "/reports" },
    { title: "Сотрудники", icon: <PersIcon />, navTo: "/employees" },
    { title: "Настройки", icon: <SettingsIcon />, navTo: "/settings" },
    {
      title: "Storybook",
      icon: <SettingsIcon />,
      navTo: "/storybook",
    },
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
