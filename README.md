# RoadRescue Frontend

Web client for the RoadRescue roadside assistance platform. Customers request help, mechanics accept and complete jobs, and admins approve mechanics and manage users.

This app talks to the [RoadRescue backend](https://github.com/umme-Tahazzee/roadrescue-backend) (Express + Prisma). Read the backend README for the full API reference.

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling / UI | Tailwind CSS, shadcn/ui |
| HTTP client | ofetch |
| Server state | TanStack Query v5 |
| Forms / validation | Tankstack Form, Zod, `@hookform/resolvers` |
| Toasts | Sonner |

## Getting Started

### Prerequisites

- Node.js 20+
- The backend running locally (or a deployed backend URL)

### Installation

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

Open http://localhost:3000.

### Environment variables

```env
# Where the Next.js server forwards API calls (backend origin, no trailing slash)
BACKEND_URL=http://localhost:5000

# Path the browser calls. Keep as /api/v1 to use the proxy below
NEXT_PUBLIC_API_URL=/api/v1
```

On the backend, set `FRONTEND_URL` to this app's origin (for local development, `http://localhost:3000`).

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint |

## How the API connection works

### Same-origin proxy

`next.config.ts` rewrites `/api/v1/*` to `${BACKEND_URL}/api/v1/*`. The browser only ever talks to the frontend origin, so:

- the backend's httpOnly auth cookies are stored for the frontend origin
- there are no cross-site cookie or CORS problems in development or production

If you remove the proxy and call the backend directly, the backend must have `FRONTEND_URL` set to this origin, and in production cross-site cookies (`secure` + `sameSite=none`) may be blocked by some browsers.

### Auth flow

Authentication uses httpOnly cookies set by the backend (`accessToken` 15 min, `refreshToken` 7 days). The frontend never reads or stores tokens.

1. `POST /auth/login` sets the cookies. The login response does not include the user, so the app then calls `GET /auth/me` and caches the result.
2. Any request that returns 401 triggers one `POST /auth/refresh-token` call (shared across concurrent requests), then the original request is retried once. If the refresh fails, the user is treated as logged out.
3. `RequireRole` guards each role area and redirects to `/login`, or to the user's own dashboard when the role does not match.
4. Registration is two steps: `POST /auth/register` emails a 6-digit OTP, then `POST /auth/verify-email`. Verification does not set cookies, so send the user to `/login` afterwards.

### Response and error shape

The backend wraps every response as `{ success, statusCode, message, data, meta? }`. The API client unwraps `data` so hooks receive the payload directly. Failures throw an `ApiError` with `status`, `message` and optional `details` (Zod field errors).

### No realtime yet

The backend has no working Socket.io, so live updates use polling. Hooks for active requests and pending jobs use `refetchInterval` (about 8 seconds). Replace polling with sockets when the backend supports them.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Wraps the app in <Providers>
│   ├── providers.tsx         # QueryClient, Toaster, Devtools
│   ├── login/page.tsx
│   ├── customer/             # layout guarded by RequireRole(["CUSTOMER"])
│   ├── mechanic/             # layout guarded by RequireRole(["MECHANIC"])
│   └── admin/                # layout guarded by RequireRole(["ADMIN"])
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── require-role.tsx      # Client-side role guard
├── hooks/
│   ├── use-auth.ts
│   ├── use-customer.ts
│   ├── use-mechanic.ts
│   └── use-admin.ts
├── lib/
│   ├── api.ts                # ofetch client, auto-refresh, ApiError
│   ├── query-keys.ts         # All query keys in one place
│   └── constants.ts          # ROLE_HOME, SERVICE_TYPES, ACTIVE_STATUSES
└── types/
    └── api.ts                # Shared API types
```

## Data layer conventions

- **Never call `fetch`/`ofetch` in components.** Use a hook from `src/hooks`. Components only render state.
- **Reads** use `useQuery` with a key from `qk` in `lib/query-keys.ts`.
- **Writes** use `useMutation` and invalidate the related keys in `onSuccess`.
- **Errors from mutations** are toasted automatically by the default `onError` in `providers.tsx`. Only add a local `onError` for special handling.
- **FormData uploads** (mechanic documents) are passed straight to `api.post`; do not set `Content-Type` manually.

### Adding a new endpoint

1. Add or update the type in `src/types/api.ts`.
2. Add a key to `qk` if it is a query.
3. Add a hook in the matching `src/hooks/use-*.ts` file:

```ts
export const useMyThing = (id: string) =>
  useQuery({
    queryKey: qk.myThing(id),
    queryFn: () => api.get<MyThing>(`/things/${id}`),
  });
```

## Roles and screens

| Role | Area | Planned screens |
|---|---|---|
| Customer | `/customer` | Request help (with browser geolocation), active request tracker, history, nearby mechanics, profile |
| Mechanic | `/mechanic` | Onboarding (document upload), online toggle and location, pending jobs, active job (start, complete with price and payment method), cash confirmation |
| Admin | `/admin` | Dashboard stats, mechanic approval, users (block/unblock), all requests |

## Status

**Done**
- [x] Project setup, shadcn/ui, API proxy
- [x] ofetch client with automatic token refresh
- [x] TanStack Query provider, query keys, shared types
- [x] Hooks for auth, customer, mechanic and admin endpoints
- [x] `RequireRole` guard
- [x] Login page

**Planned**
- [ ] Register and OTP verification page
- [ ] Forgot / reset password pages
- [ ] Customer pages
- [ ] Mechanic pages
- [ ] Admin pages
- [ ] Payment UI (bKash and refunds)
- [ ] Reviews
- [ ] Google Sign-In
- [ ] Realtime updates (replace polling)

## Backend dependencies and limitations

Some screens are blocked or limited by the current backend:

- **Payments:** `PaymentRoutes` is not mounted in the backend, so `/payments/*` returns 404. Cash confirmation works through `PATCH /requests/payments/:id/confirm-cash`. bKash is a mock that returns a fake checkout URL.
- **Mechanic active job:** there is no endpoint to list a mechanic's accepted jobs or fetch a single request, so a proper active-job screen needs a backend endpoint (for example `GET /requests/my-jobs`).
- **Completing a job:** always use `PATCH /requests/:id/complete`. Sending `COMPLETED` to `/status` skips payment creation.
- **`EN_ROUTE` status** exists but has no endpoint, so the UI never shows it as a reachable step.
- **Reviews:** no backend endpoints yet.
- **Service types** are free text on the backend and must match exactly between customer requests and mechanic profiles. `SERVICE_TYPES` in `lib/constants.ts` must match the values your backend and mechanics use.

## Deployment

Deploy to Vercel (or any Node host). Set `BACKEND_URL` to the deployed backend origin and keep `NEXT_PUBLIC_API_URL=/api/v1`. On the backend, set `NODE_ENV=production` and `FRONTEND_URL` to the deployed frontend origin.