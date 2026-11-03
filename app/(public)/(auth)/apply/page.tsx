import type { Metadata } from "next";

import MechanicAccountForm from "@/components/module/form/MechanicAccountForm";
import { ApplyShell } from "@/components/module/mechanic/ApplyShell";

export const metadata: Metadata = { title: "Become a mechanic partner" };

export default function ApplyPage() {
  return (
    <ApplyShell>
      <MechanicAccountForm />
    </ApplyShell>
  );
}
