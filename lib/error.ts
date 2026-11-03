import { FetchError } from "ofetch";

interface ApiErrorBody {
  message?: string;
  errorDetails?: { path: string; message: string }[];
}

// Pulls the most useful message out of an API error (ofetch FetchError)
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
) {
  if (error instanceof FetchError) {
    const body = error.data as ApiErrorBody | undefined;
    const detail = body?.errorDetails?.[0]?.message;
    return (
      detail ??
      body?.message ??
      (error.status ? fallback : "Network error. Check your connection.")
    );
  }
  return error instanceof Error ? error.message : fallback;
}

export function getErrorStatus(error: unknown) {
  return error instanceof FetchError ? error.status : undefined;
}
