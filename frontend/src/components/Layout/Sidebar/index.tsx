import { SidebarMenu } from "../../SidebarMenu";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const menuItems = [
    { title: "Дашборд" },
    { title: "Склад" },
    { title: "Отчеты" },
    { title: "Сотрудники" },
    { title: "Настройки" },
  ];

  return (
    <aside className={styles.sidebar}>
      <SidebarMenu menuItems={menuItems} />
    </aside>
  );
};
