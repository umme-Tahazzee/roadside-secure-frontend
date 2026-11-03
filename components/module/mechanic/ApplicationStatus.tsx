import Link from "next/link";

import * as Icons from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MechanicStatus } from "@/types";

const STATUS_CONTENT: Record<
  MechanicStatus,
  { icon: typeof Icons.Clock; title: string; text: string; tone: string }
> = {
  PENDING: {
    icon: Icons.Clock,
    title: "Application under review",
    text: "We received your documents. Our team will review them, and you can start taking jobs once you are approved.",
    tone: "bg-amber-100 text-amber-700",
  },
  APPROVED: {
    icon: Icons.CheckCircle2,
    title: "You are approved",
    text: "Your application is approved. You can now go online and start receiving requests near you.",
    tone: "bg-emerald-100 text-emerald-700",
  },
  REJECTED: {
    icon: Icons.XCircle,
    title: "Application not approved",
    text: "We could not approve your application. Please contact support if you think this is a mistake.",
    tone: "bg-red-100 text-red-700",
  },
  SUSPENDED: {
    icon: Icons.XCircle,
    title: "Account suspended",
    text: "Your mechanic account is currently suspended. Please contact support for details.",
    tone: "bg-red-100 text-red-700",
  },
};

export function ApplicationStatus({ status }: { status: MechanicStatus }) {
  const { icon: Icon, title, text, tone } = STATUS_CONTENT[status];

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full",
            tone,
          )}
        >
          <Icon className="size-6" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="max-w-md">{text}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to home
        </Link>
      </CardContent>
    </Card>
  );
}
