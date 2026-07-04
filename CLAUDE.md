# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Uses **pnpm** (pnpm-lock.yaml is the active lockfile).

- `pnpm dev` — start dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm lint` — run ESLint

No test framework is set up.

Requires `NEXT_PUBLIC_API_URL` in `.env` — the axios base URL (`lib/config.ts`) reads it and will be `undefined` without it.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (no tailwind.config — theme lives in CSS variables in `app/globals.css`), shadcn/ui ("radix-nova" style, unified `radix-ui` package), TanStack React Query v5, axios, js-cookie.

**Next.js 16 has breaking changes vs. training data** — consult `node_modules/next/dist/docs/` before writing Next-specific code (see AGENTS.md).

## Architecture

Feature-module pattern: routes in `app/` are thin wrappers that render a feature module from `module/`.

- `app/<route>/page.tsx` — imports and renders the matching module (e.g. `app/login/page.tsx` → `module/login`)
- `module/<feature>/` — one directory per feature:
  - `index.tsx` — the feature's top-level component
  - `component/` — feature-specific components
  - `hook/` — feature-specific React Query hooks (e.g. `useLogin` wraps a `useMutation` around a service function)
- `services/` — API layer. `axios-base.ts` is the shared axios instance (baseURL from `lib/config.ts`); each domain gets its own file (e.g. `auth.ts`) exporting async functions that return `response.data`
- `types/` — shared TypeScript types. All API responses use the `ApiResponse<TData>` envelope from `types/base.ts` (`{ statusCode, status, message, data, meta }`)
- `components/ui/` — shadcn/ui primitives (added via shadcn CLI, aliased `@/components/ui`); `components/common/` for shared non-ui components
- `providers/app-provider.tsx` — client-side QueryClientProvider with app-wide query defaults (retry off, 5-min staleTime); wrapped around children in `app/layout.tsx`
- `lib/cookies.ts` — `authCookies` helper for the auth token cookie (js-cookie)

Path alias: `@/*` maps to the repo root.
