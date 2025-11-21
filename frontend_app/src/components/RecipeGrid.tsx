import RecipeCard from "./RecipeCard";
import type { Recipe } from "@/lib/types";

/**
 * PUBLIC_INTERFACE
 * RecipeGrid
 * Responsive grid to display recipe cards.
 */
export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  if (!recipes.length) {
    return (
      <div className="card p-10 text-center">
        <p style={{ color: "rgba(17,24,39,0.7)" }}>
          No recipes match your search. Try a different keyword.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      }}
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
