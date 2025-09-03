import { Navigate } from "react-router-dom";
import { Settings } from "../pages/Settings";

export const settingsRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Settings /> },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
