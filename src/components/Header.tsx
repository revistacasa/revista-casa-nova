"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/site";

const NAV = Object.entries(CATEGORIES).map(([slug, meta]) => ({
  href: `/categoria/${slug}`,
  label: meta.name,
}));

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="bg-ink text-paper sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <Link href="/" className="leading-tight shrink-0" onClick={() => setOpen(false)}>
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

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-lg text-paper hover:bg-paper/10"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-paper/10 pb-4 pt-2">
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block py-3 text-base text-paper/90 hover:text-accent border-b border-paper/10 last:border-0"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
