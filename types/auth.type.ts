export type UserRole = "CUSTOMER" | "MECHANIC" | "ADMIN";

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegistationPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role?: Exclude<UserRole, "ADMIN">;
}

export interface verifyPayload {
  email: string;
  otp: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
}
