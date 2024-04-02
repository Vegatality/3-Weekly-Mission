export interface SignParams {
  email: string;
  password: string;
}

export interface SignResponse {
  accessToken: string;
  refreshToken: string;
}
