import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginSchema } from "../pages/login/validator";
import { useNavigate } from "react-router-dom";
import { contactHubWs } from "../services/api";
import { RegisterSchema } from "../pages/register/validator";
import { toast } from "react-toastify";

interface UserProviderProps {
  children: ReactNode;
}

interface userContextValues {
  login: (data: LoginSchema) => void;
  registerUser: (data: RegisterSchema) => void;
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
      toast.success("Usuário logado com sucesso!");
      navigate("dashboard");
    } catch (error) {
      toast.error("Insira corretamente os dados para prosseguir");
    }
  };
  const registerUser = async (data: RegisterSchema) => {
    try {
      setLoading(true);
      await contactHubWs.post("/users", data);
      toast.success("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error("Por favor, insira os dados corretamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ login, loading, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
