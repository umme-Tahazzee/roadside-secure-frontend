// app/terms/page.tsx
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import LegalLayout from "@/components/legal/LegalLayout";
import { termsSections } from "@/data/legal/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | RoadRescue",
  description: "The rules for using the RoadRescue platform.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Terms"
      icon={FileText}
      title="Terms &"
      highlight="Conditions"
      description="Please read these terms carefully before using RoadRescue."
      lastUpdated="October 12, 2026"
      sections={termsSections}
    />
  );
}