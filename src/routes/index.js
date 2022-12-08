import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
export function RouterMain() {
  return (
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
      </Route>
      <Route path="/*" element={<Navigate to={"/login"} />}></Route>
    </Routes>
  );
}
