import { Navigate } from "react-router-dom";
import { Storage } from "../pages/Storage";

export const storagesRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Storage /> },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
