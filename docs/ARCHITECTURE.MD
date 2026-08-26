# 🏗️ Architecture Overview

DashBill is built utilizing the **Next.js App Router** paradigm, focusing on performance, SEO, and developer experience.

## Component Strategy
- **Server Components (Default):** Used for fetching data directly from Supabase. This minimizes the JavaScript bundle sent to the client and improves load times (e.g., Dashboard Overview, Invoice List).
- **Client Components (`'use client'`):** Used strictly where interactivity is required, such as forms, state management, and the PDF generation viewer.

## PDF Generation
We use `@react-pdf/renderer` to construct PDF files. The rendering happens dynamically based on the invoice data fetched. Due to how `@react-pdf` accesses browser APIs, the PDF viewer components are dynamically imported with `ssr: false` in Next.js to prevent server-side hydration mismatches.

## Styling
The application utilizes **Tailwind CSS** with a custom Neobrutalism theme configuration (heavy borders, solid drop-shadows, stark contrast colors). Custom utility classes are defined in `tailwind.config.js` to maintain consistency across the UI.