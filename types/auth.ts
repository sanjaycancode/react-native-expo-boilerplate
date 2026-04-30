export interface AuthenticatedUser {
  id: string | number;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// API Response types
export interface ApiUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ApiAuthResponse {
  success: boolean;
  data: {
    user: ApiUser;
    token: string;
  };
}

export interface AuthResponse {
  user: AuthenticatedUser;
  accessToken?: string;
}

export interface AuthSession {
  user: AuthenticatedUser;
  accessToken?: string;
}

export interface LogoutResponse {
  message?: string;
}
