"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import type { z } from "zod";

import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useRegistration } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { cn } from "@/lib/utils";
import { registerCustomerValidationSchema } from "@/validation";
import GoogleLoginComponent from "./GoogleLoginComponent";

type UserDefaultValue = z.infer<typeof registerCustomerValidationSchema>;

const defaultValues: UserDefaultValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutateAsync: signup } = useRegistration();

  const form = useForm({
    defaultValues,
    validators: { onSubmit: registerCustomerValidationSchema },
    onSubmit: async ({ value }) => {
      try {
        const res = await signup({ ...value, role: "CUSTOMER" });
        if (!res.success) throw new Error(res.message);

        toast.add({
          title: "Registration successful",
          description: "Please verify your account",
          type: "success",
        });
        const params = new URLSearchParams({ email: value.email });
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Sign up with your Google account or email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="mb-6">
          <GoogleLoginComponent />
        </FieldGroup>

        <FieldSeparator className="*:data-[slot=field-separator-content]">
          Or continue with
        </FieldSeparator>

        <form
          className="mt-4"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your name"
                      autoComplete="name"
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
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                    <PhoneInput
                      id={field.name}
                      name={field.name}
                      flags={flags}
                      defaultCountry="BD"
                      international
                      countryCallingCodeEditable={false}
                      inputComponent={Input}
                      value={
                        field.state.value?.startsWith("+")
                          ? field.state.value
                          : undefined
                      }
                      onChange={(value) => field.handleChange(value ?? "")}
                      onBlur={field.handleBlur}
                      placeholder="Enter phone number"
                      className="phone-input"
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
                      placeholder="Enter your password"
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
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <Field>
              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <Button size="lg" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner /> Submitting
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </Field>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Log in
              </Link>
              <br />
              Are you a mechanic?{" "}
              <Link
                href="/apply"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Apply as a partner
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </div>
  );
}
