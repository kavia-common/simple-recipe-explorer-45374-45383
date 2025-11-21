"use client";

import { useItems } from "@/context/ItemsProvider";
import { Heart } from "lucide-react";

/**
 * PUBLIC_INTERFACE
 * RecipeDetailClient
 * Client-side component for recipe detail page to handle favorites toggle.
 * Positioned absolutely over the recipe image.
 */
export default function RecipeDetailClient({ 
  recipeId, 
  recipeName 
}: { 
  recipeId: string; 
  recipeName: string;
}) {
  const { hasItem, addItem, removeItem } = useItems();
  const isFavorite = hasItem(recipeId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeItem(recipeId);
    } else {
      addItem(recipeId);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={handleToggleFavorite}
        className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={isFavorite ? `Remove ${recipeName} from favorites` : `Add ${recipeName} to favorites`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className="w-6 h-6"
          style={{ color: "var(--color-primary)" }}
          fill={isFavorite ? "var(--color-primary)" : "none"}
        />
      </button>
    </div>
  );
}
