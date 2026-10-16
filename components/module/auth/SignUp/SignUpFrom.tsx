"use client";

// biome-ignore assist/source/organizeImports: <explanation>
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { useForm } from "@tanstack/react-form-nextjs";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import GoogleLoginComponent from "../GoogleLoginComponent";
import { registerCustomerValidationSchema } from "@/validation";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import z, { email } from "zod";
import { useRegistration } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { RegistationPayload } from "@/types";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: signup, isPending: signupPending } = useRegistration();
  const router = useRouter();

  type UserDefaultValue = z.infer<typeof registerCustomerValidationSchema>;
  const defaultValues: UserDefaultValue = {
    name: "karia",
    email: "random.canvas4@gmail.com",
    password: "Qazmlp123",
    confirmPassword: "Qazmlp123",
    phone: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: registerCustomerValidationSchema,
    },

    onSubmit: ({ value }) => {
      const registrationData: RegistationPayload = {
        name: value.name,
        email: value.email,
        password: value.password,
        confirmPassword: value.confirmPassword,
        phone: value.phone,
      };

      signup(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server failed",
              description: "Something went wrong",
              type: "error",
            });
          }
          toast.add({
            title: "Registration Successful",
            description: "Please verify your account",
            type: "success",
          });
          const params = new URLSearchParams({
            email : registrationData.email
          })
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: () => {
          toast.add({
            title: "Registration failed",
            description: "Something went wrong",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Sign up with your Apple or Google account
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
                      placeholder="Enter Your Name"
                      autoComplete="off"
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
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter Your Email Address"
                      autoComplete="off"
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
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>

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
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter Your Password"
                        autoComplete="off"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>

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
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter Your Password"
                        autoComplete="off"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

           <Field>
                <Button size="lg" type="submit" disabled={signupPending}>
                  {signupPending ? (
                    <>
                      {" "}
                      <Spinner /> Submitting{" "}
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </div>
  );
}
