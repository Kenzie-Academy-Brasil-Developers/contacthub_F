import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { ProtectRoutes } from "./protectRoute";
import { Dashboard } from "../pages/dashboard";
import { Register } from "../pages/register";
import { Report } from "../pages/report";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
      </Route>
    </Routes>
  );
};
