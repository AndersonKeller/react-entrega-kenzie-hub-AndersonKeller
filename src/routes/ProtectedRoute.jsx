import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { TechContext } from "../context/TechContext";
import { UserContext } from "../context/UserContext";

export function ProtectedRoute() {
  const { user, token } = useContext(UserContext);
  const { loading } = useContext(UserContext);
  console.log(token);
  if (loading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to={"/login"} />;
}
