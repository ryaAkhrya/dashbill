import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-black py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-2xl font-[900] tracking-tight mb-2">
            DashBill
          </Link>
          <p className="text-sm font-bold text-foreground/60">
            &copy; {currentYear} DashBill. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href="#" className="hover:underline hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
