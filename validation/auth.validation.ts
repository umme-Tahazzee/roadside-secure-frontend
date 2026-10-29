import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DOC_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

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



export const fileField = (label: string, allowed: string[], typeMsg: string) =>
  z
    .instanceof(File, { message: `${label} is required` })
    .refine((f) => f.size <= MAX_FILE_SIZE, "File must be 5 MB or smaller")
    .refine((f) => allowed.includes(f.type), typeMsg);

export const mechanicSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be 50 characters or fewer"),
    email: z.email("Enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be 30 characters or fewer"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    serviceTypes: z.string().min(1, "Select at least one service you provide"),
    serviceRadius: z
      .number({ error: "Enter your service radius in km" })
      .positive("Radius must be greater than 0")
      .max(100, "Radius must be 100 km or less"),
    nidDoc: fileField(
      "National ID",
      DOC_TYPES,
      "Use a JPG, PNG, WEBP or PDF file",
    ),
    licenseDoc: fileField(
      "Driving license",
      DOC_TYPES,
      "Use a JPG, PNG, WEBP or PDF file",
    ),
    vehiclePhoto: fileField(
      "Vehicle photo",
      PHOTO_TYPES,
      "Use a JPG, PNG or WEBP image",
    ),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
