import type { LucideIcon } from "lucide-react";
import { Settings } from "lucide-react";

type EyebrowProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export default function Eyebrow({
  label,
  icon: Icon = Settings,
  className = "",
}: EyebrowProps) {
  return (
    <div
      className={`mt-4 flex items-center gap-1 rounded-2xl bg-primary/5 px-4 py-1 text-sm font-bold text-dark lg:text-xl ${className}`}
    >
      <span className="text-primary">
        <Icon />
      </span>
      {label}
    </div>
  );
}