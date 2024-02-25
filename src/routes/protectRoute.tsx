import { Outlet } from "react-router-dom";
import { authUser } from "../hooks/user";

export const ProtectRoutes = () => {
  const { loading } = authUser();
  if (loading) {
    return <div>Carregando...</div>;
  }
  return <Outlet />;
};
