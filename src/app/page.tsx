import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="flex flex-1 items-center justify-center bg-background-muted p-8 min-h-screen">
      <div className="neo-card rounded-md p-10 max-w-md w-full text-center">
        <h1 className="text-3xl mb-2 tracking-tight">DashBill</h1>
        <p className="text-sm text-foreground/70 mb-8">
          Invoice dashboard for freelancers.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/login"
            className="neo-btn neo-btn-primary rounded-md px-6 py-3 text-center"
          >
            Login
          </a>
          <a
            href="/signup"
            className="neo-btn neo-btn-ghost rounded-md px-6 py-3 text-center"
          >
            Create Account
          </a>
        </div>
      </div>
    </main>
  );
}
