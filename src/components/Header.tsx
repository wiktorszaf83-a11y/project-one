"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isTop, setIsTop] = useState(true);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-black/70 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-420 items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="relative inline-block group after:absolute after:left-0 after:top-full after:h-2 after:w-full after:content-['']">
            <button
              type="button"
              aria-haspopup="menu"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-bold text-white-900 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.98]"
            >
              ☰
            </button>

            <div
              className="pointer-events-none invisible absolute left-0 top-full z-50 mt-2 w-max translate-y-1 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
              role="menu"
            >
              <div className="min-w-56 rounded-xl border border-white/20 bg-white/10 p-1 text-white-900 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] shadow-[0_16px_60px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <Link
                  href="/calculator"
                  className="block w-full rounded-lg px-3 py-2 text-sm font-semibold tracking-wide hover:bg-white/15 focus:bg-white/15 focus:outline-none"
                  role="menuitem"
                >
                  Kalkulator
                </Link>
                <Link
                  href="/designer"
                  className="block w-full rounded-lg px-3 py-2 text-sm font-semibold tracking-wide hover:bg-white/15 focus:bg-white/15 focus:outline-none"
                  role="menuitem"
                >
                  Projektant wnętrz
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-semibold tracking-wide text-white-900 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            Project One
          </Link>

          <div className="ml-auto hidden items-center gap-2 text-sm sm:flex">
            <Link
              href=""
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-semibold tracking-wide text-white-900 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              WIP
            </Link>
            <Link
              href=""
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-semibold tracking-wide text-white-900 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              WIP
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
