"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getRecipes } from "@/lib/api";
import type { Recipe } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import RecipeGrid from "@/components/RecipeGrid";
import SortSelector from "@/components/SortSelector";

type SortOption = "default" | "price-asc" | "price-desc";

function HomeContent() {
  const [all, setAll] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>("default");
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize sort from URL params
  useEffect(() => {
    const urlSort = searchParams.get("sort") as SortOption;
    if (urlSort && ["default", "price-asc", "price-desc"].includes(urlSort)) {
      setSortOption(urlSort);
    }
  }, [searchParams]);

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

  // Update URL when sort changes
  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === "default") {
      params.delete("sort");
    } else {
      params.set("sort", newSort);
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl);
  };

  const processedRecipes = useMemo(() => {
    // First filter by search query
    const q = query.trim().toLowerCase();
    let filtered = all;
    
    if (q) {
      filtered = all.filter((r) => {
        const inTitle = r.name.toLowerCase().includes(q);
        const inDesc = r.description.toLowerCase().includes(q);
        const inIngr = r.ingredients.some((i) =>
          i.toLowerCase().includes(q)
        );
        const inTags = r.tags.some((t) => t.toLowerCase().includes(q));
        return inTitle || inDesc || inIngr || inTags;
      });
    }
    
    // Then apply sorting
    if (sortOption === "price-asc") {
      return [...filtered].sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : Infinity;
        const priceB = typeof b.price === 'number' ? b.price : Infinity;
        return priceA - priceB;
      });
    } else if (sortOption === "price-desc") {
      return [...filtered].sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : -Infinity;
        const priceB = typeof b.price === 'number' ? b.price : -Infinity;
        return priceB - priceA;
      });
    }
    
    return filtered;
  }, [all, query, sortOption]);

  return (
    <div className="flex flex-col gap-6">
      <section className="card p-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
              Explore Recipes
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(17,24,39,0.7)" }}>
              Search by title, ingredient, or tag. Sort by price to find the best deals.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1 md:min-w-[360px]">
              <SearchBar onQueryChange={setQuery} />
            </div>
            <div className="md:min-w-[200px]">
              <SortSelector 
                onSortChange={handleSortChange} 
                currentSort={sortOption}
              />
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="card p-8">
          <p style={{ color: "rgba(17,24,39,0.7)" }}>Loading recipes…</p>
        </section>
      ) : (
        <section>
          <RecipeGrid recipes={processedRecipes} />
        </section>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex flex-col gap-6">
      <section className="card p-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
              Explore Recipes
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(17,24,39,0.7)" }}>
              Search by title, ingredient, or tag. Sort by price to find the best deals.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1 md:min-w-[360px]">
              <div className="input animate-pulse bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="md:min-w-[200px]">
              <div className="input animate-pulse bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="card p-8">
        <p style={{ color: "rgba(17,24,39,0.7)" }}>Loading recipes…</p>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent />
    </Suspense>
  );
}
