import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { ProtectRoutes } from "./protectRoute";
import { Dashboard } from "../pages/dashboard";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
