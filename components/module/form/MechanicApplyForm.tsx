"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatFileSize } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/FormSection";
import { mechanicSchema } from "@/validation";
import { useForm } from "@tanstack/react-form-nextjs";
import {
  Eye,
  EyeOff,
  FileText,
  Loader2,
  MapPin,
  Plus,
  ShieldCheck,
  UploadCloud,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { documents, SERVICE_SUGGESTIONS } from "./constants";

type MechanicValues = z.infer<typeof mechanicSchema>;

const defaultValues: MechanicValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  serviceTypes: [],
  serviceRadius: 10,
  nidDoc: null as unknown as File,
  licenseDoc: null as unknown as File,
  vehiclePhoto: null as unknown as File,
};

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function FileDropzone({
  id,
  name,
  accept,
  value,
  invalid,
  hint,
  onChange,
  onBlur,
}: {
  id: string;
  name: string;
  accept: string[];
  value: File | null | undefined;
  invalid: boolean;
  hint: string;
  onChange: (file: File) => void;
  onBlur: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const file = value instanceof File ? value : null;
  const isImage = !!file && file.type.startsWith("image/");

  const previewUrl = useMemo(
    () => (file && isImage ? URL.createObjectURL(file) : null),
    [file, isImage],
  );
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const pick = (files: FileList | null) => {
    const next = files?.[0];
    if (!next) return;
    if (!accept.includes(next.type)) return; // schema shows the proper error on submit
    onChange(next);
  };

  const remove = () => {
    if (inputRef.current) inputRef.current.value = "";
    onChange(null as unknown as File);
    onBlur();
  };

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept.join(",")}
        className="sr-only"
        onChange={(e) => pick(e.target.files)}
        onBlur={onBlur}
        aria-invalid={invalid}
      />

      {file ? (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={previewUrl}
              alt=""
              className="size-12 shrink-0 rounded-md border object-cover"
            />
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
              <FileText className="size-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={remove}
              aria-label={`Remove ${file.name}`}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed px-4 py-6 text-center transition-colors",
            "hover:border-primary/60 hover:bg-muted/50",
            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
            dragging && "border-primary bg-primary/5",
            invalid && "border-destructive bg-destructive/5",
          )}
        >
          <UploadCloud
            className={cn(
              "size-6",
              invalid ? "text-destructive" : "text-muted-foreground",
            )}
          />
          <span className="text-sm font-medium">
            <span className="text-primary">Click to upload</span> or drag and
            drop
          </span>
          <span className="text-xs text-muted-foreground">{hint}</span>
        </label>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                      */
/* -------------------------------------------------------------------------- */

export default function MechanicApplyForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serviceDraft, setServiceDraft] = useState("");
  const serviceInputRef = useRef<HTMLInputElement>(null);
  //   const { mutateAsync: register } = useMechanicRegistration();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: mechanicSchema,
    },

    // Make this async and `await register(formData)` so the button spinner works.
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("password", value.password);
      formData.append("confirmPassword", value.confirmPassword);
      formData.append("role", "MECHANIC");
      formData.append("serviceTypes", JSON.stringify(value.serviceTypes));
      formData.append("serviceRadius", String(value.serviceRadius));
      formData.append("nidDoc", value.nidDoc);
      formData.append("licenseDoc", value.licenseDoc);
      formData.append("vehiclePhoto", value.vehiclePhoto);
      // await register(formData);
    },
  });

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:py-12">
      <header className="space-y-2">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Wrench className="size-5" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Become a mechanic partner
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          Create your account, tell us what you offer, and upload your
          documents. Our team reviews every application before you go online.
        </p>
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
        {/* Account */}
        <Section
          icon={UserRound}
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
                            showPassword ? "Hide passwords" : "Show passwords"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {fieldName === "password"}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            ))}
          </FieldGroup>
        </Section>

        {/* Services */}
        <Section
          icon={MapPin}
          title="Services and coverage"
          description="Add every service you offer and how far you can travel."
        >
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="serviceTypes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const services = field.state.value;

                const addService = (raw: string) => {
                  const value = raw.trim();
                  if (!value) return;
                  const exists = services.some(
                    (s) => s.toLowerCase() === value.toLowerCase(),
                  );
                  if (!exists) field.handleChange([...services, value]);
                  setServiceDraft("");
                };

                const removeService = (service: string) => {
                  field.handleChange(services.filter((s) => s !== service));
                };

                const suggestions = SERVICE_SUGGESTIONS.filter(
                  (s) =>
                    !services.some((x) => x.toLowerCase() === s.toLowerCase()),
                );

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel htmlFor={field.name}>
                      Services you provide
                    </FieldLabel>

                    {/* Chips live inside the input box */}
                    {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
                    <div
                      role="presentation"
                      onClick={() => serviceInputRef.current?.focus()}
                      className={cn(
                        "flex min-h-10 w-full cursor-text flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-2 text-sm shadow-xs transition-shadow",
                        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/30",
                        isInvalid &&
                          "border-destructive focus-within:ring-destructive/20",
                      )}
                    >
                      {services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 rounded-md bg-primary/10 py-0.5 pl-2 pr-1 text-sm font-medium text-primary"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeService(service);
                            }}
                            aria-label={`Remove ${service}`}
                            className="rounded p-0.5 transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        ref={serviceInputRef}
                        id={field.name}
                        name={field.name}
                        value={serviceDraft}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v.endsWith(",")) addService(v.slice(0, -1));
                          else setServiceDraft(v);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // don't submit the form
                            addService(serviceDraft);
                          }
                          if (
                            e.key === "Backspace" &&
                            !serviceDraft &&
                            services.length
                          ) {
                            removeService(services[services.length - 1]);
                          }
                        }}
                        onBlur={() => {
                          addService(serviceDraft);
                          field.handleBlur();
                        }}
                        aria-invalid={isInvalid}
                        placeholder={
                          services.length
                            ? "Add another..."
                            : "Type a service and press Enter"
                        }
                        autoComplete="off"
                        className="min-w-[10rem] flex-1 bg-transparent py-0.5 outline-none placeholder:text-muted-foreground"
                      />
                    </div>

                    {suggestions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-xs text-muted-foreground">
                          Quick add:
                        </span>
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => addService(s)}
                            className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <Plus className="size-3" />
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

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
                    <FieldLabel htmlFor={field.name}>Service radius</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        inputMode="decimal"
                        step="any"
                        min={1}
                        value={
                          Number.isNaN(field.state.value)
                            ? ""
                            : field.state.value
                        }
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.valueAsNumber)
                        }
                        aria-invalid={isInvalid}
                        className="pr-12"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        km
                      </span>
                    </div>
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
        </Section>

        {/* Documents */}
        <Section
          icon={ShieldCheck}
          title="Verification documents"
          description="Used only to verify your identity. Clear, uncropped photos get approved faster."
        >
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {documents.map((f) => (
              <form.Field key={f.name} name={f.name}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      data-invalid={isInvalid}
                      className={
                        f.name === "vehiclePhoto" ? "sm:col-span-2" : undefined
                      }
                    >
                      <FieldLabel htmlFor={field.name}>{f.label}</FieldLabel>
                      <FileDropzone
                        id={field.name}
                        name={field.name}
                        accept={[...f.accept]}
                        value={field.state.value as File | null}
                        invalid={isInvalid}
                        hint={f.hint}
                        onChange={(file) => field.handleChange(file)}
                        onBlur={field.handleBlur}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            ))}
          </FieldGroup>
        </Section>

        {/* Submit */}
        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground sm:max-w-sm">
            By submitting, you confirm that the information and documents you
            provided are accurate.
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
                    <Loader2 className="size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit application"
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
