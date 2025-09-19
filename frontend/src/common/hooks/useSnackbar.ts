import { useContext } from "react";
import { SnackbarContext } from "../contexts/Snackbar/SnackbarContext";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
};
