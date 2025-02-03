import requester from "./requester";

const BASE_URL = "http://localhost:3000/api/auth";

export const login = (username: string, password: string): Promise<AuthState> =>
  requester.post(`${BASE_URL}/login`, { username, password });
