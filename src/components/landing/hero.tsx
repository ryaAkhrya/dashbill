import Link from "next/link";
import { demoLoginAction } from "@/app/actions/auth";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
      <div className="neo-badge bg-secondary text-black mb-6 px-4 py-1 text-sm border-2 border-black [box-shadow:2px_2px_0px_#000]">
        DashBill is now in Beta
      </div>
      <h1 className="text-5xl sm:text-7xl font-[900] tracking-tight leading-tight mb-6">
        Invoicing for Freelancers, <br className="hidden sm:block" />
        <span className="text-primary">Without the BS.</span>
      </h1>
      <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mb-10 font-medium">
        Create, manage, and export professional PDF invoices in seconds. No subscription traps. No bloated features. Just you and your business.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link
          href="/signup"
          className="neo-btn neo-btn-primary rounded-md px-8 py-4 text-lg w-full sm:w-auto"
        >
          Start for Free
        </Link>
        <form action={async () => {
          "use server";
          await demoLoginAction(null);
        }} className="w-full sm:w-auto">
          <button
            type="submit"
            className="neo-btn neo-btn-ghost bg-white rounded-md px-8 py-4 text-lg w-full"
          >
            Try Interactive Demo
          </button>
        </form>
      </div>

      <div className="mt-16 w-full relative">
        <div className="neo-card rounded-md aspect-video w-full bg-background-muted flex items-center justify-center overflow-hidden border-4">
          <div className="text-foreground/40 font-bold text-xl">
            [ Dashboard Preview Graphic ]
          </div>
        </div>
      </div>
    </section>
  );
}
