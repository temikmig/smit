import { Navigate } from "react-router-dom";
import { Reports } from "../pages/Reports";

export const reportsRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Reports /> },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
