export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegistationPayload {
  name : string
  email: string;
  password: string;
  confirmPassword:string;
  phone ?: string
}

export interface verifyPayload {
   email :string
   otp : string
}