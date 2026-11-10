// Only allow in-app paths, so a crafted ?next= can't send users to another site
export function safeNextPath(next: string | null | undefined, fallback = "/") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

// Each role's own dashboard
export function dashboardForRole(role: string | null | undefined) {
  if (role === "ADMIN") return "/admin";
  if (role === "MECHANIC") return "/mechanic";
  return "/customer";
}
