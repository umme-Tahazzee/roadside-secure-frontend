"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/utils/logo";
import { links } from "./NavData";
import { useGetMe, useLogout } from "@/hooks";
import { toast } from "../ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useGetMe();
  const {mutate: logout} = useLogout()



  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // menu open thakle body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // desktop size-e gele menu close
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = () => {
       logout(undefined, {
          onSuccess: () => {
             toast.add({
                 title: "Logout Successfully",
                 type : "success"
             })
          queryClient.removeQueries({
              queryKey: ['user']
          })

          },
          onError : () => {
              toast.add({
                 title : "Logout Failed",
                 description: "Something went wrong",
                 type : "error"
              })
          }
       })
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors ${
        scrolled || open
          ? "border-b bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-10">
          <Logo className="mt-2" imageClassName="h-10 w-fit md:h-20" />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {!user && !isLoading && (
            <>
              <Button variant="outline" size="xl" className="flex gap-2">
                <LogIn className="size-4" />
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="xl" className="flex gap-2 bg-primary text-white">
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}

          {user && !isLoading && (
            <Button variant="outline" size="xl" onClick={handleLogout}>
              <LogOut className="size-4" />
              Logout
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md 
          hover:bg-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu  */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-t bg-background shadow-lg md:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col px-5 py-3"
            aria-label="Mobile"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-4 pb-2">
              <Button variant="outline" size="lg">
                <Link href="/login" onClick={() => setOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button size="lg" className="bg-primary text-white">
                <Link href="/register" onClick={() => setOpen(false)}>
                  Get started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
