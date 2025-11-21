"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  onQueryChange: (q: string) => void;
  placeholder?: string;
};

/**
 * PUBLIC_INTERFACE
 * SearchBar
 * Client-side search input with debounced updates.
 */
export default function SearchBar({ onQueryChange, placeholder }: Props) {
  const [value, setValue] = useState("");

  // Debounce to reduce renders on large lists
  useEffect(() => {
    const t = setTimeout(() => onQueryChange(value), 200);
    return () => clearTimeout(t);
  }, [value, onQueryChange]);

  const hint = useMemo(
    () => placeholder ?? "Search by recipe or ingredient...",
    [placeholder]
  );

  return (
    <div className="w-full">
      <label className="sr-only" htmlFor="search">
        Search recipes
      </label>
      <div className="relative">
        <input
          id="search"
          className="input pl-11 pr-12"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={hint}
          aria-label="Search recipes by title or ingredient"
        />
        <span
          aria-hidden
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "rgba(17,24,39,0.5)" }}
        >
          🔎
        </span>
        {value && (
          <button
            onClick={() => setValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
            aria-label="Clear search"
            style={{ color: "var(--color-primary)" }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
