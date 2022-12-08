import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

export function ProtectedRoute() {
  const { user } = useContext(UserContext);
  const { loading } = useContext(UserContext);

  if (loading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to={"/login"} />;
}
