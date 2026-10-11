import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CarFront, CircleHelp, House, Phone } from "lucide-react";
import img from "../app/assests/img/not-found/404 Road to Nowhere.png";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    title: "Our Services",
    description: "Explore available roadside help",
    href: "/#services",
    icon: CarFront,
  },
  {
    title: "Help Center",
    description: "Find answers to common questions",
    href: "/#faq",
    icon: CircleHelp,
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team",
    href: "/contact",
    icon: Phone,
  },
];

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
    

      <section className="relative mx-auto grid min-h-[calc(100vh-77px)]
       max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-10">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary md:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Error 404
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Oops! This road{" "}
            <span className="text-primary">leads nowhere</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button  size="xl" className="h-12 px-7 text-base flex gap-1">
              <Link href="/">
                Back to home
              </Link>
            </Button>
            <Button
              
              size="xl"
              variant="outline"
              className="h-12 px-7 text-base"
            >
              <Link href="/request-assistance">
                Find nearby service
              </Link>
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-12 hidden md:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Or try one of these
            </p>
            <ul className="grid gap-3 text-left sm:grid-cols-3 lg:max-w-xl">
              {quickLinks.map(({ title, description, href, icon: Icon }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
          {/* Decorative circle */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
          />

          <div className="relative aspect-[4/3] w-full">
            <Image
              src={img}
              alt="A roadside vehicle on a winding road with direction signs"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain drop-shadow-xl"
            />
          </div>

          {/* Floating information card */}
          <div className="hidden absolute bottom-3 left-2 md:flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur sm:bottom-8 sm:left-0 sm:p-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CarFront size={23} />
            </span>
            <span>
              <span className="block text-sm font-bold">Lost your way?</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                We&apos;ll help you find the right road.
              </span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}