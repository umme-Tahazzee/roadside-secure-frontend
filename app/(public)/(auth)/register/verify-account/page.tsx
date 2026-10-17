import VerifyAccount from "@/components/module/auth/VerfityAccount";
import { Suspense } from "react";
import { CarFront, ShieldCheck, Zap } from "lucide-react";
import Logo from "@/utils/logo";
import SectionTitle from "@/utils/SectionTitle";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure account",
    text: "Keep your account protected.",
  },
  {
    icon: CarFront,
    title: "Access roadside services",
    text: "Find assistance when you need it.",
  },
  {
    icon: Zap,
    title: "Get back on the road",
    text: "Fast, reliable help on demand.",
  },
];

export default function VerifyAccountPage() {
  return (
    <main className="min-h-svh p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100svh-2rem)] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:min-h-[calc(100svh-3rem)] lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2">
        {/* Left panel */}
        <section className="flex flex-col items-center bg-primary/5 px-6 py-8 sm:px-10 lg:py-10">
          <Logo
            className="flex items-center"
            imageClassName="h-10 w-auto object-contain sm:h-12"
          />

          {/* flex-1 + items-center: content ta vertically center thakbe */}
          <div className="flex w-full flex-1 items-center py-10">
            <div className="mx-auto w-full max-w-md">
              <SectionTitle
                title="One Step to "
                highlight="hit the road"
                description="Verify your email address to secure your account and get started with reliable roadside assistance."
              />

              <ul className="mt-10 space-y-5">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        {title}
                      </h2>
                      <p className="text-sm text-slate-500">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <Suspense
          fallback={
            <div className="flex min-h-64 items-center justify-center bg-white">
              <div className="size-8 animate-spin rounded-full border-2 border-slate-200
               border-t-primary" />
            </div>
          }
        >
          <VerifyAccount />
        </Suspense>
      </div>
    </main>
  );
}
