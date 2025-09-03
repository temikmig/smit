import { useEffect, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../../components/ui/Loader";

const LoadingScreen = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader fullscreen text />;

  return <>{children}</>;
};

export const RootLayout = () => (
  <>
    <LoadingScreen>
      <Outlet />
    </LoadingScreen>
  </>
);
