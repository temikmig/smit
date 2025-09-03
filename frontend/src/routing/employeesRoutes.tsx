import { Navigate } from "react-router-dom";
import { Employees } from "../pages/Employees";

export const employeesRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Employees /> },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
