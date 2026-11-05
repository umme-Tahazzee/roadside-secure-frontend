import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-heading text-3xl font-semibold">{value}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
