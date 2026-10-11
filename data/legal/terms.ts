// data/legal/terms.ts
import type { LegalSection } from "@/components/legal/TableOfContents";

export const termsSections: LegalSection[] = [
  {
    id: "about-service",
    title: "About the service",
    content: [
      "RoadRescue is a platform that connects drivers with independent roadside mechanics. Mechanics are independent service providers, not employees of RoadRescue.",
    ],
  },
  {
    id: "accounts",
    title: "Your account",
    content: ["You agree to:"],
    list: [
      "Provide accurate information and location.",
      "Keep your login details secure.",
      "Not submit fake or prank requests.",
      "Treat mechanics and other users with respect.",
    ],
  },
  {
    id: "mechanics",
    title: "Mechanic responsibilities",
    content: ["Mechanics on the platform agree to:"],
    list: [
      "Hold valid documents and be verified before accepting jobs.",
      "Confirm the price with the customer before starting work.",
      "Provide safe, professional service.",
    ],
  },
  {
    id: "pricing-payment",
    title: "Pricing and payment",
    content: [
      "The final price is confirmed with you before work begins. Any platform fee will be shown before you confirm. Payments are processed through our supported payment methods. If a payment fails, the job may not be completed until it is resolved.",
    ],
  },
  {
    id: "cancellation-refunds",
    title: "Cancellation and refunds",
    content: [
      "You can cancel a request before a mechanic is on the way at no charge. If a mechanic has already started travelling, a cancellation fee may apply. If you have an issue with a completed job, contact support and we will review it under our refund process.",
    ],
  },
  {
    id: "emergencies",
    title: "Emergency disclaimer",
    content: [
      "RoadRescue is not an emergency service. For medical, police or fire emergencies, call your local emergency number immediately.",
      "Estimated arrival times are not guaranteed and may change due to traffic, weather or network conditions.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: [
      "Because mechanics are independent providers, RoadRescue is not responsible for the quality of their work or for damage or loss during a service, to the extent permitted by law.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited use",
    content: ["You must not:"],
    list: [
      "Use the platform for fraud or abuse.",
      "Post fake reviews or false information.",
      "Attempt to reverse engineer or disrupt the service.",
    ],
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    content: [
      "We may suspend or terminate accounts that violate these terms or put others at risk.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: [
      "These terms are governed by the laws of Bangladesh. Disputes will be handled by the courts of Bangladesh.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: [
      "We may update these terms. Continued use of RoadRescue after changes means you accept the updated terms.",
    ],
  },
];