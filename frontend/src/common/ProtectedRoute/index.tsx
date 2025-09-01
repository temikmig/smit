import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  children?: JSX.Element;
  whithOutlet?: boolean;
  type: "admin" | "user";
}

export default function ProtectedRoutes({
  children,
  whithOutlet = false,
  type,
}: ProtectedRoutesProps) {
  const isAuth = true;

  const isAdmin = true;

  if (type === "admin") {
    if (!isAdmin && children) return <Navigate to="/error/403" replace />;
  }

  if (type === "user") {
    if (!isAuth && children) return <Navigate to="/error/403" replace />;
  }

  return whithOutlet ? <Outlet /> : children;
}
