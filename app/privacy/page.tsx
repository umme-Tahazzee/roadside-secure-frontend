// app/privacy/page.tsx
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import LegalLayout from "@/components/legal/LegalLayout";
import { privacySections } from "@/data/legal/privacy";


export const metadata: Metadata = {
  title: "Privacy Policy | RoadRescue",
  description: "How RoadRescue collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Privacy"
      icon={ShieldCheck}
      title="Your privacy,"
      highlight="our priority"
      description="Here is what we collect, why we collect it, and the control you have over your data."
      lastUpdated="October 12, 2026"
       sections={privacySections}
    />
  );
}