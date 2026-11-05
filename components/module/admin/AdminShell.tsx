"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import * as Icons from "@/components/shared/icons";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { getErrorStatus } from "@/lib/error";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: Icons.LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Icons.Users },
  { href: "/admin/mechanics", label: "Mechanics", icon: Icons.Wrench },
  { href: "/admin/requests", label: "Requests", icon: Icons.ClipboardList },
  { href: "/admin/payments", label: "Payments", icon: Icons.CreditCard },
  { href: "/admin/activities", label: "Activity log", icon: Icons.History },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGetMe();
  const { mutate: logOut, isPending: isLoggingOut } = useLogout();

  const user = data?.data;
  const notLoggedIn = Boolean(error) && getErrorStatus(error) === 401;

  useEffect(() => {
    if (notLoggedIn)
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [notLoggedIn, pathname, router]);

  // logged in but not an admin -> home
  useEffect(() => {
    if (user && user.role !== "ADMIN") router.replace("/");
  }, [user, router]);

  if (isLoading || notLoggedIn || !user || user.role !== "ADMIN") {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  const handleLogout = () => {
    logOut(undefined, {
      onSuccess: () => {
        queryClient.clear();
        router.replace("/login");
      },
      onError: () => toast.add({ title: "Logout failed", type: "error" }),
    });
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-svh md:grid md:grid-cols-[15rem_1fr]">
      <aside className="border-b bg-card md:sticky md:top-0 md:h-svh md:border-r md:border-b-0">
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="flex items-center justify-between md:block">
            <Logo imageClassName="h-12 w-fit" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground md:mt-2 md:block">
              Admin panel
            </span>
          </div>

          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive(href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto hidden flex-col gap-2 md:flex">
            <div className="px-1 text-sm">
              <p className="truncate font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            <Button
              variant="outline"
              disabled={isLoggingOut}
              onClick={handleLogout}
            >
              <Icons.LogOut /> {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 p-4 md:p-8">{children}</main>
    </div>
  );
}
