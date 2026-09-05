import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

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
    <main className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-background">
      {/* Branding Panel */}
      <div className="flex flex-col justify-center p-8 lg:p-16 bg-[#00E5FF] lg:border-r-4 border-b-4 lg:border-b-0 border-black relative overflow-hidden">
        {/* Simple decorative pattern */}
        <div className="absolute top-0 left-0 p-8 opacity-20 pointer-events-none hidden lg:block">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" stroke="black" strokeWidth="8" strokeDasharray="10 10" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 p-8 opacity-20 pointer-events-none hidden lg:block">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="8" strokeDasharray="10 10" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-4 text-black">
            Freelance Invoicing, <br className="hidden lg:block" /> Without the Headache.
          </h1>
          <p className="text-lg lg:text-xl font-bold text-black/80 mt-4 max-w-md mx-auto lg:mx-0">
            Join DashBill today. Create your first professional invoice in seconds.
          </p>

          <div className="flex flex-col gap-4 mt-12">
            <div className="flex items-center gap-4 bg-white border-4 border-black px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full sm:w-fit mx-auto lg:mx-0 transition-transform hover:-translate-y-1">
              <span className="text-2xl">⚡</span>
              <span className="font-black text-black text-lg">1-Click PDF Export</span>
            </div>
            <div className="flex items-center gap-4 bg-white border-4 border-black px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full sm:w-fit mx-auto lg:mx-0 transition-transform hover:-translate-y-1">
              <span className="text-2xl">💼</span>
              <span className="font-black text-black text-lg">Smart Client Management</span>
            </div>
            <div className="flex items-center gap-4 bg-white border-4 border-black px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full sm:w-fit mx-auto lg:mx-0 transition-transform hover:-translate-y-1">
              <span className="text-2xl">🚫</span>
              <span className="font-black text-black text-lg">Zero Subscription Fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex flex-1 flex-col p-6 sm:p-12 relative bg-background">
        <div className="w-full mb-8 lg:mb-0">
          <Link 
            href="/" 
            className="inline-flex font-bold text-foreground hover:underline decoration-2 underline-offset-4"
          >
            &larr; Back to Home
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
