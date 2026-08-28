import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect authenticated users directly to their dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}
