# QMAX Procure

A procurement and purchase requisition web app for an electronics engineering team, built with Next.js and Supabase.

**Live demo:** https://qmax-procure.vercel.app <!-- Source: GitHub repo "homepage" field. Sign-in needs a Supabase account. -->

## What it does

QMAX Procure brings purchase requests into one dashboard. Signed-in users raise purchase requisitions for a project, add line items one at a time or upload them in bulk from a spreadsheet, and track each request by status. The dashboard also has screens for electronic-component inventory (resistors, capacitors, transistors, MOSFETs) and for allocating components to projects.

## Key features

- **Authentication** with Supabase Auth: sign up, log in, email confirmation, forgot password and update password.
- **Purchase requisitions:**
  - Create a requisition with a project code, purchase type (Proto, Production, Testing, Maintenance, Research, Asset, Consumable) and notes.
  - Add line items with item name and code, quantity, units, vendor, cost, currency, alternate part, link and remarks. The app computes the total.
  - **Bulk import** line items from `.csv` or `.xlsx` files, with column validation, row-level error reporting and a preview before import. A CSV template can be downloaded.
  - List view with status tabs (Pending, Approved, Completed) and summary cards.
  - Detail page with the requested items, a cost summary and a timeline.
- **PostgreSQL schema** in SQL migrations: enums for purchase type and status, a header table and a line-item table, indexes, `updated_at` triggers, and **Row Level Security** policies so users can only see and edit their own requisitions (and edit only while they are Pending).
- **Inventory and project-allocation UI** for component categories, projects and allocations. <!-- TODO: these screens currently show static/placeholder data, not data from Supabase -->
- Light and dark theme toggle, a responsive sidebar layout, and charts (Recharts).

<!-- TODO: Approve / Reject / Duplicate / Export actions on a requisition are UI placeholders (they only log to the console). Describe them as features once they are implemented. -->

## Tech stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack), React 19, TypeScript |
| UI | Tailwind CSS v4, shadcn/ui (Radix UI), lucide-react, Recharts, Sonner |
| Backend / data | Supabase (PostgreSQL, Auth, Row Level Security) via `@supabase/ssr` |
| Spreadsheet parsing | SheetJS (`xlsx`) |
| Hosting | Vercel |

## Project structure

```
app/
  auth/                     # login, sign-up, password reset, email confirm route
  dashboard/
    purchase-requisitions/  # list, new, [id] detail
    components/             # inventory pages (resistors, capacitors, transistors, mosfets, add)
    projects/               # projects + component allocation
    settings/
components/                 # forms, tables, bulk-upload dialog, layout, shadcn/ui primitives
lib/supabase/               # browser / server / middleware Supabase clients
supabase/migrations/        # SQL schema + RLS policies
```

## Getting started

**Prerequisites:** Node.js 18+ and pnpm, plus a Supabase project.

```bash
pnpm install
```

Create `.env.local` with the following variables (names only; take the values from your Supabase project's API settings):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=
```

Apply the database schema (with the Supabase CLI linked to your project):

```bash
supabase db push
```

Run the dev server, which starts on **port 4000**:

```bash
pnpm dev
```

Then open http://localhost:4000.

Other scripts: `pnpm build`, `pnpm start` (also on port 4000) and `pnpm lint`.

<!-- TODO: there is no root `middleware.ts`, so the session-refresh helper in lib/supabase/middleware.ts is not wired up yet. -->

## Author

Built by [Kaviarasu S](https://github.com/kaviarasuns), Full Stack Developer.
