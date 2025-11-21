"use client";

import Link from "next/link";
import Image from "next/image";
import type { Recipe } from "@/lib/types";
import { useItems } from "@/context/ItemsProvider";
import { Heart } from "lucide-react";

/**
 * PUBLIC_INTERFACE
 * RecipeCard
 * A single recipe preview card with image, title, description and tags.
 * Includes add/remove to favorites button and displays image quality indicator.
 */
export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { hasItem, addItem, removeItem } = useItems();
  const isFavorite = hasItem(recipe.id);
  const imageQuality = 75;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeItem(recipe.id);
    } else {
      addItem(recipe.id);
    }
  };

  return (
    <article className="card overflow-hidden h-full flex flex-col group">
      <Link href={`/recipes/${recipe.id}`} className="block h-full flex flex-col">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={recipe.image}
            alt={`Image of ${recipe.name}`}
            fill
            quality={imageQuality}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={isFavorite ? `Remove ${recipe.name} from favorites` : `Add ${recipe.name} to favorites`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className="w-5 h-5"
                style={{ color: "var(--color-primary)" }}
                fill={isFavorite ? "var(--color-primary)" : "none"}
              />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
            Quality: {imageQuality}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1">
          <h3 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
            {recipe.name}
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text)", opacity: 0.7 }}>
            {recipe.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {recipe.tags.slice(0, 3).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 mt-4">
            <div className="text-xs" style={{ color: "var(--color-text)", opacity: 0.6 }}>
              🕐 {recipe.cookTime} · 👥 {recipe.servings} · 🧑‍🍳 {recipe.difficulty}
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="text-lg font-bold px-2 py-1 rounded-md bg-gradient-to-r from-blue-500/10 to-amber-500/10 border border-blue-500/20 dark:border-blue-400/20"
                style={{ color: "var(--color-primary)" }}
              >
                ${typeof recipe.price === 'number' ? recipe.price.toFixed(2) : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
