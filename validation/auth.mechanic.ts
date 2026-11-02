import z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DOC_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];


//machine profile validation

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
     phone: z
          .string()
          .refine((val) => val === "" || isValidPhoneNumber(val), {
            message: "Invalid phone number for the selected country",
          })
          .optional(),
    serviceTypes: z
      .array(z.string().trim().min(1))
      .min(1, "Add at least one service"),
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
  
