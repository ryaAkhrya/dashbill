# 1. PROJECT OVERVIEW

DashBill is a modern invoicing web application tailored for freelancers. It allows users to manage clients, create invoices, add items to invoices, track invoice statuses (Draft, Sent, Paid, Overdue), and export professional PDF invoices. The project focuses heavily on speed, clarity, and an intense, vibrant Neobrutalism design system.

---

# 2. TECH STACK

* Next.js 16.3.3
* React 19.2.8
* TypeScript 5
* Tailwind CSS v4
* Supabase (@supabase/supabase-js 2.112.4, @supabase/ssr 0.12.5)
* PostgreSQL (via Supabase)
* @react-pdf/renderer 4.9.0
* Vercel (recommended deployment)

---

# 3. PROJECT STRUCTURE

```text
src/
├── app/                  # Next.js App Router root
│   ├── actions/          # Server Actions for DB/Auth
│   ├── dashboard/        # Dashboard layout and routes
│   ├── login/            # Login page
│   ├── signup/           # Registration page
│   ├── globals.css       # Neobrutalism design system styling
│   └── layout.tsx        # Root layout, fonts
├── components/           # UI Components grouped by feature
│   ├── auth/             # Login/Signup forms
│   ├── clients/          # Client management UI
│   ├── dashboard/        # Dashboard metrics, shell
│   ├── invoices/         # Invoice creation, tables, PDF
│   └── landing/          # Landing page sections (Hero, FAQ, etc.)
├── lib/                  # Utilities, types, and clients
│   ├── supabase/         # Supabase client instances (client & server)
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Formatting/helper functions
supabase/
└── schema.sql            # Database tables, policies, and indexes
```

* **`src/app/actions`**: Handles all server-side mutations (auth, invoices, clients).
* **`src/components`**: Houses feature-specific components.
* **`supabase`**: Contains the SQL definitions for the Supabase backend.

---

# 4. ROUTES / PAGES

```text
/                        → Landing Homepage (Hero, Features, FAQ)
/login                   → Login page (Username/Password Form)
/signup                  → Registration page
/dashboard               → Dashboard overview, metric cards
/dashboard/clients       → Client management page
/dashboard/invoices      → Invoice listing and management
/dashboard/invoices/new  → Create new invoice page
```

---

# 5. MAIN FEATURES

* **Authentication**: Username/password signup and login (using synthetic internal emails). Demo login has been removed. Root `/` is always a public landing page regardless of authentication status. Unauthenticated users are accessing protected routes are redirected to `/login`.
* **Dashboard Overview**: Displays key metrics like Total Clients, Total Revenue (based on "Paid" invoices), Pending Invoices, and Overdue Invoices.
* **Client Management**: Create, read, update, and delete client information (Name, Email, Address).
* **Invoice Management**: Create invoices tied to specific clients, add multiple line items (description, quantity, price), and track total amounts and statuses.
* **PDF Export**: Generate PDF versions of invoices using `@react-pdf/renderer`.
* **Dark Mode**: Not specifically implemented as the design is based on a high-contrast Neobrutalist approach on a white/light background.

---

# 6. USER FLOW

**Guest Flow:**
```text
Homepage (Landing)
↓
Clicks "Sign Up" or "Login"
↓
Fills out form / Uses Demo Login
↓
Redirected to Dashboard
```

**Authenticated User Flow:**
```text
Dashboard Overview
↓
Clicks "+ Create Invoice"
↓
Selects Client (or creates a new one)
↓
Adds invoice items & sets due date
↓
Submits Invoice (Data saved to Supabase)
↓
Invoice appears in Dashboard
↓
User can export to PDF or change status to "Sent"/"Paid"
```

---

# 7. DATABASE

**Provider**: PostgreSQL (via Supabase)

**Tables**:
* **`profiles`** (Immutable from client, created by database trigger)
  - `id` (uuid, FK to auth.users)
  - `username` (text, canonical lowercase, validated `^[a-z0-9_]{3,30}$`)
  - `created_at` (timestamptz)
* **`clients`**
  - `id` (uuid)
  - `user_id` (uuid, FK to auth.users)
  - `name` (text)
  - `email` (text)
  - `address` (text)
* **`invoices`**
  - `id` (uuid)
  - `client_id` (uuid, FK to clients)
  - `status` (text: 'Draft', 'Sent', 'Paid', 'Overdue')
  - `due_date` (date)
  - `total_amount` (decimal)
* **`invoice_items`**
  - `id` (uuid)
  - `invoice_id` (uuid, FK to invoices)
  - `description` (text)
  - `quantity` (integer)
  - `price` (decimal)

**Relationships**:
* `User` (auth.users) has one `Profile`
* `User` (auth.users) has many `Clients`
* `Client` has many `Invoices`
* `Invoice` has many `Invoice Items`

**Security**: 
Row Level Security (RLS) is fully configured for all tables to ensure users can only read, insert, update, or delete data belonging to their own `user_id`.

---

# 8. AUTHENTICATION & AUTHORIZATION

* **Provider**: Supabase Auth
* **Session Handling**: `@supabase/ssr` with server-side clients accessing cookies.
* **Protected Routes**: `/dashboard` and its sub-routes check for an active user session in server components and layouts. Unauthenticated users are redirected to `/login`.
* **Identity**: Uses a synthetic email approach (`username@users.dashbill.local`) to allow users to login seamlessly via just their Username and Password. Usernames are normalized to canonical lowercase and validated both in frontend, Server Actions, and Database Trigger. Passwords must be at least 8 characters.
* **Important Configuration**: Supabase email confirmation MUST be disabled for this flow to work, as synthetic emails are not real inboxes.
* **Role System**: Not implemented; all authenticated users are standard users managing their own isolated data.
* **Authorization**: Handled primarily via Database RLS policies ensuring users cannot query or mutate data they don't own.

---

# 9. API / SERVER LOGIC

The application relies entirely on Next.js Server Actions rather than traditional API routes.

**Example Server Action Flow:**
```text
Action: createInvoiceAction
File: src/app/actions/invoices.ts

Fungsi:
Creates a new invoice and its associated items.

Flow:
Form Submission / Input
→ Input validation (validateInvoiceInput)
→ Session check (getAuthenticatedUser)
→ Client ownership verification
→ DB Insert: Invoice
→ DB Insert: Invoice Items
→ Cache Revalidation (revalidatePath)
→ Return Success/Data
```

Other actions include: `loginAction`, `signupAction`, `logoutAction`, `updateInvoiceStatusAction`, and `deleteInvoiceAction`.

---

# 10. IMPORTANT FILES

```text
src/app/globals.css
Fungsi:
Defines the entire Neobrutalism design system, color palette, and reusable utility classes (.neo-card, .neo-btn).

src/app/dashboard/page.tsx
Fungsi:
Main dashboard view showing aggregated metrics fetched directly from Supabase.

src/app/actions/invoices.ts
Fungsi:
Core business logic for creating, updating, and fetching invoices.

supabase/schema.sql
Fungsi:
Single source of truth for the database schema and RLS policies.

src/lib/supabase/server.ts
Fungsi:
Server-side Supabase client initialization for auth and data fetching.
```

---

# 11. COMPONENT ARCHITECTURE

```text
RootLayout (src/app/layout.tsx)
├── Landing Components (Hero, Features, FAQ, Header) -> used in /
├── DashboardShell (src/components/dashboard/dashboard-shell) -> layout for /dashboard
│   ├── MetricCard (Reusable dashboard widget)
│   ├── InvoiceTable (List of invoices)
│   └── ClientForm / InvoiceForm
```
Components are highly modularized by feature. `DashboardShell` acts as the persistent wrapper for the app once logged in.

---

# 12. DESIGN SYSTEM / UI

**Style**: Intense Neobrutalism.
**Typography**: Inter (sans-serif) for general text, high weight for headings (`font-[900]`).
**Color Palette**:
* Background: `#FFFFFF` (White) / `#FFFDF9` (Warm tint)
* Foreground/Borders: `#000000` (Pitch Black)
* Accents: Vibrant Yellow (`#FFE600`), Lavender (`#D8B4FE`), Coral Red (`#F87171`), Lime (`#A6FF00`), Pink (`#FF90E8`), Blue (`#60A5FA`).
**Key Patterns (Custom CSS Utilities)**:
* `neo-card`, `neo-btn`, `neo-input`, `neo-modal`: Features thick 3px-4px black borders, harsh solid drop shadows (e.g., `4px 4px 0px #000`), and flat background colors. No border-radius (sharp corners).
* **Hover/Active States**: Buttons translate/move down-right to simulate a physical push, eliminating the shadow.
* **Layout**: Uses CSS grid and flexbox extensively via Tailwind.

---

# 13. STATE MANAGEMENT

* **React State (`useState`)**: Used locally in forms for managing inputs before submission.
* **Server State**: Managed natively by Next.js App Router (Server Components). Data is fetched on the server and passed down as props.
* **Mutations**: Handled by Next.js Server Actions with `revalidatePath` to automatically refresh server state upon successful data changes.

---

# 14. DATA FLOW

**Reading Data:**
```text
Server Component (e.g., DashboardPage)
→ Calls Supabase JS Client (await supabase.from(...))
→ Awaits Data
→ Renders UI with Data
```

**Mutating Data:**
```text
UI Form Component
→ Action Trigger (Button Click / formAction)
→ Calls Server Action (e.g., createInvoiceAction)
→ Server Action validates & updates Supabase DB
→ Server Action calls revalidatePath()
→ Next.js re-renders server components with new data
→ UI Updates
```

---

# 15. ENVIRONMENT VARIABLES

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_APP_URL
```
These are used to connect to the Supabase backend and define the base URL of the application.

---

# 16. DEPENDENCIES

### Core
* `next` (16.3.3)
* `react`, `react-dom` (19.2.8)

### UI
* `@tailwindcss/postcss`, `tailwindcss` (v4)
* `@react-pdf/renderer` (PDF generation)

### Database & Auth
* `@supabase/supabase-js`
* `@supabase/ssr`

### Utility
* `typescript`

---

# 17. RESPONSIVE BEHAVIOR

* **Mobile**: Uses flex-col layouts, stack metric cards (grid-cols-1).
* **Tablet**: Adjusts grid to `md:grid-cols-2`.
* **Desktop**: Expands to `xl:grid-cols-4`, wide dashboard layout with maximum widths (`max-w-7xl`).
Uses Tailwind's standard breakpoint utility classes (`sm:`, `md:`, `lg:`, `xl:`).

---

# 18. CURRENT PROJECT STATUS

## Sudah selesai
* Landing page structure
* Database schema & RLS policies
* Authentication (Username Login, Signup, Profiles Migration)
* Dashboard metrics calculation and UI layout
* Server actions for auth and invoices

## Sudah ada tapi belum lengkap
* Unverified implementations of Client CRUD forms (logic exists in actions, but UI components not fully audited).
* Invoice Creation UI logic.

## Belum dibuat
* Advanced settings pages (profile edit, password reset).

---

# 19. KNOWN ISSUES / TECHNICAL DEBT


* **LOW**: Tax calculation is currently omitted or handled simplistically (Total = Quantity * Price).
* **MEDIUM**: Error handling in server actions returns simple string messages. Could be improved with structural error boundaries.

---

# 20. SECURITY REVIEW

* **Client/Server separation**: Excellent. DB calls and secrets are isolated inside Server Actions and Server Components.
* **Database Access**: RLS is strictly configured on all tables enforcing `user_id` ownership. Foreign key cascade deletes are safely implemented.
* **Authentication guards**: `redirect("/login")` present on server components protecting private routes.
* **Input Validation**: Custom manual validation inside Server Actions (e.g., `validateInvoiceInput`). Could be more robust if refactored to use a library like Zod, but currently functions fine.

---

# 21. IMPORTANT RULES WHEN EDITING THIS PROJECT

* **Maintain Neobrutalism Design**: DO NOT add soft rounded corners (`rounded-md`, `rounded-lg`) or soft blurred shadows (`shadow-md`). Always use the custom utility classes from `globals.css` (`neo-card`, `neo-btn`, etc.).
* **Server Actions**: Keep data mutations inside `src/app/actions`. Do not fetch or mutate data directly via Supabase on client components to preserve security and RLS.
* **RLS Policies**: Do not mutate database schemas without ensuring RLS policies continue to strictly filter by `auth.uid()`.
* **Client Components**: Only use `"use client"` when interactivity (hooks, state) is strictly required. Prefer Server Components for layout and data fetching.

---

# 22. HOW TO RUN THE PROJECT

```bash
npm install
npm run dev
```

---

# 23. RECENT / RELEVANT IMPLEMENTATION CLUES

* The architecture heavily utilizes the Next.js App router patterns (Server Components + Server Actions).
* Tailwind v4 is in use, which means configuration is primarily done inside the CSS files (`@theme inline` found in `globals.css`) rather than a `tailwind.config.ts` file.

---

# 24. FILE CHANGE MAP

```text
Landing Page Updates:
- src/app/page.tsx
- src/components/landing/*

Auth Flow:
- src/app/login/page.tsx
- src/app/signup/page.tsx
- src/app/actions/auth.ts

Database Migrations:
- supabase/username_auth_migration.sql

Dashboard & Metrics:
- src/app/dashboard/page.tsx
- src/components/dashboard/metric-card.tsx

Invoice Logic (CRUD):
- src/app/actions/invoices.ts
- src/components/invoices/*

Styling & Theming:
- src/app/globals.css
```

---

# 25. AI HANDOFF SUMMARY

## PROJECT IN ONE PARAGRAPH
DashBill is a robust Next.js 16 app designed for freelancers to create and manage invoices. It features a bold Neobrutalism UI, relies heavily on Server Actions for data mutations, and uses Supabase for authentication and database management with strict Row Level Security.

## CURRENT ARCHITECTURE
Next.js App Router. Server Components handle layouts and secure data fetching. Client Components handle interactive UI (forms). Server Actions manage database CRUD. Styling is powered by Tailwind v4 utilizing a custom Neobrutalism CSS theme.

## MOST IMPORTANT FILES
* `src/app/globals.css`
* `src/app/actions/invoices.ts`
* `src/app/dashboard/page.tsx`
* `supabase/schema.sql`
* `src/app/actions/auth.ts`

## WORKING FEATURES
Authentication, Dashboard Overview Metrics, Invoice Data Structures, Neobrutalist Design System.

## IMPORTANT CONSTRAINTS
Do not introduce standard modern UI elements (rounded corners, soft shadows). Stick to `.neo-*` classes. Always mutate data via Server Actions, not client-side fetches. Do not bypass Supabase RLS.

## CURRENT WEAK POINTS
Input validation in server actions is manual and could be tedious to scale.

## WHERE TO EDIT
To edit the UI theme, modify `globals.css`. To change data operations, edit files in `src/app/actions/`. To edit pages, navigate through the `src/app/` directory structure.
