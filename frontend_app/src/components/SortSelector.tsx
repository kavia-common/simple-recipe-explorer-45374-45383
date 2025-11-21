"use client";

import { useState, useEffect } from "react";

type SortOption = "default" | "price-asc" | "price-desc";

type Props = {
  onSortChange: (sort: SortOption) => void;
  currentSort?: SortOption;
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * SortSelector
 * A dropdown component for selecting sort options with accessibility support.
 */
export default function SortSelector({ onSortChange, currentSort = "default", className = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "default" as const, label: "Default Order" },
    { value: "price-asc" as const, label: "Price: Low to High" },
    { value: "price-desc" as const, label: "Price: High to Low" },
  ];

  const currentOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-sort-selector]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleOptionSelect = (value: SortOption) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} data-sort-selector>
      <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
        Sort by
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="input w-full flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Sort recipes. Currently sorted by: ${currentOption.label}`}
        type="button"
      >
        <span>{currentOption.label}</span>
        <span 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50">
          <ul
            className="card border border-black/10 dark:border-white/10 shadow-lg max-h-48 overflow-auto"
            role="listbox"
            aria-label="Sort options"
          >
            {sortOptions.map((option) => (
              <li key={option.value} role="none">
                <button
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-amber-500/5 transition-colors ${
                    currentSort === option.value 
                      ? 'bg-gradient-to-r from-blue-500/10 to-amber-500/10 font-medium' 
                      : ''
                  }`}
                  style={{ color: "var(--color-text)" }}
                  role="option"
                  aria-selected={currentSort === option.value}
                  type="button"
                >
                  {option.label}
                  {currentSort === option.value && (
                    <span className="ml-2" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
