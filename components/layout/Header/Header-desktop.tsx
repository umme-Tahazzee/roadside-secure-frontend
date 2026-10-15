import Link from "next/link";
import { ArrowRight, LogIn, LogOut } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./Nav-Links";

interface Props {
  isLoggedIn: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export function DesktopHeader({ isLoggedIn, isLoggingOut, onLogout }: Props) {
  return (
    <div className="hidden flex-1 items-center justify-between md:flex">
      {/* Nav links */}
      <nav className="ml-10 flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <Button
            variant="outline"
            size='lg'
            disabled={isLoggingOut}
            onClick={onLogout}
            className="gap-2 rounded-full"
          >
            <LogOut className="size-4" />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        ) : (
          <>
            <Link
              href="/login"
              
               className={cn(
                buttonVariants({ variant: "outline", size:"xl" }),
              
                "gap-2 rounded-full"
              )}
            >
              <LogIn className="size-4" />
              Log in
            </Link>

            <Link
              href="/register"
              className={cn(buttonVariants({size:"xl"}), "gap-2 rounded-full")}
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
          </>
        )}
      </div>

      
    </div>
  );
}