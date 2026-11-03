const DOC_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

// `value` is what the backend stores and matches customer requests against
export const SERVICE_OPTIONS = [
  { value: "TOWING", label: "Towing" },
  { value: "TYRE_CHANGE", label: "Tyre change" },
  { value: "BATTERY_JUMP_START", label: "Battery jump start" },
  { value: "FUEL_DELIVERY", label: "Fuel delivery" },
  { value: "LOCKOUT_HELP", label: "Lockout help" },
  { value: "ENGINE_REPAIR", label: "Engine repair" },
] as const;

export const documents = [
  {
    name: "nidDoc",
    label: "National ID (NID)",
    accept: DOC_TYPES,
    hint: "JPG, PNG, WEBP or PDF, up to 5 MB",
  },
  {
    name: "licenseDoc",
    label: "Driving license",
    accept: DOC_TYPES,
    hint: "JPG, PNG, WEBP or PDF, up to 5 MB",
  },
] as const;
