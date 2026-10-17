"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RESEND_SECONDS = 30;

export default function VerifyAccount() {
  const params = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);

  // Resend countdown: ek second por por kome, 0 te ese thame jabe
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call ekhane (email + otp pathao)
    console.log({ email, otp });
  };

  const handleResend = () => {
    // TODO: resend API call ekhane
    setOtp("");
    setCountdown(RESEND_SECONDS);
  };

  return (
    <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#eafbf6] text-primary">
            <Mail size={28} strokeWidth={1.6} />
          </div>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Verify your account
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the 6-digit code we sent to
            {email ? (
              <span className="block font-medium text-slate-800">{email}</span>
            ) : (
              <span className="block font-medium text-slate-800">
                your email
              </span>
            )}
          </p>
        </div>

        {/* OTP form */}
        <form id="otp-form" onSubmit={handleSubmit} className="mt-8">
          <InputOTP
            maxLength={6}
            autoComplete="off"
            name="otp"
            id="otp"
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={setOtp}
            containerClassName="justify-center"
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="size-11 rounded-lg border text-lg font-semibold first:rounded-lg first:border last:rounded-lg sm:size-12"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </form>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <Button
            type="submit"
            form="otp-form"
            disabled={otp.length < 6}
            className="h-11 w-full"
          >
            Verify
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleResend}
            disabled={countdown > 0}
            className="h-11 w-full text-slate-600"
          >
            {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
          </Button>
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck size={14} />
          Your account security matters to us.
        </div>
      </div>
    </section>
  );
}