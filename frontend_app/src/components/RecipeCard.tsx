import Link from "next/link";
import type { Recipe } from "@/data/recipes";

/**
 * PUBLIC_INTERFACE
 * RecipeCard
 * A single recipe preview card with image, title, description and tags.
 */
export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="card overflow-hidden h-full flex flex-col">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={`Image of ${recipe.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
          {recipe.title}
        </h3>
        <p className="text-sm" style={{ color: "rgba(17,24,39,0.75)" }}>
          {recipe.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {recipe.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs" style={{ color: "rgba(17,24,39,0.7)" }}>
            ⏱ {recipe.time} · 👥 {recipe.servings} · 🧪 {recipe.difficulty}
          </div>
          <Link href={`/recipes/${recipe.id}`} className="btn text-sm px-3 py-2">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
