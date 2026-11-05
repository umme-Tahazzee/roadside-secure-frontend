import { FetchError, ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const http = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include", // the browser stores and sends the auth cookies
});

// calls that must never trigger a refresh (they are how a session starts or ends)
const NO_REFRESH = [
  "/auth/login",
  "/auth/register",
  "/auth/google",
  "/auth/logout",
  "/auth/verify-email",
  "/auth/resend-otp",
  "/auth/refresh-token",
];

// many requests can fail at once; they all wait for one refresh
let refreshing: Promise<unknown> | null = null;

function refreshSession() {
  refreshing ??= http("/auth/refresh-token", { method: "POST" }).finally(() => {
    refreshing = null;
  });
  return refreshing;
}

// Same call shape as ofetch. If the 15-minute access token ran out, the session is
// refreshed once and the original call is repeated, so a user is not logged out mid-job.
const apiClient = (async (request: string, options?: object) => {
  try {
    return await http(request as never, options as never);
  } catch (error) {
    const expired =
      error instanceof FetchError &&
      error.status === 401 &&
      typeof request === "string" &&
      !NO_REFRESH.some((path) => request.startsWith(path));

    if (!expired) throw error;

    await refreshSession(); // throws the 401 again if the refresh token is gone too
    return http(request as never, options as never);
  }
}) as typeof http;

export default apiClient;
