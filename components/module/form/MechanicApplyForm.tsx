"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { mechanicSchema } from "@/validation";
import { useForm } from "@tanstack/react-form-nextjs";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DOC_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

type MechanicValues = z.infer<typeof mechanicSchema>;

const defaultValues: MechanicValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  serviceTypes: "",
  serviceRadius: 10,
  nidDoc: null as unknown as File,
  licenseDoc: null as unknown as File,
  vehiclePhoto: null as unknown as File,
};

export default function MechanicApplyForm() {
  const [showPassword, setShowPassword] = useState(false);
  //   const { mutate: register, isPending } = useMechanicRegistration();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: mechanicSchema,
    },

    onSubmit: ({ value }) => {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("password", value.password);
      formData.append("confirmPassword", value.confirmPassword);
      formData.append("role", "MECHANIC");
      formData.append("serviceTypes", value.serviceTypes);
      formData.append("serviceRadius", String(value.serviceRadius));
      formData.append("nidDoc", value.nidDoc);
      formData.append("licenseDoc", value.licenseDoc);
      formData.append("vehiclePhoto", value.vehiclePhoto);
    },
  });

  return (
    <div className="mx-auto w-full  space-y-8 p-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Register as a mechanic
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your account and upload your documents. An admin reviews them
          before you go online.
        </p>
      </header>

      <form
        className="grid gap-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Account */}
        <section className="grid gap-4">
          <h2 className="text-lg font-medium">Account</h2>
         <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {(["password", "confirmPassword"] as const).map((fieldName) => (
              <form.Field key={fieldName} name={fieldName}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        {fieldName === "password"
                          ? "Password"
                          : "Confirm password"}
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
                          autoComplete="new-password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
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
                      {fieldName === "password" && !isInvalid}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            ))}
          </FieldGroup>
        </section>

        {/* Services */}
        <section className="grid gap-4">
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field name="serviceTypes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Services you provide
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="e.g. Towing, Tyre change, Battery jump start"
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="serviceRadius">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Service radius (km)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      step="any"
                      min={1}
                      value={
                        Number.isNaN(field.state.value) ? "" : field.state.value
                      }
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber)
                      }
                      aria-invalid={isInvalid}
                    />
                    {!isInvalid && (
                      <p className="text-xs text-muted-foreground">
                        You only see requests within this distance from your
                        location.
                      </p>
                    )}
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </section>

        {/* Documents */}
        <section className="grid gap-4">
         <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                {
                  name: "nidDoc",
                  label: "National ID (NID)",
                  accept: DOC_TYPES,
                  hint: "JPG, PNG, WEBP or PDF, up to 5 MB.",
                },
                {
                  name: "licenseDoc",
                  label: "Driving license",
                  accept: DOC_TYPES,
                  hint: "JPG, PNG, WEBP or PDF, up to 5 MB.",
                },
                {
                  name: "vehiclePhoto",
                  label: "Vehicle photo",
                  accept: PHOTO_TYPES,
                  hint: "A clear photo of your vehicle. JPG, PNG or WEBP, up to 5 MB.",
                },
              ] as const
            ).map((f) => (
              <form.Field key={f.name} name={f.name}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>{f.label}</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept={f.accept.join(",")}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.files?.[0] as File)
                        }
                        aria-invalid={isInvalid}
                      />
                      {!isInvalid && (
                        <p className="text-xs text-muted-foreground">
                          {f.hint}
                        </p>
                      )}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            ))}
          </FieldGroup>
        </section>

        <Button size="lg" type="submit">
          Submit application
        </Button>
      </form>
    </div>
  );
}
