import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-9xl font-bold text-ink/10">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Page Not Found</h2>
      <p className="font-mono text-ink/60 mb-8 max-w-md">
        The record you are looking for might be scratched or missing from our crates.
      </p>
      <Link 
        href="/shop" 
        className="bg-ink text-paper px-8 py-3 uppercase font-mono text-sm hover:bg-accent hover:text-ink transition-colors"
      >
        Back to Shop
      </Link>
    </div>
  );
}