# Folder Structure Guide

This project separates **routing** from **feature logic**. Next.js `app/`
only decides *which URL renders what*; everything else lives in
feature-based folders. This keeps routes thin and features portable.

## The core rule: `app/` is a router, not a home for logic

`app/<route>/page.tsx` files are almost always one-liners that just import
and render a component from `module/`:

```tsx
// app/(protected)/employees/page.tsx
import Employees from "@/module/employees";

export default function EmployeesPage() {
  return <Employees />;
}
```

**Why:** Next.js's App Router ties folder names directly to URLs and to
special files (`layout.tsx`, `page.tsx`, route groups like `(auth)`,
`(protected)`). If real feature code lived here, moving/renaming a route
would mean untangling business logic from routing config. Keeping `page.tsx`
as a thin re-export means routes can be restructured without touching the
feature itself.

Route groups (folders in parentheses, `(auth)` and `(protected)`) don't
affect the URL — they only let two areas of the app have different
`layout.tsx` files (e.g. `(auth)/layout.tsx` for the login shell vs.
`(protected)/layout.tsx` which wraps everything in `DashboardLayout`).

## The feature unit: `module/<feature>/`

Each business feature (employees, orders, transporters, end-users,
payment-terms, settings, profile, auth, dash) gets one folder under
`module/`. Every module follows the same internal shape:

```
module/<feature>/
  index.tsx            entry component the page.tsx renders
  helper.ts            feature-local pure helper functions
  components/          UI pieces used only by this feature (dialogs, cells, columns)
  hooks/                feature-local data hooks (useEmployees, useCreateEmployee, ...)
```

**Why one folder per feature instead of grouping by type (all hooks
together, all components together)?** Because everything needed to
understand or change "Employees" lives in one place. Deleting a feature is
one folder delete; onboarding to a feature means opening one directory
instead of hunting across `hooks/`, `components/`, `pages/` for the pieces
that belong to it.

This is enforced by a generator, not just convention — see below.

## Supporting layers (shared across all features)

| Folder | Purpose | Why it's separate |
|---|---|---|
| `services/<feature>.ts` | Raw API calls (axios requests) per feature | Keeps network/endpoint concerns out of components; hooks call services, not axios directly |
| `types/<feature>.d.ts` | Request/response TypeScript types per feature | Shared between `services/` and `module/<feature>/hooks` without either importing the other |
| `lib/` | Cross-cutting utilities not tied to one feature (`query-keys.ts`, `permission.ts`, `config.ts`, `utils.ts`, `yup.ts`) | If it doesn't belong to a single feature, it doesn't belong in `module/` |
| `hooks/` (root) | Generic reusable hooks (`useModal`, `usePagination`, `useTableSorting`) | Feature-agnostic; if a hook is used by 2+ modules it graduates from `module/x/hooks` to root `hooks/` |
| `context/` | App-wide React context (`auth.tsx`, `listing.tsx`) | Global state that isn't feature-specific |
| `providers/` | Top-level provider composition (`AppProvider.tsx`) wired into root `app/layout.tsx` | Keeps root layout clean |

Naming convention: `services/employees.ts` + `types/employees.d.ts` +
`lib/query-keys.ts`'s `employees` key + `module/employees/` all share the
name "employees" — matching names across layers make it easy to jump
between them by pattern, even though they're physically separate folders.

## `components/common/` vs `components/ui/` (the notes.txt question)

- **`components/ui/`** — low-level, generic, unopinionated primitives
  (`button.tsx`, `input.tsx`, `select.tsx`, `dialog.tsx`). These know nothing
  about this app's domain; they could be copy-pasted into any project
  (this is the shadcn/ui convention — see `components.json`).
- **`components/common/`** — app-specific composites built out of `ui/`
  primitives, reused across *multiple* features (`data-table.tsx`,
  `pagination.tsx`, `page-title-banner.tsx`, `status-badge.tsx`).

**Why split them:** `ui/` is meant to stay swappable/regeneratable (e.g. via
`npx shadcn add`) without risk of clobbering app logic. `common/` is
project-specific and would never be touched by a component-library update.
The dividing line: if it has no opinion about *this app's* data or domain,
it's `ui/`; if it encodes app-specific behavior/layout reused by several
features, it's `common/`.

## Data flow through the layers (one example: Employees)

```
app/(protected)/employees/page.tsx
        -> module/employees/index.tsx        (page component, state, layout)
              -> module/employees/hooks/useEmployees.ts   (react-query hook)
                    -> lib/query-keys.ts (queryKeys.employees.list)
                    -> services/employees.ts  (getEmployees -> axios call)
                          -> types/employees.d.ts (request/response shapes)
```

Components never call `services/` directly — they go through a hook in
`module/<feature>/hooks/`. This keeps data-fetching/caching logic
(react-query) out of presentational code and in one testable place per
feature.

## Scaffolding is automated, not just a convention

`scripts/generate-module.js` (run via `npm run generate <name>`) creates a
new feature by generating exactly this shape:

- `app/(protected)/<feature>/page.tsx`
- `module/<feature>/index.tsx`, `module/<feature>/components/`, `module/<feature>/hooks/`
- `module/<feature>/helper.ts`
- `services/<feature>.ts`
- `types/<feature>.d.ts`

See `scripts/utils/scaffold-module.js`. This means the folder structure
isn't just "the way things happened to end up" — it's a template every new
feature is generated from, so all modules stay consistent. There's also
`scripts/revert-module.js` to undo a scaffold.

## Quick reference

| Question | Where to look |
|---|---|
| What does this URL render? | `app/<route>/page.tsx` (one-liner import) |
| How does the Employees screen work? | `module/employees/index.tsx` |
| Where's the API call for employees? | `services/employees.ts` |
| What shape does the API return? | `types/employees.d.ts` |
| Where's a dialog/table-cell only used by Employees? | `module/employees/components/` |
| Where's a generic button/input? | `components/ui/` |
| Where's a reusable app-specific widget (table, pagination)? | `components/common/` |
| Where's a hook shared by many features? | `hooks/` (root) |
| Where's a hook only Employees uses? | `module/employees/hooks/` |
