
const DOC_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const SERVICE_SUGGESTIONS = [
  "Towing",
  "Tyre change",
  "Battery jump start",
  "Fuel delivery",
  "Lockout help",
  "Engine repair",
];

 export  const documents = [
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