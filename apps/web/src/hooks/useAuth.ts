import { useContext } from "react";
import { login } from "../api/auth-api";
import { AuthContext } from "@/context/authContext";


export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);
  const loginHandler = async (email: string, password: string) => {
    const result = await login(email, password);

    changeAuthState(result);
  };

  return loginHandler;
};