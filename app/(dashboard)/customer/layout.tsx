import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CustomerShell } from "@/components/module/customer-dashboard/CustomerShell";

export const metadata: Metadata = {
  title: "My account",
  robots: { index: false, follow: false },
};

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <CustomerShell>{children}</CustomerShell>;
}
