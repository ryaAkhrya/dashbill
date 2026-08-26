import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Sign Up — DashBill",
};

export default async function SignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="flex flex-1 items-center justify-center bg-background-muted p-6 min-h-screen">
      <SignupForm />
    </main>
  );
}
