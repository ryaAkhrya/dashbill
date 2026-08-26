# 🚀 Deployment Guide

DashBill is optimized for deployment on **Vercel**.

## Steps to Deploy

1. Push your code to a GitHub repository.
2. Log in to Vercel and click **Add New -> Project**.
3. Import your DashBill repository.
4. **Important:** In the "Environment Variables" section of Vercel deployment settings, add your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**.

*Note: Ensure your Supabase project remains active, as free-tier Supabase projects are paused after 1 week of inactivity. You can unpause it from the Supabase dashboard if needed.*