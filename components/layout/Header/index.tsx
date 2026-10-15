
"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Logo from "@/utils/logo";
import { useGetMe, useLogout } from "@/hooks";
import { useAuthStore } from "@/store/auth.store";
import { DesktopHeader } from "./Header-desktop";
import { MobileHeader, MobileMenuButton } from "./Header-mobile";
import { toast } from "@/components/ui/toast";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data, isFetched } = useGetMe();
  const { mutate: logOut } = useLogout();

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);

  // Restore persisted Zustand state after mounting
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  // Sync the UI with the current-user API response
  useEffect(() => {
    if (isFetched) {
      setIsLoggedIn(Boolean(data));
    }
  }, [data, isFetched, setIsLoggedIn]);

  // Handle header scroll styling
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLogout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    logOut(undefined, {
      onSuccess: () => {
        setIsLoggedIn(false);
        setMenuOpen(false);

        toast.add({
          title: "Logout Successfully",
          type: "success",
        });

        setIsLoggingOut(false);
      },

      onError: () => {
        toast.add({
          title: "Logout Failed",
          type: "error",
        });

        setIsLoggingOut(false);
      },
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled || menuOpen
          ? "border-border/70 bg-background/90 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5">
        <Logo
          className="flex items-center"
          imageClassName="h-[120px] w-auto object-contain"
        />

        <DesktopHeader
          isLoggedIn={isLoggedIn}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
        />

        <MobileMenuButton
          open={menuOpen}
          onToggle={() => setMenuOpen((prev) => !prev)}
        />
      </div>

      <MobileHeader
        open={menuOpen}
        isLoggedIn={isLoggedIn}
        isLoggingOut={isLoggingOut}
        onLogout={handleLogout}
      />
    </header>
  );
}
