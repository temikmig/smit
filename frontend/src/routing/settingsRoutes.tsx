import { Navigate } from "react-router-dom";
import { Settings } from "../pages/Settings";
import { ProfileSettings } from "../pages/ProfileSettings";

export const settingsRoutes = [
  {
    path: "",
    children: [
      { index: true, element: <Settings /> },
      {
        path: "user",
        element: <ProfileSettings />,
        handle: { title: "Настройки профиля" },
      },
      { path: "*", element: <Navigate to="/error/404" replace /> },
    ],
  },
];
