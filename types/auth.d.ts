export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType{
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
}
