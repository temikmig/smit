import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Dashboard } from "../pages/Dashboard";
import { Layout } from "./layouts/Layout";
// import ProtectedRoutes from "../common/ProtectedRoutes";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      // errorElement: <ErrorPage linkToHome={false} />,
      children: [
        { index: true, element: <Navigate to="/dashboard" replace /> },
        {
          element: <Layout withSuspense />,
          children: [{ path: "dashboard", element: <Dashboard /> }],
        },
        // ...errorsRoutes,
        // {
        //   path: "storage/*",
        //   element: <ProtectedRoutes type='admin' whithOutlet />,
        //   children: storageRoutes,
        // },
        // {
        //   path: "profile/*",
        //   element: <ProtectedRoutes type='admin' whithOutlet />,
        //   children: profileRoutes,
        // },
        // {
        //   path: "admin/*",
        //   element: <ProtectedRoutes type='admin' whithOutlet />,
        //   children: adminRoutes,
        // },
        { path: "*", element: <Navigate to="/error/404" replace /> },
        // { path: "logout", element: <Logout /> },
      ],
    },
  ],
  { basename: "/" }
);
