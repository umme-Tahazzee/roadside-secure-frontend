"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResendOtp, useVerification } from "@/hooks";

import { useQueryClient } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const RESEND_SECONDS = 30;

function VerifyAccountForm() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);

  const { mutate: verify, isPending: isVerifying, error: verifyError, reset: resetVerify } =
    useVerification();
  const { mutate: resend, isPending: isResending, error: resendError } =
    useResendOtp();

  // Resend countdown: ek second por por kome, 0 te ese thame jabe
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || otp.length < 6 || isVerifying) return;

    verify(
      { email, otp },
      {
        onSuccess: async () => {
          // useGetMe er cache refresh, jate navbar/protected route notun user dekhe
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          router.push("/");
          router.refresh();
        },
        onError: () => setOtp(""),
      }
    );
  };

  const handleResend = () => {
    if (!email) return;
    setOtp("");
    resetVerify(); // purano verify error muche dey
    resend(
      { email },
      { onSuccess: () => setCountdown(RESEND_SECONDS) }
    );
  };

  const errorMessage = verifyError?.message || resendError?.message;

  return (
    <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
            <Mail size={28} strokeWidth={1.6} />
          </div>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Verify your account
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the 6-digit code we sent to
            <span className="block font-medium text-slate-800">
              {email ?? "your email"}
            </span>
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
            disabled={isVerifying}
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

          {errorMessage && (
            <p className="mt-3 text-center text-sm text-red-500">
              {errorMessage}
            </p>
          )}
        </form>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <Button
            type="submit"
            form="otp-form"
            disabled={!email || otp.length < 6 || isVerifying}
            className="h-11 w-full"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleResend}
            disabled={countdown > 0 || !email || isResending || isVerifying}
            className="h-11 w-full text-slate-600"
          >
            {isResending
              ? "Sending..."
              : countdown > 0
                ? `Resend code in ${countdown}s`
                : "Resend code"}
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

export default function VerifyAccount() {
  return (
    <Suspense fallback={null}>
      <VerifyAccountForm />
    </Suspense>
  );
}