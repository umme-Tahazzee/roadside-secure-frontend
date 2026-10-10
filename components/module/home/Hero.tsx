import Image from "next/image";
import Link from "next/link";
import { Car, Check, MapPin, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner from "@/app/assests/img/hero/banner2.png";

const highlights = ["Verified mechanics", "No sign-up fee", "Pay after the job"];


const services = [
  {
    icon: Car,
    title: "Vehicle service",
    text: "Cars, bikes and more",
    position: "left-0 top-[10%] lg:-left-6",
    delay: "0s",
  },
  {
    icon: Wrench,
    title: "Machine repair",
    text: "On-the-spot fixes",
    position: "right-0 top-[44%] lg:-right-6",
    delay: "1.2s",
  },
  {
    icon: MapPin,
    title: "Nearby experts",
    text: "Matched by location",
    position: "bottom-[8%] left-3 lg:left-2",
    delay: "2.4s",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm font-medium text-primary backdrop-blur dark:text-teal-400">
            <span className="size-1.5 rounded-full bg-current" />
            Fast, reliable, nearby
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Roadside help, on its way in minutes.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Request a verified mechanic from your phone, follow the job as it
            moves, and pay when it&apos;s done.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-7 text-base">
              <Link href="/register">Find nearby service</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base"
              
            >
              <Link href="/register">Create account</Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <Check className="size-4 text-primary dark:text-teal-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* `fill` needs a sized, relative parent */}
        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-8 rounded-full bg-primary/15"
          />
          <Image
            src={banner}
            alt="Mechanic helping a driver with a broken-down car at the roadside"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-contain"
          />

          {/* Floating service chips, circle er upor */}
          {services.map((s) => (
            <div
              key={s.title}
              style={{ animationDelay: s.delay }}
              className={`absolute z-10 flex items-center gap-3 rounded-xl border bg-background/90 px-3 py-2.5 shadow-lg shadow-primary/10 backdrop-blur animate-float motion-reduce:animate-none ${s.position}`}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-teal-400">
                <s.icon className="size-[18px]" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium">{s.title}</p>
                <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}