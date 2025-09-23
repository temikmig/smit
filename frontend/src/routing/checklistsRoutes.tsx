import { Navigate } from "react-router-dom";
import { CheckLists } from "../pages/CheckLists";

export const checklistsRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <CheckLists /> },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
