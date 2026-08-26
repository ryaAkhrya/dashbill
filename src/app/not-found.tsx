import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <div className="neo-card p-10 max-w-lg w-full relative">
        <div className="absolute -top-6 -right-6 bg-primary border-4 border-black font-[900] text-3xl px-4 py-2 transform rotate-12 shadow-[4px_4px_0px_#000]">
          404
        </div>
        <h1 className="text-4xl font-[900] tracking-tight mb-4">Page not found</h1>
        <p className="text-lg text-foreground/80 font-medium mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="neo-btn neo-btn-primary rounded-md px-6 py-3 text-lg inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
