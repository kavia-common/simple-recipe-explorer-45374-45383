"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

/**
 * PUBLIC_INTERFACE
 * Navbar
 * Top navigation bar with branding for the Ocean Professional theme.
 */
export default function Navbar() {
  const pathname = usePathname();
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      role="banner"
      aria-label="Top Navigation"
    >
      <div className="container">
        <nav
          className="card flex items-center justify-between px-4 py-3"
          role="navigation"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-extrabold text-lg"
            aria-current={pathname === "/" ? "page" : undefined}
            style={{ color: "var(--color-text)" }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "var(--color-primary)",
                display: "inline-block",
                boxShadow: "0 0 0 4px rgba(37,99,235,0.2)",
              }}
            />
            Ocean Recipes
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              className="btn"
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              aria-label="Learn about Next.js (opens in a new tab)"
            >
              Learn Next.js
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
