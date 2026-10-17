"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  Headset,
  ShieldCheck,
  Clock3,
  Wallet,
} from "lucide-react";
import Eyebrow from "@/utils/Eyebrow";
import SectionTitle from "@/utils/SectionTitle";
import Link from "next/link";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does Roadside Secure work?",
    answer:
      "Choose the roadside service you need, share your vehicle location, and submit a request. We'll help connect you with an available mechanic. You can follow your request status and complete payment after the service.",
    icon: CircleHelp,
  },
  {
    question: "What roadside services can I request?",
    answer:
      "Depending on service availability, you can request tire changes, battery jump starts, fuel delivery, towing, lockout assistance, minor repairs, vehicle diagnostics, and tire inflation.",
    icon: Headset,
  },
  {
    question: "How do I find a nearby mechanic?",
    answer:
      "Share your location when requesting assistance. The platform can use your location and service requirements to find eligible mechanics nearby.",
    icon: ShieldCheck,
  },
  {
    question: "How much does roadside assistance cost?",
    answer:
      "The cost depends on the service and your location. Review the quoted or confirmed price before proceeding, and contact support if you need clarification.",
    icon: Wallet,
  },
  {
    question: "When do I need to pay?",
    answer:
      "Roadside Secure is designed around payment after the service is completed. Available payment methods depend on the payment options supported by the platform.",
    icon: Wallet,
  },
  {
    question: "Can I track my mechanic's arrival?",
    answer:
      "You can view your request status as it progresses. Live mechanic location and estimated arrival times are available only when supported by the active service and platform.",
    icon: Clock3,
  },
  {
    question: "Are the mechanics verified?",
    answer:
      "Mechanics may need to submit verification details and receive approval before providing services. Check the mechanic's displayed verification status before proceeding.",
    icon: ShieldCheck,
  },
  {
    question: "What if I need help with a different problem?",
    answer:
      "Contact our support team and describe the issue with your vehicle. We'll help you determine which available service best matches your needs.",
    icon: Headset,
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl items-center justify-center">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <Eyebrow
            label="Frequently Asked Questions"
            icon={CircleHelp}
            className="inline-flex"
          />
          <SectionTitle
            title="Got questions?"
            highlight="We've got answers."
            description="Everything you need to know about requesting roadside assistance, finding mechanics, and getting back on the road."
          />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          {/* FAQ accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                    isOpen
                      ? "border-secondary shadow-lg shadow-primary/5"
                      : "border-primary-foreground hover:border-[#b9e7da]"
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-[#e7f9f3] text-primary"
                      )}
                    >
                      <Icon size={21} strokeWidth={1.8} />
                    </span>

                    <span className="flex-1 text-base font-semibold leading-6 text-slate-900 sm:text-lg">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={21}
                      className={cn(
                        "shrink-0 text-primary transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    id={answerId}
                    hidden={!isOpen}
                    className="px-5 pb-6 pl-5 sm:pl-[84px] sm:pr-8"
                  >
                    <p className="text-sm leading-7 text-slate-500 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support card */}
          <aside
            className={cn(
              "relative overflow-hidden rounded-3xl border border-secondary",
              "bg-gradient-to-br from-[#e5faf3] via-[#effbf7] to-white",
              "p-7 sm:p-8 lg:sticky lg:top-24"
            )}
          >
            <div
              className={cn(
                "absolute -right-10 -top-10 h-36 w-36 rounded-full",
                "bg-[#c7f2e5]/50 blur-2xl"
              )}
            />

            <div className="relative">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl",
                  "bg-white text-primary shadow-sm"
                )}
              >
                <Headset size={29} strokeWidth={1.7} />
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
                Still have questions?
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Can&apos;t find the answer you&apos;re looking for? Our support
                team can help you find the right roadside assistance.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary">
                    <ShieldCheck size={18} />
                  </span>
                  Reliable assistance
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary">
                    <Clock3 size={18} />
                  </span>
                  Help with your request
                </div>
              </div>

              <Link
                href="/contact"
                className={cn(
                  "mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2",
                  "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white",
                  "transition-colors hover:bg-primary"
                )}
              >
                Contact Support
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                We&apos;re here to help you get back on the road.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div
          className={cn(
            "mt-12 flex flex-col gap-5 rounded-3xl border border-secondary",
            "bg-primary/15 p-6 shadow-sm",
            "sm:flex-row sm:items-center sm:justify-between sm:p-8"
          )}
        >
          <div>
            <h3 className="text-lg font-bold text-slate-950 sm:text-xl">
              Ready to get back on the road?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Find the assistance you need and request help.
            </p>
          </div>

          <Link
            href="/request-assistance"
            className={cn(
              "inline-flex min-h-12 shrink-0 items-center justify-center gap-2",
              "rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white",
              "transition-colors hover:bg-primary"
            )}
          >
            Request Assistance
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}