import { Outlet } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { Sidebar } from "../../../components/Layout/Sidebar";
import styles from "./Layout.module.css";

interface LayoutProps {
  withSuspense?: boolean;
}

export const Layout = ({ withSuspense = false }: LayoutProps) => {
  console.log(withSuspense);

  return (
    <>
      <Header />
      <Sidebar />
      <main className={styles.box}>
        <Outlet />
      </main>
    </>
  );
};
