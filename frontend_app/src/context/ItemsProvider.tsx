"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ItemsContextType {
  items: Set<string>;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  count: number;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const STORAGE_KEY = 'ocean-recipes-favorites';

/**
 * PUBLIC_INTERFACE
 * ItemsProvider
 * Provides client-side favorites/cart functionality with localStorage persistence.
 * Exposes addItem, removeItem, hasItem, and count for managing favorite recipes.
 */
export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(new Set(Array.isArray(parsed) ? parsed : []));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
    setMounted(true);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(items)));
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }
    }
  }, [items, mounted]);

  const addItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const hasItem = useCallback((id: string) => {
    return items.has(id);
  }, [items]);

  const count = items.size;

  return (
    <ItemsContext.Provider value={{ items, addItem, removeItem, hasItem, count }}>
      {children}
    </ItemsContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useItems
 * Hook to access the items context for favorites/cart management.
 * @returns ItemsContextType with addItem, removeItem, hasItem, and count methods.
 */
export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}
