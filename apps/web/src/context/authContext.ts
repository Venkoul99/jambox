import { createContext } from "react";

export const AuthContext = createContext<AuthState>({
  id: '',
  username: '',
  accessToken: '',
  isAuthenticated: false,
  changeAuthState: () => { },
  logout: () => { },
});