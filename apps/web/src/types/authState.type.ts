interface AuthState {
  id: string;
  username: string;
  accessToken?: string;
  isAuthenticated?: boolean
  changeAuthState: (newState: Partial<AuthState>) => void;
  logout: () => void;
}