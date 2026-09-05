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
* **Dark Mode**: Fully supported using a semantic CSS variable system (`globals.css`) that seamlessly toggles between light and dark themes using `.dark` class strategy, managed via a React Context ThemeProvider.

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

**Style**: Bold Modern SaaS + Playful Brutalism + Kinetic UI.
**Typography**: Inter (sans-serif) for general text, high weight for headings (`font-[900]` / `font-black`).
**Color Palette (Semantic)**:
* Uses a CSS variable system mapped via `@theme inline` in `globals.css`.
* Light/Dark semantic aliases: `--background`, `--surface`, `--foreground`, `--muted`, `--border`.
* Core Accents: `--primary` (Yellow), `--success` (Lime), `--warning` (Yellow), `--danger` (Red), `--info` (Blue), `--secondary` (Purple).
**Key Patterns (Custom CSS Utilities)**:
* `neo-card`, `neo-btn`, `neo-input`, `neo-modal`, `neo-badge`: Features thick borders (2-3px), solid sharp shadows using semantic `--shadow-color` (e.g. `var(--shadow-md)`), and flat background colors. No border-radius or very minimal (0-4px). No glassmorphism.
* **Hover/Active States**: Buttons translate/move down-right to simulate a physical push, eliminating the shadow.
* **Animations**: Uses `.animate-fade-in-up` and `.animate-scale-in` keyframes for entrance choreography.
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
* Landing page structure & Redesign (Header, Hero, Features, FAQ, Footer)
* Database schema & RLS policies
* Authentication (Username Login, Signup, Profiles Migration, Masked Identity)
* Dashboard metrics calculation and UI layout (Primary/Secondary hierarchy)
* Server actions for auth and invoices
* Client CRUD forms (List & Animated Modal)
* Invoice Creation UI (Sticky summary, clean line items builder)
* Full Semantic CSS Variable system (Light/Dark/System themes)

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
Landing Page (Refinement v2 — complete):
- src/components/landing/header.tsx     ← Responsive nav (hamburger hidden desktop, animated mobile sheet)
- src/components/landing/hero.tsx       ← Mobile-safe, clamp typography, staggered entrance
- src/components/landing/features.tsx  ← How-It-Works grid + mixed feature hierarchy
- src/components/landing/faq.tsx        ← Refined accordion with smooth easing
- src/components/landing/footer.tsx     ← Dark visual anchor with status strip

Auth Pages:
- src/app/login/page.tsx
- src/app/signup/page.tsx
- src/app/actions/auth.ts
- src/components/auth/login-form.tsx
- src/components/auth/signup-form.tsx

Database Migrations:
- supabase/username_auth_migration.sql

Dashboard & Metrics (Freeze - do not redesign):
- src/app/dashboard/page.tsx
- src/app/dashboard/loading.tsx
- src/components/dashboard/metric-card.tsx
- src/components/dashboard/dashboard-shell.tsx
- src/components/dashboard/header.tsx
- src/components/dashboard/sidebar.tsx

Invoice Logic (CRUD):
- src/app/actions/invoices.ts
- src/components/invoices/invoice-list.tsx
- src/components/invoices/invoice-form.tsx
- src/components/invoices/status-badge.tsx

Client Logic (CRUD):
- src/components/clients/client-list.tsx
- src/components/clients/client-form-modal.tsx

Theme System & Branding:
- src/app/globals.css                   ← Full design system with dark mode palette + ledger patterns
- src/components/theme-provider.tsx     ← Context provider for dark/light/system
- src/components/theme-toggle.tsx       ← Sun/Moon toggle UI
- src/app/layout.tsx                    ← ThemeProvider integration + metadata (favicon removed for auto-discovery)
- src/app/icon.svg                      ← DashBill brand mark (Yellow Square + Black "$")
```

---

# 25. AI HANDOFF SUMMARY

## PROJECT IN ONE PARAGRAPH
DashBill is a robust Next.js 16 app designed for freelancers to create and manage invoices. It features a Bold Modern SaaS + Playful Brutalism + Kinetic UI design, relies entirely on Server Actions for data mutations, and uses Supabase for authentication and database management with strict Row Level Security.

## CURRENT ARCHITECTURE
Next.js App Router. Server Components handle layouts and secure data fetching. Client Components handle interactive UI (forms, toggles). Server Actions manage database CRUD. Styling is powered by Tailwind v4 utilizing a custom semantic CSS variable system with full dark/light mode support.

## MOST IMPORTANT FILES
* `src/app/globals.css` — full design token system, dark mode palette, animation keyframes
* `src/app/actions/invoices.ts` — invoice CRUD business logic
* `src/app/dashboard/page.tsx` — dashboard overview (FROZEN — do not redesign)
* `supabase/schema.sql` — database schema and RLS policies
* `src/app/actions/auth.ts` — auth flow (synthetic email architecture)

## WORKING FEATURES
Authentication (username + password, synthetic email hidden), Dashboard Overview (metric hierarchy frozen), Clients CRUD, Invoices CRUD, PDF Export, Status Tracking, Dark Mode, Theme Toggle.

## DESIGN SYSTEM — FINAL STATE
- **Philosophy**: Bold Modern SaaS + Playful Brutalism + Kinetic UI + Invoice Workspace/Ledger
- **Background System**: Uses subtle `ledger-pattern` (40px grids) and `ledger-lines` to create the feeling of a financial document workspace, removing the "empty white/black background" feel.
- **Light Mode**: Warm off-white `#f7f6f2` bg, pitch black `#111` borders + shadows. Section rhythm uses shifts between `#f7f6f2` (bg), `#eeecea` (muted), and `#ffffff` (surface).
- **Dark Mode**: Layered warm charcoal surfaces (`#0F100E` → `#131410` → `#181914` → `#1D1E19` → `#23241E`), cream text `#F1EFE6`, soft border `rgba(241,239,230,0.16)`, dark shadow `rgba(0,0,0,0.65)`.
- **Primary**: Vibrant yellow `#FFE600`
- **Animation easing**: `cubic-bezier(0.22, 1, 0.36, 1)` — entrance 400-850ms, translate 8-16px max
- **Reduced motion**: respected via `@media (prefers-reduced-motion: reduce)`

## LANDING PAGE — FINAL STATE
- **Header**: Desktop shows logo + nav links + theme toggle + Login + Start Free. Hamburger `lg:hidden`. Mobile shows logo + hamburger only, dropdown reveals full nav.
- **Hero**: `clamp()` font-size, staggered entrance animations (eyebrow → h1 → desc → CTAs → product), floating cards contained within relative parent (no overflow on 320px+)
- **Features**: How-It-Works in 4-column grid (desktop) / vertical (mobile), then mixed-hierarchy feature grid (1 large + 3 small), overlapping CTA panel
- **FAQ**: CSS grid-template-rows accordion, `cubic-bezier(0.22,1,0.36,1)` easing, staggered entrance
- **Footer**: Dark `bg-foreground` anchor with status strip, version badge

## NAVBAR BEHAVIOR
- **Desktop (`lg+`)**: `hidden lg:flex` — full navigation visible, hamburger hidden
- **Mobile (`<lg`)**: hamburger button visible, triggers animated `max-h` dropdown sheet, ThemeToggle inside sheet

## DASHBOARD — FROZEN
Dashboard composition is intentionally frozen at current state:
- Primary metric: Revenue (large left card with trend)
- Secondary metrics: Pending, Overdue, Clients (right column)
- Activity: Recent Invoices + Recent Clients lists
Do NOT redesign metric hierarchy unless only fixing dark mode or accessibility.

## IDENTITY SAFETY
- Synthetic emails (`username@users.dashbill.local`) are NEVER displayed to users
- All identity display uses `profiles.username` fetched server-side
- RLS strictly filters all data by `auth.uid()`

## IMPORTANT CONSTRAINTS
- Use `.neo-*` CSS utility classes from `globals.css` (not ad-hoc Tailwind)
- Use `var(--shadow-color)` for hard shadows, NOT `var(--border)` (border is rgba in dark mode)
- All data mutations via Server Actions only
- Do not bypass Supabase RLS
- No new npm packages

## CURRENT WEAK POINTS
- Input validation in server actions is manual (no Zod)
- No profile edit / password reset page yet
- Advanced settings not implemented

## WHERE TO EDIT
- UI theme / dark mode: `globals.css`
- Data operations: `src/app/actions/`
- Landing UI: `src/components/landing/`
- Dashboard UI: `src/components/dashboard/` (see frozen note above)
- Auth UI: `src/components/auth/`
