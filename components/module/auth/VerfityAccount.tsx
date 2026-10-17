"use client"

import Logo from "@/utils/logo";
import { ArrowLeft, CarFront, CheckCircle2, Clock3, Mail, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function VerifyAccount() {
  const params = useSearchParams()
  const email = params.get("email")
  
  return (
    <main className="min-h-screen bg-[#f2faf7] p-3 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-[28px] border border-white bg-white shadow-xl shadow-[#0c5145]/5 lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">
        {/* Left panel */}
        <section className="relative flex min-h-[540px] flex-col overflow-hidden bg-gradient-to-br from-[#eafbf6] via-[#dff7f1] to-[#f7fcfa] px-6 py-7 sm:px-10 sm:py-9 lg:min-h-[760px] lg:px-12 lg:py-10">
          {/* Background decorations */}
          <div className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-white/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#bceee0]/50 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" aria-label="Roadside Secure home">
              <Logo
                className="flex items-center"
                imageClassName="h-12 w-auto object-contain sm:h-14"
              />
            </Link>

            <div className="mt-12 max-w-md sm:mt-16 lg:mt-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d2eee5] bg-white/75 px-3.5 py-2 text-sm font-semibold text-[#008879]">
                <ShieldCheck size={17} />
                Account verification
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                One last step
                <span className="block text-[#008879]">
                  to hit the road.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
                Verify your email address to secure your account
                and get started with reliable roadside assistance.
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-9 space-y-5 sm:mt-10">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#008879] shadow-sm">
                  <ShieldCheck size={23} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Secure Account
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Help keep your account protected.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#008879] shadow-sm">
                  <CarFront size={24} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Access Roadside Services
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Find assistance when you need it.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#008879] shadow-sm">
                  <Zap size={23} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Get Back on the Road
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Start your roadside assistance journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative roadside illustration */}
          <div className="relative mt-10 flex flex-1 items-end justify-center lg:mt-4">
            <div className="absolute bottom-0 h-40 w-full rounded-t-[50%] bg-gradient-to-t from-[#a8e5d5]/70 to-transparent" />

            <div className="relative flex h-36 w-full max-w-sm items-center justify-center overflow-hidden rounded-t-[48%] border border-white/70 bg-white/35 sm:h-44">
              <div className="absolute left-8 top-10 size-20 rounded-full bg-[#c9f0e5]" />
              <div className="absolute right-10 top-5 size-28 rounded-full bg-[#d9f5ed]" />

              <div className="absolute bottom-[-50px] left-1/2 h-56 w-32 -translate-x-1/2 rotate-[20deg] rounded-[45%] border-x-[20px] border-[#c1e8de] bg-[#eaf8f4]" />

              <div className="relative flex size-20 items-center justify-center rounded-3xl border border-white bg-white/90 text-[#008879] shadow-lg shadow-[#008879]/10">
                <CarFront size={43} strokeWidth={1.5} />
              </div>

              <div className="absolute right-8 top-7 flex size-11 items-center justify-center rounded-full bg-[#008879] text-white shadow-md">
                <ShieldCheck size={23} />
              </div>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <section className="flex items-center justify-center bg-white px-5 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-lg">
            <div className="text-center">
              <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-[#e8f9f4] text-[#008879] sm:size-28">
                <div className="relative">
                  <Mail size={48} strokeWidth={1.6} />
                  <span className="absolute -bottom-2 -right-3 flex size-8 items-center justify-center rounded-full border-4 border-[#e8f9f4] bg-[#008879] text-white">
                    <CheckCircle2 size={19} />
                  </span>
                </div>
              </div>

              <h2 className="mt-7 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Verify your account
              </h2>

              <p className="mt-3 text-base leading-7 text-slate-500">
                We&apos;re ready to help you get started. Verify
                your email address to continue.
              </p>
            </div>

            {/* Email display */}
            <div className="mt-8 rounded-2xl border border-[#dcece6] bg-white p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f9f4] text-[#008879]">
                  <Mail size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">
                    Verification email sent to
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-slate-900 sm:text-base">
                    {email || "No email address provided"}
                  </p>
                </div>

                <Link
                  href="/register"
                  className="shrink-0 text-sm font-semibold text-[#008879] transition hover:text-[#006f63]"
                >
                  Change
                </Link>
              </div>
            </div>

            {/* Helpful information */}
            <div className="mt-5 flex gap-3 rounded-2xl bg-[#eaf9f4] p-4 sm:p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#008879]">
                <Clock3 size={21} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Didn&apos;t receive the email?
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Check your spam or junk folder. You can also
                  request another verification email below.
                </p>
              </div>
            </div>

           

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Or
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Link
              href="/login"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-800 transition hover:border-[#9edfd0] hover:bg-[#f7fcfa]"
            >
              <ArrowLeft size={19} />
              Go back to login
            </Link>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-[#008879]" />
              Your account security matters to us.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
  

