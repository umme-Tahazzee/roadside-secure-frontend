import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  CarFront,
  CircleHelp,
  Fuel,
  Gauge,
  KeyRound,
  MapPin,
  ShieldCheck,
  Truck,
  Wind,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import map from "@/app/assests/img/services/map.jpg";
import Eyebrow from "@/utils/Eyebrow";
import SectionTitle from "@/utils/SectionTitle";

const services = [
  {
    title: "Tire Change",
    description: "Flat tire? We'll come and replace it for you.",
    icon: CarFront,
  },
  {
    title: "Battery Jump Start",
    description: "Dead battery? Get back on the road quickly.",
    icon: BatteryCharging,
  },
  {
    title: "Fuel Delivery",
    description: "Out of fuel? We deliver fuel to your location.",
    icon: Fuel,
  },
  {
    title: "Towing Service",
    description: "Safe and reliable towing to your preferred garage.",
    icon: Truck,
  },
  {
    title: "Lockout Assistance",
    description: "Locked out? We'll help you get back in.",
    icon: KeyRound,
  },
  {
    title: "Minor Repairs",
    description: "On-the-spot fixes for common vehicle issues.",
    icon: Wrench,
  },
  {
    title: "Diagnostic Check",
    description: "Quick diagnostics to identify the issue.",
    icon: Gauge,
  },
  {
    title: "Tire Inflation",
    description: "Low on air? We'll help inflate your tires.",
    icon: Wind,
  },
];

export default function OurServices() {
  return (
    <section
      id="services"
      className="mx-auto flex w-full max-w-7xl scroll-mt-20 flex-col items-center px-4 py-16 lg:py-24"
    >
      {/* Section heading */}
      <Eyebrow label="Our Services" icon={Wrench} />
      <SectionTitle
        title="Roadside assistance for"
        highlight="every situation"
        description="From flat tires to battery jump starts, our roadside assistance platform helps you find the right service and get back on the road."
      />

      {/* Services grid + support panel */}
      <div className="mt-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Service cards */}
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={`/services?type=${encodeURIComponent(service.title)}`}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-primary transition-all duration-300 lg:-translate-x-1 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Contact support panel */}
        <aside className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-primary/5 p-6 text-left sm:p-8 lg:col-span-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <MapPin size={14} />
            Need assistance?
          </span>

          <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-foreground">
            Can&apos;t find what you need?
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tell us what&apos;s wrong with your vehicle. We&apos;ll help you
            find the right assistance.
          </p>

          {/* Map illustration */}
          <div className="relative mt-6 flex min-h-[200px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background">
            <Image
              src={map}
              alt="Map showing nearby roadside assistance"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Car marker with pulse */}
            <div className="relative z-10 flex items-center justify-center">
              <span className="absolute h-16 w-16 animate-ping rounded-2xl bg-primary/30" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <CarFront size={30} />
              </div>
            </div>

            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary shadow-md">
              <MapPin size={20} />
            </div>

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-foreground">
                Assistance nearby
              </span>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact Support
            <ArrowRight size={17} />
          </Link>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={15} className="text-primary" />
            We&apos;re here to help
          </div>
        </aside>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 flex w-full flex-col gap-6 rounded-3xl border border-border bg-gradient-to-r from-primary/10 to-primary/5 p-6 text-left sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
            <CircleHelp size={28} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground sm:text-xl">
              Not sure what service you need?
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Describe your problem and find the right roadside assistance.
            </p>
          </div>
        </div>

        <Link
          href="/request-assistance"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          Get Help Now
          <ArrowRight size={19} />
        </Link>
      </div>
    </section>
  );
}