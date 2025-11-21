"use client";

import { useEffect, useMemo, useState } from "react";
import { getRecipes } from "@/lib/api";
import type { Recipe } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import RecipeGrid from "@/components/RecipeGrid";

export default function Home() {
  const [all, setAll] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const recipes = await getRecipes();
      if (!active) return;
      setAll(recipes);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((r) => {
      const inTitle = r.name.toLowerCase().includes(q);
      const inDesc = r.description.toLowerCase().includes(q);
      const inIngr = r.ingredients.some((i) =>
        i.toLowerCase().includes(q)
      );
      const inTags = r.tags.some((t) => t.toLowerCase().includes(q));
      return inTitle || inDesc || inIngr || inTags;
    });
  }, [all, query]);

  return (
    <div className="flex flex-col gap-6">
      <section className="card p-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
              Explore Recipes
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(17,24,39,0.7)" }}>
              Search by title, ingredient, or tag. Click a recipe to view details.
            </p>
          </div>
          <div className="md:min-w-[360px]">
            <SearchBar onQueryChange={setQuery} />
          </div>
        </div>
      </section>

      {loading ? (
        <section className="card p-8">
          <p style={{ color: "rgba(17,24,39,0.7)" }}>Loading recipes…</p>
        </section>
      ) : (
        <section>
          <RecipeGrid recipes={filtered} />
        </section>
      )}
    </div>
  );
}
