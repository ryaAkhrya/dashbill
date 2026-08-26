# Development Phases

## Phase 1: Foundation (MVP Setup)
- Inisialisasi *repository* Next.js dengan App Router.
- Konfigurasi Tailwind CSS dan pengaturan *custom utility classes* untuk Neobrutalism.
- Setup *project* Supabase dan konfigurasi koneksi di `.env`.
- Implementasi Supabase Auth (Email & Password login).

## Phase 2: Core Data & Operations
- Eksekusi migrasi skema database (tabel `clients`, `invoices`, `invoice_items`).
- Konfigurasi *Row Level Security* (RLS) di Supabase.
- Buat Server Actions untuk operasi CRUD pada entitas `clients`.
- Buat Server Actions untuk operasi CRUD pada entitas `invoices`.

## Phase 3: User Interface & Integration
- Bangun layout utama *dashboard* (Sidebar, Header, Main Content).
- Buat halaman *Client Management* (List, Create, Edit, Delete).
- Buat halaman *Invoice Creation* (Form dinamis dengan perhitungan subtotal & pajak).
- Integrasi `@react-pdf/renderer` untuk fitur ekspor PDF.

## Phase 4: Polish & Deployment
- Finalisasi audit desain Neobrutalism (konsistensi border, shadow, dan warna).
- Buat fitur *Demo Login* (Tombol "Login as Guest").
- *Refactoring* dan pembersihan kode.
- *Deployment* ke Vercel dan verifikasi fungsi *production*.