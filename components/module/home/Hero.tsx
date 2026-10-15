import Image from "next/image";
import Link from "next/link";
import { Car, Check, MapPin, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner from "@/app/assests/img/hero/right-site.png";

const highlights = [
  "Verified mechanics",
  "No sign-up fee",
  "Pay after the job",
];

const services = [
  {
    icon: Car,
    title: "Vehicle service",
    text: "Cars, bikes and more",
  },
  {
    icon: Wrench,
    title: "Machine repair",
    text: "On-the-spot fixes",
  },
  {
    icon: MapPin,
    title: "Nearby experts",
    text: "Matched by location",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="h-20"></div>

      <div
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 
         
       lg:grid-cols-[1.05fr_0.95fr] lg:gap-6"
      >
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border
           bg-priamry/70 px-3 py-1 text-xs md:text-sm font-medium text-primary backdrop-blur dark:text-primary"
          >
            <span className="size-1.5 rounded-full bg-current" />
            RoadSite Assistance, Anytime, Anywhere
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
            <Button size="lg" variant="outline" className="h-12 px-7 text-base">
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

        {/* Right-side hero illustration */}
        <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
          <div className="relative aspect-[4/3] w-full ">
            <Image
              src={banner}
              alt="Roadside Secure showing a car breakdown, nearby mechanic matching, and roadside assistance tracking"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              fill
              className="object-contain object-center z-0"
            />
          </div>

          <div className="hidden  relative z-10 -mt-8 md:grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-primary/10 bg-background/95 p-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {service.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
