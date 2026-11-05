import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------
// 1. SETTINGS
// ---------------------------------------------------------------

type Role = "ADMIN" | "MECHANIC" | "CUSTOMER";

// Each role's own dashboard
const HOME_PAGE: Record<Role, string> = {
  ADMIN: "/admin",
  MECHANIC: "/mechanic",
  CUSTOMER: "/customer",
};

// Which folder can be opened by which role
const ALLOWED_ROLE: Record<string, Role> = {
  "/admin": "ADMIN",
  "/mechanic": "MECHANIC",
  "/customer": "CUSTOMER",
};

// Pages a logged-in user should NOT see
const AUTH_PAGES = ["/login", "/register"];

// API route that gives us a new access token
const REFRESH_URL = "/api/v1/auth/refresh-token";

type User = { role: Role; exp: number };

type RefreshResult = {
  user: User | null; // user info from the new access token
  accessToken: string | undefined; // the new access token
  setCookies: string[]; // cookies to send back to the browser
};

// ---------------------------------------------------------------
// 2. HELPER FUNCTIONS
// ---------------------------------------------------------------

// Read the role from the token (NO signature check, only for routing)
function getUserFromToken(token: string | undefined): User | null {
  if (!token) return null;

  try {
    // token = header.payload.signature  -> we need the middle part
    const payload = token.split(".")[1];

    // base64url -> normal base64, then decode to a JSON string
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonText = atob(base64);
    const data = JSON.parse(jsonText);


    const role = data.role;
    const exp = data.exp; // expiry time in seconds

    // role must be one of ADMIN / MECHANIC / CUSTOMER
    if (!role || !(role in HOME_PAGE)) return null;

    // expired? (10 sec buffer so it does not expire mid-request)
    const expiryInMs = exp * 1000;
    const isExpired = typeof exp === "number" && expiryInMs < Date.now() + 10_000;
    if (isExpired) return null;

    return { role, exp: exp ?? 0 };
  } catch {
    // broken token -> treat as not logged in
    return null;
  }
}

// Use the refresh token to get a new access token
async function refreshTokens(request: NextRequest): Promise<RefreshResult | null> {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) return null;

  try {
    const response = await fetch(new URL(REFRESH_URL, request.nextUrl.origin), {
      method: "POST",
      headers: { cookie: `refreshToken=${refreshToken}` },
      cache: "no-store",
    });
    if (!response.ok) return null;

    // the API sends new cookies, find the accessToken one
    const setCookies = response.headers.getSetCookie();
    const accessCookie = setCookies.find((c) => c.startsWith("accessToken="));

    // "accessToken=abc123; Path=/; HttpOnly"  ->  "abc123"
    const accessToken = accessCookie?.split(";")[0].replace("accessToken=", "");

    return { user: getUserFromToken(accessToken), accessToken, setCookies };
  } catch {
    return null;
  }
}

// Which protected folder is this path in? (e.g. "/admin/users" -> "/admin")
function findProtectedPrefix(pathname: string): string | undefined {
  return Object.keys(ALLOWED_ROLE).find(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
}

// ---------------------------------------------------------------
// 3. MAIN FUNCTION (runs before every matched page)
// ---------------------------------------------------------------

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const protectedPrefix = findProtectedPrefix(pathname);
  const isAuthPage = AUTH_PAGES.includes(pathname);

  // STEP 1: Is the user logged in? Check the access token cookie.
  let user = getUserFromToken(request.cookies.get("accessToken")?.value);
  let refreshResult: RefreshResult | null = null;

  // STEP 2: No valid access token? Try the refresh token.
  if (!user) {
    refreshResult = await refreshTokens(request);
    user = refreshResult?.user ?? null;
  }

  // Redirect helper. Also attaches the new cookies if we refreshed.
  function redirectTo(path: string) {
    const response = NextResponse.redirect(new URL(path, request.url));
    for (const cookie of refreshResult?.setCookies ?? []) {
      response.headers.append("set-cookie", cookie);
    }
    return response;
  }

  // STEP 3: Protected page (/admin, /mechanic, /customer)
  if (protectedPrefix) {
    // not logged in -> go to login, remember where they wanted to go
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname + search);
      return NextResponse.redirect(loginUrl);
    }

    // logged in but wrong role -> send to their own dashboard
    if (ALLOWED_ROLE[protectedPrefix] !== user.role) {
      return redirectTo(HOME_PAGE[user.role]);
    }
  }

  // STEP 4: Login/register page but already logged in -> go to dashboard
  if (isAuthPage && user) {
    return redirectTo(HOME_PAGE[user.role]);
  }

  // STEP 5: Everything is fine, let the request continue.
  // If we refreshed, put the NEW access token into the request too,
  // otherwise the page's own API calls would still use the old/expired one.
  if (refreshResult?.accessToken) {
    const otherCookies = request.cookies
      .getAll()
      .filter((c) => c.name !== "accessToken")
      .map((c) => `${c.name}=${c.value}`);

    const allCookies = [...otherCookies, `accessToken=${refreshResult.accessToken}`];

    const headers = new Headers(request.headers);
    headers.set("cookie", allCookies.join("; "));

    const response = NextResponse.next({ request: { headers } });
    for (const cookie of refreshResult.setCookies) {
      response.headers.append("set-cookie", cookie);
    }
    return response;
  }

  return NextResponse.next();
}

// Only run this proxy on these paths
export const config = {
  matcher: [
    "/admin/:path*",
    "/mechanic/:path*",
    "/customer/:path*",
    "/login",
    "/register",
  ],
};