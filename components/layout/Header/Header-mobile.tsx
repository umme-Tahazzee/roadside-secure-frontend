import Link from "next/link";
import { ArrowRight, LogIn, LogOut, Menu, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./Nav-Links";

// Hamburger button
export function MobileMenuButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 md:hidden"
    >
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}

interface Props {
  open: boolean;
  isLoggedIn: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
}

// Dropdown menu
export function MobileHeader({
  open,
  isLoggedIn,
  isLoggingOut,
  onLogout,
}: Props) {
  if (!open) return null;

  return (
    <div className="border-t border-border/70 md:hidden">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-primary/5 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 flex flex-col gap-3 border-t border-border/70 pt-4">
          {isLoggedIn ? (
            <Button
              variant="outline"
              disabled={isLoggingOut}
              onClick={onLogout}
              className="w-full gap-2 rounded-xl"
            >
              <LogOut className="size-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full gap-2 rounded-xl"
                )}
              >
                <LogIn className="size-4" />
                Log in
              </Link>

              <Link
                href="/register"
                className={cn(buttonVariants(), "w-full gap-2 rounded-xl")}
              >
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}