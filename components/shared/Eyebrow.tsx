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
      className={` inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary ${className}`}
    >
      <span className="text-primary">
        <Icon />
      </span>
      {label}
    </div>
  );
}