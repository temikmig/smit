import {
  createBrowserRouter,
  // createHashRouter,
  Navigate,
} from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Dashboard } from "../pages/Dashboard";
import { Layout } from "./layouts/Layout";
import ProtectedRoutes from "../common/ProtectedRoute";
import { storagesRoutes } from "./storagesRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { settingsRoutes } from "./settingsRoutes";
import { employeesRoutes } from "./employeesRoutes";

export const router = createBrowserRouter(
  // export const router = createHashRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          element: <Layout withSuspense />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
              handle: { title: "Дашборд" },
            },
            {
              path: "storages/*",
              element: <ProtectedRoutes type="admin" whithOutlet />,
              children: storagesRoutes,
              handle: { title: "Склады" },
            },
            {
              path: "reports/*",
              element: <ProtectedRoutes type="admin" whithOutlet />,
              children: reportsRoutes,
              handle: { title: "Отчеты" },
            },
            {
              path: "employees/*",
              element: <ProtectedRoutes type="admin" whithOutlet />,
              children: employeesRoutes,
              handle: { title: "Сотрудники" },
            },
            {
              path: "settings/*",
              element: <ProtectedRoutes type="admin" whithOutlet />,
              children: settingsRoutes,
              handle: { title: "Настройки" },
            },
          ],
        },

        { path: "*", element: <Navigate to="/error/404" replace /> },
      ],
    },
  ],
  { basename: "/" }
);
