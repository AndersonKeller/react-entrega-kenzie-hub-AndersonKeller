import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

export function ProtectedRoute() {
  //const { user } = useContext(UserContext);

  return <Outlet />;
}
