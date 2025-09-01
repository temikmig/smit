import { useEffect, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";

const LoadingScreen = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div>Загрузка</div>;

  return <>{children}</>;
};

export const RootLayout = () => (
  <>
    <LoadingScreen>
      <Outlet />
    </LoadingScreen>
  </>
);
