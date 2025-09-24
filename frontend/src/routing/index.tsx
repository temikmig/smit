import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Dashboard } from "../pages/Dashboard";
import { Layout } from "./layouts/Layout";
import ProtectedRoutes from "../common/ProtectedRoute";
import { storagesRoutes } from "./storagesRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { settingsRoutes } from "./settingsRoutes";
import { employeesRoutes } from "./employeesRoutes";
import { Login } from "../pages/Login";
import GuestRoutes from "../common/GuestRoute";
import { ErrorCont, ErrorPage } from "../pages/ErrorPage";
import { Logout } from "../pages/Logout";
import { Storybook } from "../pages/Storybook";
import { checklistsRoutes } from "./checklistsRoutes";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorCont />,
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
              element: <ProtectedRoutes type="user" withOutlet />,
              children: [{ index: true, element: <Dashboard /> }],
              handle: { title: "Дашборд" },
            },
            {
              path: "storage",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: storagesRoutes,
              handle: { title: "Склад" },
            },
            {
              path: "checklists",
              element: <ProtectedRoutes type="user" withOutlet />,
              children: checklistsRoutes,
              handle: { title: "Чеклисты" },
            },
            {
              path: "reports/*",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: reportsRoutes,
              handle: { title: "Отчеты" },
            },
            {
              path: "employees/*",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: employeesRoutes,
              handle: { title: "Сотрудники" },
            },
            {
              path: "settings/*",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: settingsRoutes,
              handle: { title: "Настройки" },
            },
            {
              path: "storybook",
              element: <ProtectedRoutes type="admin" withOutlet />,
              children: [{ index: true, element: <Storybook /> }],
              handle: { title: "Storybook" },
            },
          ],
        },

        {
          path: "login",
          element: <GuestRoutes withOutlet />,
          children: [{ index: true, element: <Login /> }],
        },

        {
          path: "logout",
          element: <ProtectedRoutes type="user" withOutlet />,
          children: [{ index: true, element: <Logout /> }],
        },

        {
          path: "error/:code",
          element: <ErrorPage />,
        },

        { path: "*", element: <Navigate to="/error/404" replace /> },
      ],
    },
  ],
  { basename: "/" }
);
