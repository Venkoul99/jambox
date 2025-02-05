import requester from "./requester";

const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_API_DEV_URL : import.meta.env.VITE_API_PROD_URL;

console.log(import.meta.env.VITE_ENVIRONMENT)

const BASE_URL = `${SERVER_URL}/api/auth`;

export const login = (username: string, password: string): Promise<AuthState> =>
  requester.post(`${BASE_URL}/login`, { username, password });
