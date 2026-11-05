import type { Metadata } from "next";
import type { ReactNode } from "react";

import { MechanicShell } from "@/components/module/mechanic-dashboard/MechanicShell";

export const metadata: Metadata = {
  title: "Mechanic",
  robots: { index: false, follow: false },
};

export default function MechanicLayout({ children }: { children: ReactNode }) {
  return <MechanicShell>{children}</MechanicShell>;
}
