import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginSchema } from "../pages/login/validator";
import { useNavigate } from "react-router-dom";
import { contactHubWs } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface userContextValues {
  login: (data: LoginSchema) => void;
  loading: boolean;
}

export const UserContext = createContext<userContextValues>(
  {} as userContextValues
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@Token:User");

    if (!token) {
      setLoading(false);
      return;
    }

    contactHubWs.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const login = async (data: LoginSchema) => {
    try {
      const response = await contactHubWs.post("/login", data);
      const { token } = response.data;
      contactHubWs.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem("@Token:User", token);
      navigate("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider value={{ login, loading }}>
      {children}
    </UserContext.Provider>
  );
};
