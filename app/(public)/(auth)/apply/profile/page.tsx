import type { Metadata } from "next";

import MechanicProfileForm from "@/components/module/form/MechanicProfileForm";
import { ApplyShell } from "@/components/module/mechanic/ApplyShell";

export const metadata: Metadata = {
  title: "Complete your mechanic application",
};

export default function ApplyProfilePage() {
  return (
    <ApplyShell>
      <MechanicProfileForm />
    </ApplyShell>
  );
}
