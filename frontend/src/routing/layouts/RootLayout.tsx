import { useEffect, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../../components/ui/Loader";
import { ModalProvider } from "../../common/contexts/Modal/ModalProvider";
import { SnackbarProvider } from "../../common/contexts/Snackbar/SnackbarProvider";

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
      <ModalProvider>
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
      </ModalProvider>
    </LoadingScreen>
  </>
);
