import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Login — DashBill",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="flex flex-1 items-center justify-center bg-background-muted p-6 min-h-screen">
      <LoginForm />
    </main>
  );
}
