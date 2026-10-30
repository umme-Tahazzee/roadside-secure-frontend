# RoadRescue Frontend

Web client for the RoadRescue roadside assistance platform. Customers request help, mechanics apply and accept jobs, and admins approve mechanics.

It talks to the [RoadRescue backend](https://github.com/umme-Tahazzee/roadrescue-backend) (Express + Prisma).

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling / UI | Tailwind CSS, shadcn/ui (`components/ui`) |
| HTTP client | ofetch (`lib/apiClient.ts`) |
| Server state | TanStack Query |
| Client state | Zustand |
| Forms / validation | TanStack Form, Zod |
| Auth | Email + OTP, Google Sign-In (`@react-oauth/google`) |
| Lint / format | Biome |

## Getting Started

**Prerequisites:** Node.js 20+ (or Bun) and the backend running locally.

```bash
npm install                 # or: bun install
cp .env.example .env.local  # then fill in the values below
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL, e.g. `http://localhost:5000/api/v1` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for SEO metadata (optional) |

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (static export to `out/`) |
| `npm start` | Run the production build |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |

## Project Structure

```
.
├── app/                         # Pages and routes only (Next.js App Router)
│   ├── layout.tsx               # Root layout, wraps the app in <Providers>
│   ├── error.tsx  loading.tsx  not-found.tsx
│   ├── globals.css
│   └── (public)/
│       ├── (marketing)/         # Home, about-us, privacy, terms (shares Header/Footer layout)
│       └── (auth)/              # login, register, register/verify-account, apply (mechanic)
│
├── components/
│   ├── ui/                      # shadcn/ui primitives (button, input, card...)
│   ├── layout/                  # Header, Footer, nav data
│   ├── shared/                  # Small reusable pieces (Logo, SectionTitle, Eyebrow, FormSection)
│   ├── legal/                   # Privacy / Terms page layout
│   └── module/                  # Feature sections, grouped by feature
│       ├── home/                # Hero, HowItWorks, FAQ...
│       └── form/                # LoginForm, SignUpFrom, MechanicApplyForm...
│
├── api/                         # Functions that call the backend (one file per feature)
├── hooks/                       # React Query hooks that use the api/ functions
├── store/                       # Zustand stores (auth, ui)
├── providers/                   # React context providers (React Query, Google)
├── validation/                  # Zod schemas for forms
├── types/                       # Shared TypeScript types
├── data/                        # Static content (legal text)
├── lib/                         # Helpers: apiClient, utils (cn), format
├── assets/images/               # Images imported in code, grouped by page
└── public/                      # Files served as-is (favicon, static files)
```

### How the folders connect

```
page (app/)  ->  component (components/)  ->  hook (hooks/)  ->  api function (api/)  ->  backend
                       |
                       +-> validation (validation/) for form rules
```

A component never calls the backend directly. It uses a hook, the hook calls an `api/` function, and that function uses `lib/apiClient.ts`.

## Beginner Guide: Where Do I Put...?

| I want to... | Put it in |
|---|---|
| Add a new page | `app/(public)/<group>/<route>/page.tsx` (file must be named `page.tsx`) |
| Add a section of a page | `components/module/<feature>/` |
| Add a form | `components/module/form/` and its Zod rules in `validation/` |
| Add a small reusable piece | `components/shared/` |
| Add a shadcn component | run `npx shadcn add <name>` (goes to `components/ui/`) |
| Call a new backend endpoint | function in `api/`, then a hook in `hooks/` |
| Add a shared type | `types/` |
| Add an image | `assets/images/<page-or-feature>/` and import it with `@/assets/images/...` |

Rules of thumb:

- Files that Next.js treats specially must be lowercase: `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`.
- Use the `@/` import alias (it points to the project root), for example `import Logo from "@/components/shared/logo"`.
- Every folder with several exports has an `index.ts` so you can import from `@/hooks`, `@/api`, `@/types`.

## Auth Flow

1. Register: the user submits the form and the backend emails an OTP.
2. Verify: the user enters the OTP on `/register/verify-account`.
3. Login: email/password or Google. The backend sets httpOnly cookies, so the frontend never stores tokens.
4. Mechanics fill in the application form at `/apply`.

## Deployment

`next.config.ts` uses `output: "export"`, so `npm run build` creates a static site in `out/` that any static host can serve. Set the `NEXT_PUBLIC_*` variables in your host before building.
