### 2. `DATABASE_SCHEMA.md`
```markdown
# 🗄️ Database Architecture

DashBill uses **Supabase (PostgreSQL)** as its core database. To ensure multi-tenant security (where one freelancer cannot access another freelancer's data), we implement strict **Row Level Security (RLS)** policies on all tables based on the authenticated `user_id`.

## Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ CLIENTS : manages
    CLIENTS ||--o{ INVOICES : has
    INVOICES ||--|{ INVOICE_ITEMS : contains

    USERS {
        uuid id PK
        string email
    }

    CLIENTS {
        uuid id PK
        uuid user_id FK
        string name
        string email
        text address
        timestamp created_at
    }

    INVOICES {
        uuid id PK
        uuid client_id FK
        string status "Draft, Sent, Paid, Overdue"
        date due_date
        decimal total_amount
        timestamp created_at
    }

    INVOICE_ITEMS {
        uuid id PK
        uuid invoice_id FK
        string description
        int quantity
        decimal price
    }