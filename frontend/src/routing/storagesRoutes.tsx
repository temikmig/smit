import { Navigate } from "react-router-dom";
import { Storages } from "../pages/Storages";
import { StoragePage } from "../pages/StoragePage";

export const storagesRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Storages /> },
      { path: ":id", element: <StoragePage />, handle: { dynamicTitle: true } },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
