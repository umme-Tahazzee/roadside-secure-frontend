// data/legal/privacy.ts
import type { LegalSection } from "@/components/legal/TableOfContents";

export const privacySections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: ["We collect only the information needed to provide roadside assistance:"],
    list: [
      "Account details: name, email, phone number and password (stored hashed).",
      "Location: your location when you request help, and the mechanic's live location during an active job.",
      "Vehicle details: vehicle type, model, plate number and problem description.",
      "Technical data: IP address, browser type, device information and logs.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: ["We use your information to:"],
    list: [
      "Match you with verified mechanics nearby.",
      "Show live tracking and estimated arrival time.",
      "Process payments and send receipts.",
      "Provide support, prevent fraud and improve our service.",
    ],
  },
  {
    id: "location-data",
    title: "Location data",
    content: [
      "We use your location only when you request assistance or while a job is active. Live tracking stops when the job is completed or cancelled.",
      "You can deny location permission in your browser at any time. In that case, automatic location detection will not work and you will need to enter your location manually.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share data with",
    content: ["We do not sell your personal data. We share it only with:"],
    list: [
      "The mechanic assigned to your job (only what is needed to complete it).",
      "Payment processors that handle your payment securely.",
      "Service providers such as hosting and file storage.",
      "Authorities, when required by law.",
    ],
  },
  {
    id: "payments",
    title: "Payments",
    content: [
      "Payments are handled by third-party payment gateways. RoadRescue does not store your full card details on its servers.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    content: [
      "We keep your data only as long as needed for the purposes above, or as required by law. When you delete your account, we remove or anonymize your personal data, except records we must keep for legal or accounting reasons.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: ["You can ask us to:"],
    list: [
      "Access the personal data we hold about you.",
      "Correct inaccurate data.",
      "Delete your account and data.",
      "Opt out of marketing messages.",
    ],
  },
  {
    id: "security",
    title: "Security",
    content: [
      "We use HTTPS, hashed passwords and role-based access control to protect your data. No system is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    content: [
      "We use cookies to keep you signed in and to understand how the platform is used. You can control cookies from your browser settings.",
    ],
  },
  {
    id: "children",
    title: "Children",
    content: ["RoadRescue is not intended for users under 18 years old."],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: [
      "We may update this policy from time to time. If we make important changes, we will notify you on the platform or by email.",
    ],
  },
];