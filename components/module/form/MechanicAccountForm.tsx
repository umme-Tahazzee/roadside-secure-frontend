"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { z } from "zod";

import { ApplySteps } from "@/components/module/mechanic/ApplySteps";
import { Section } from "@/components/shared/FormSection";
import * as Icons from "@/components/shared/icons";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useRegistration } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { mechanicAccountSchema } from "@/validation";

type AccountValues = z.input<typeof mechanicAccountSchema>;

const defaultValues: AccountValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// After the OTP is verified the user continues to the documents step
const AFTER_VERIFY_PATH = "/apply/profile";

export default function MechanicAccountForm() {
  const router = useRouter();
  const { mutateAsync: register } = useRegistration();

  const form = useForm({
    defaultValues,
    validators: { onSubmit: mechanicAccountSchema },
    onSubmit: async ({ value }) => {
      try {
        const res = await register({ ...value, role: "MECHANIC" });
        if (!res.success) throw new Error(res.message);

        toast.add({
          title: "Verification code sent",
          description: `Check ${value.email} for your 6-digit code.`,
          type: "success",
        });
        const params = new URLSearchParams({
          email: value.email,
          next: AFTER_VERIFY_PATH,
        });
        router.push(`/register/verify-account?${params.toString()}`);
      } catch (error) {
        toast.add({
          title: "Registration failed",
          description: getErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <div className="mx-auto w-full space-y-6">
      <header className="space-y-4">
        <ApplySteps current={1} />
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Icons.Wrench className="size-5" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Become a mechanic partner
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account first. You will upload your documents after
            verifying your email.
          </p>
        </div>
      </header>

      <form
        className="grid gap-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Section
          icon={Icons.UserRound}
          title="Your account"
          description="You will use these details to sign in."
        >
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="name"
                      placeholder="e.g. Rahim Uddin"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm password
                    </FieldLabel>
                    <PasswordInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </Section>

        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground sm:max-w-sm">
            Just want to book help?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Create a customer account
            </Link>
            .
          </p>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="sm:min-w-48"
              >
                {isSubmitting ? (
                  <>
                    <Spinner /> Creating account
                  </>
                ) : (
                  <>
                    Continue <Icons.ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
