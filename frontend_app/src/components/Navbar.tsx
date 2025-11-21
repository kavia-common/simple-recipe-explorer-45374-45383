"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useItems } from "@/context/ItemsProvider";
import { Heart } from "lucide-react";

/**
 * PUBLIC_INTERFACE
 * Navbar
 * Top navigation bar with branding for the Ocean Professional theme.
 * Displays favorites count badge.
 */
export default function Navbar() {
  const pathname = usePathname();
  const { count } = useItems();

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
            <button
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Favorites (${count} items)`}
              title="View favorites"
            >
              <Heart 
                className="w-5 h-5" 
                style={{ color: "var(--color-primary)" }}
                fill={count > 0 ? "var(--color-primary)" : "none"}
              />
              {count > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                  aria-hidden="true"
                >
                  {count}
                </span>
              )}
            </button>
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
