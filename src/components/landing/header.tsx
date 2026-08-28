import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-4 border-black">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary border-2 border-black rounded-sm flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <span className="font-bold text-2xl tracking-tight">DashBill</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="font-bold text-lg px-4 py-2 hover:bg-black/5 rounded-sm transition-colors hidden sm:block"
          >
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="neo-btn neo-btn-primary px-6 py-2 text-lg rounded-sm"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
