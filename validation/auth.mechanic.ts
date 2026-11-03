import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);
export const MAX_VEHICLE_PHOTOS = 5;

export const DOC_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Single file field (used for NID and license)
export const fileField = (label: string, allowed: string[], typeMsg: string) =>
  z
    .instanceof(File, { message: `${label} is required` })
    .refine(
      (f) => f.size <= MAX_FILE_SIZE,
      `File must be ${MAX_FILE_SIZE_MB} MB or smaller`,
    )
    .refine((f) => allowed.includes(f.type), typeMsg);

// Step 1: account (matches the backend /auth/register rules, with a stricter password)
export const mechanicAccountSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be 50 characters or fewer"),
    email: z.email("Enter a valid email address").toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be 30 characters or fewer"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Step 3: profile and documents (POST /mechanics/profile)
export const mechanicProfileSchema = z.object({
  serviceTypes: z.array(z.string()).min(1, "Select at least one service"),
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
  vehiclePhotos: z
    .array(z.instanceof(File))
    .min(1, "Upload at least one photo")
    .max(
      MAX_VEHICLE_PHOTOS,
      `You can upload up to ${MAX_VEHICLE_PHOTOS} photos`,
    )
    .refine(
      (files) => files.every((f) => f.size <= MAX_FILE_SIZE),
      `Each photo must be ${MAX_FILE_SIZE_MB} MB or smaller`,
    )
    .refine(
      (files) => files.every((f) => PHOTO_TYPES.includes(f.type)),
      "Use JPG, PNG or WEBP photos",
    ),
});
