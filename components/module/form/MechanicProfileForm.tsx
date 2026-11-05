"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { z } from "zod";

import { ApplicationStatus } from "@/components/module/mechanic/ApplicationStatus";
import { ApplySteps } from "@/components/module/mechanic/ApplySteps";
import { FileDropZone } from "@/components/shared/FileDropZone";
import { Section } from "@/components/shared/FormSection";
import * as Icons from "@/components/shared/icons";
import { MultiFileDropZone } from "@/components/shared/MultiFileDropZone";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useApplyMechanic, useGetMe, useMyMechanicProfile } from "@/hooks";
import { getErrorMessage, getErrorStatus } from "@/lib/error";
import { cn } from "@/lib/utils";
import {
  MAX_VEHICLE_PHOTOS,
  mechanicProfileSchema,
  PHOTO_TYPES,
} from "@/validation";
import { documents, SERVICE_OPTIONS } from "./constants";

type ProfileValues = z.input<typeof mechanicProfileSchema>;

const defaultValues: ProfileValues = {
  serviceTypes: [],
  serviceRadius: 10,
  nidDoc: null as unknown as File,
  licenseDoc: null as unknown as File,
  vehiclePhotos: [],
};

const LOGIN_PATH = "/login?next=/apply/profile";

function PageSpinner() {
  return (
    <div className="flex min-h-64 items-center justify-center text-muted-foreground">
      <Spinner className="size-6" />
    </div>
  );
}

export default function MechanicProfileForm() {
  const router = useRouter();
  const { data: me, error: meError, isPending: meLoading } = useGetMe();
  const isMechanic = me?.data.role === "MECHANIC";
  const { data: profile, isPending: profileLoading } =
    useMyMechanicProfile(isMechanic);

  // Not signed in (for example the OTP step did not start a session): go to login
  useEffect(() => {
    if (getErrorStatus(meError) === 401) router.replace(LOGIN_PATH);
  }, [meError, router]);

  if (meLoading || (isMechanic && profileLoading)) return <PageSpinner />;

  if (meError) {
    return getErrorStatus(meError) === 401 ? (
      <PageSpinner />
    ) : (
      <p className="text-sm text-destructive">{getErrorMessage(meError)}</p>
    );
  }

  if (!isMechanic) {
    return (
      <div className="space-y-3 text-center">
        <h1 className="text-xl font-semibold">Mechanic account required</h1>
        <p className="text-sm text-muted-foreground">
          You are signed in with a customer account. Register a new mechanic
          account to apply.
        </p>
        <Link href="/apply" className={buttonVariants({ variant: "outline" })}>
          Register as a mechanic
        </Link>
      </div>
    );
  }

  // Already applied: show where the application stands instead of the form
  if (profile?.data) return <ApplicationStatus status={profile.data.status} />;

  return <ProfileForm />;
}

function ProfileForm() {
  const { mutateAsync: apply } = useApplyMechanic();

  const form = useForm({
    defaultValues,
    validators: { onSubmit: mechanicProfileSchema },
    onSubmit: async ({ value }) => {
      try {
        await apply(value);
        toast.add({
          title: "Application submitted",
          description: "We will review your documents shortly.",
          type: "success",
        });
      } catch (error) {
        toast.add({
          title: "Could not submit application",
          description: getErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <div className="mx-auto w-full space-y-6">
      <header className="space-y-4">
        <div className="space-y-2 flex gap-2 mb-5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icons.Wrench className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Complete your application
            </h1>
          </div>
        </div>

        <ApplySteps current={3} />
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
        {/* Services */}
        <Section
          icon={Icons.MapPin}
          title="Services and coverage"
          description="Pick every service you offer and how far you can travel."
        >
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="serviceTypes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const selected = field.state.value;

                const toggle = (value: string) => {
                  field.handleChange(
                    selected.includes(value)
                      ? selected.filter((s) => s !== value)
                      : [...selected, value],
                  );
                };

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldSet>
                      <FieldLegend variant="label" className="mb-2">
                        Services you provide
                      </FieldLegend>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_OPTIONS.map(({ value, label }) => {
                          const active = selected.includes(value);
                          return (
                            <button
                              key={value}
                              type="button"
                              aria-pressed={active}
                              onClick={() => toggle(value)}
                              onBlur={field.handleBlur}
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                active
                                  ? "border-primary bg-primary/10 font-medium text-primary"
                                  : "text-muted-foreground hover:border-primary/60 hover:text-foreground",
                              )}
                            >
                              {active && (
                                <Icons.CheckCircle2 className="size-3.5" />
                              )}
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </FieldSet>
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
          icon={Icons.ShieldCheck}
          title="Verification documents"
          description="Used only to verify your identity. Clear, uncropped photos get approved faster."
        >
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {documents.map((doc) => (
              <form.Field key={doc.name} name={doc.name}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>{doc.label}</FieldLabel>
                      <FileDropZone
                        id={field.name}
                        name={field.name}
                        accept={[...doc.accept]}
                        value={field.state.value as File | null}
                        invalid={isInvalid}
                        hint={doc.hint}
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

            <form.Field name="vehiclePhotos">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel htmlFor={field.name}>Vehicle photos</FieldLabel>
                    <MultiFileDropZone
                      id={field.name}
                      name={field.name}
                      accept={PHOTO_TYPES}
                      value={field.state.value}
                      invalid={isInvalid}
                      hint={`PNG, JPG or WEBP, up to ${MAX_VEHICLE_PHOTOS} photos`}
                      maxFiles={MAX_VEHICLE_PHOTOS}
                      onChange={(files) => field.handleChange(files)}
                      onBlur={field.handleBlur}
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
                    <Spinner /> Submitting
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
