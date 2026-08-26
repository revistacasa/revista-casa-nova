import Link from "next/link";
import { SITE, CATEGORIES } from "@/lib/site";

const NAV = Object.entries(CATEGORIES).map(([slug, meta]) => ({
  href: `/categoria/${slug}`,
  label: meta.name,
}));

export default function Header() {
  return (
    <header className="bg-ink text-paper sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <Link href="/" className="leading-tight shrink-0">
            <span className="font-display text-2xl font-extrabold tracking-tight">
              Casa<span className="text-accent">Nova</span>
            </span>
            <span className="block text-[10px] font-sans tracking-[0.3em] text-paper/50 uppercase">
              Revista
            </span>
          </Link>
          <nav className="hidden md:flex items-center flex-wrap justify-end gap-x-4 gap-y-1 text-sm font-medium">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-paper/80 hover:text-accent transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav className="md:hidden flex gap-4 overflow-x-auto pb-3 text-sm font-medium whitespace-nowrap">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-paper/80">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}