import { Outlet } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { Sidebar } from "../../../components/Layout/Sidebar";

interface LayoutProps {
  withSuspense?: boolean;
}

export const Layout = ({ withSuspense = false }: LayoutProps) => {
  console.log(withSuspense);

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
