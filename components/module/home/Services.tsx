
"use client";

import Image from "next/image";
import {
  ShieldCheck,
  Clock3,
  Wallet,
  Headset,
  Users,
  UserRoundCheck,
  MapPin,
  Star,
} from "lucide-react";
import img from '@/app/assests/img/why-choose-roadsite/roadsite1.png'


const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Mechanics",
    description:
      "Skilled and background-checked mechanics you can trust.",
  },
  {
    icon: Clock3,
    title: "Fast Response",
    description: "Get help quickly when you need it most.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "Know the cost upfront with no hidden fees.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We're here to help whenever you need assistance.",
  },
];

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
  },
  {
    icon: UserRoundCheck,
    value: "500+",
    label: "Verified Mechanics",
  },
  {
    icon: MapPin,
    value: "15+",
    label: "Cities Covered",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Average Rating",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:px-16 lg:py-24 mt-10"
    >
      

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Left content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#008577]">
              <ShieldCheck size={18} />
              Why choose Roadside Secure
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-dark
             sm:text-4xl lg:text-[46px]">
              Reliable roadside support whenever{" "}
              <span className="text-[#008577]">you need it</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              We connect you with verified, professional mechanics
              so you can get back on the road quickly and safely.
            </p>

            {/* Benefit cards */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group rounded-2xl border border-secondary bg-card
                     p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/15
                      hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center
                     justify-center rounded-full bg-secondary text-[#008577] transition-colors group-hover:bg-[#008577] group-hover:text-white">
                      <Icon size={27} strokeWidth={2} />
                    </div>

                    <h3 className="text-lg font-semibold text-dark">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right illustration */}
          <div className="relative mx-auto w-full max-w-[620px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8f4ec]"
            />

            {/* Replace with your generated roadside image */}
            <div className="relative aspect-[5/4] w-full">
              <Image
                src={img}
                alt="Roadside assistance illustration showing a car breakdown, mechanic tracking and nearby support"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-sm"
              />
            </div>

            {/* Floating service cards */}
            <div className="absolute -left-1 top-[16%] hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-lg shadow-slate-200/60 sm:flex sm:-left-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e0f8f1] text-[#008577]">
                <Wallet size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  On-the-spot repair
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Get back on the road
                </p>
              </div>
            </div>

            <div className="absolute -right-1 top-[8%] hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-lg shadow-slate-200/60 sm:flex sm:-right-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e0f8f1] text-[#008577]">
                <Clock3 size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  Mechanic assistance
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Help when you need it
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-lg shadow-slate-200/60 sm:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e0f8f1] text-[#008577]">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  Nearby experts
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Matched by location
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics bar */}
        <div className="mt-20 grid grid-cols-2 gap-y-8 rounded-3xl border border-[#e2f3ee] bg-[#ecfaf6] px-5 py-8 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:px-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex items-center justify-center gap-3 sm:gap-4 lg:px-5 ${
                  index !== stats.length - 1
                    ? "lg:border-r lg:border-[#ccece3]"
                    : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d5f7ed] text-[#008577] sm:h-14 sm:w-14">
                  <Icon size={25} strokeWidth={2} />
                </div>

                <div>
                  <p className="text-2xl font-bold tracking-tight text-[#101828] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
