export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
