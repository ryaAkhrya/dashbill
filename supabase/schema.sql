-- ===========================================
-- DashBill Database Schema
-- Tables: clients, invoices, invoice_items
-- Security: Row Level Security (RLS) enabled
-- ===========================================

-- 1. CLIENTS
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  email text not null,
  address text,
  created_at timestamptz default now() not null
);

alter table public.clients enable row level security;

create policy "Users can view their own clients"
  on public.clients for select
  using (auth.uid() = user_id);

create policy "Users can insert their own clients"
  on public.clients for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own clients"
  on public.clients for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own clients"
  on public.clients for delete
  using (auth.uid() = user_id);


-- 2. INVOICES
create table if not exists public.invoices (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.clients(id) on delete cascade not null,
  status text default 'Draft' not null
    check (status in ('Draft', 'Sent', 'Paid', 'Overdue')),
  due_date date not null,
  total_amount decimal(12,2) default 0 not null,
  created_at timestamptz default now() not null
);

alter table public.invoices enable row level security;

-- Invoices belong to clients, which belong to users.
-- Policy joins through clients to verify ownership.
create policy "Users can view their own invoices"
  on public.invoices for select
  using (
    exists (
      select 1 from public.clients
      where clients.id = invoices.client_id
        and clients.user_id = auth.uid()
    )
  );

create policy "Users can insert invoices for their own clients"
  on public.invoices for insert
  with check (
    exists (
      select 1 from public.clients
      where clients.id = invoices.client_id
        and clients.user_id = auth.uid()
    )
  );

create policy "Users can update their own invoices"
  on public.invoices for update
  using (
    exists (
      select 1 from public.clients
      where clients.id = invoices.client_id
        and clients.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.clients
      where clients.id = invoices.client_id
        and clients.user_id = auth.uid()
    )
  );

create policy "Users can delete their own invoices"
  on public.invoices for delete
  using (
    exists (
      select 1 from public.clients
      where clients.id = invoices.client_id
        and clients.user_id = auth.uid()
    )
  );


-- 3. INVOICE_ITEMS
create table if not exists public.invoice_items (
  id uuid default gen_random_uuid() primary key,
  invoice_id uuid references public.invoices(id) on delete cascade not null,
  description text not null,
  quantity integer not null check (quantity > 0),
  price decimal(12,2) not null check (price >= 0)
);

alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;

-- Invoice items inherit access through invoices -> clients -> user_id
create policy "Users can view their own invoice items"
  on public.invoice_items for select
  using (
    exists (
      select 1 from public.invoices
      join public.clients on clients.id = invoices.client_id
      where invoices.id = invoice_items.invoice_id
        and clients.user_id = auth.uid()
    )
  );

create policy "Users can insert items for their own invoices"
  on public.invoice_items for insert
  with check (
    exists (
      select 1 from public.invoices
      join public.clients on clients.id = invoices.client_id
      where invoices.id = invoice_items.invoice_id
        and clients.user_id = auth.uid()
    )
  );

create policy "Users can update their own invoice items"
  on public.invoice_items for update
  using (
    exists (
      select 1 from public.invoices
      join public.clients on clients.id = invoices.client_id
      where invoices.id = invoice_items.invoice_id
        and clients.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.invoices
      join public.clients on clients.id = invoices.client_id
      where invoices.id = invoice_items.invoice_id
        and clients.user_id = auth.uid()
    )
  );

create policy "Users can delete their own invoice items"
  on public.invoice_items for delete
  using (
    exists (
      select 1 from public.invoices
      join public.clients on clients.id = invoices.client_id
      where invoices.id = invoice_items.invoice_id
        and clients.user_id = auth.uid()
    )
  );


-- 4. INDEXES for common query patterns
create index if not exists idx_clients_user_id on public.clients(user_id);
create index if not exists idx_invoices_client_id on public.invoices(client_id);
create index if not exists idx_invoice_items_invoice_id on public.invoice_items(invoice_id);
