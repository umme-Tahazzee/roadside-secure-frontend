import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const loginValidationSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase(),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});


export const registerCustomerValidationSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: z
      .string({ error: "Email is required" })
      .email("Invalid email format")
      .toLowerCase(),
    password: z
      .string({ error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must not exceed 30 characters"),

    confirmPassword: z.string().min(1, "Please confirm Your Password"),

     phone: z
      .string()
      .refine((val) => val === "" || isValidPhoneNumber(val), {
        message: "Invalid phone number for the selected country",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not matched",
    path: ["confirmPassword"],
  });

export const verifyEmailValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .email("Invalid email format")
      .toLowerCase(),
    otp: z
      .string({ error: "OTP is required" })
      .min(2, "OTP must be exactly 2 digits"),
  }),
});

