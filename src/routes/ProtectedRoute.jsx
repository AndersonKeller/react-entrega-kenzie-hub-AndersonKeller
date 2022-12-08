import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { TechContext } from "../context/TechContext";

export function ProtectedRoute() {
  const { user } = useContext(TechContext);

  return user ? <Outlet /> : <Navigate to={"/login"} />;
}
