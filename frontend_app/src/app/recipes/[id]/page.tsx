import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById, getRecipes } from "@/lib/api";
import type { Recipe } from "@/data/recipes";

/**
 * PUBLIC_INTERFACE
 * generateStaticParams
 * Required for output: "export" with dynamic routes. Produces static paths from available recipes.
 */
export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((r) => ({ id: r.id }));
}

/**
 * Attempt to generate metadata server-side if route params are available.
 * Note: When output: "export", dynamic params may be limited, so we fall back gracefully.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const recipe = await getRecipeById(id);
    if (recipe) {
      return {
        title: `${recipe.title} · Ocean Recipes`,
        description: recipe.description,
        openGraph: {
          title: recipe.title,
          description: recipe.description,
          images: [{ url: recipe.image }],
          type: "article",
        },
      };
    }
  } catch {
    // ignore
  }
  return {
    title: "Recipe · Ocean Recipes",
  };
}

/**
 * Recipe detail page shows image, metadata, ingredients and steps.
 */
export default async function RecipeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe: Recipe | undefined = await getRecipeById(id);
  if (!recipe) return notFound();

  return (
    <div className="grid gap-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="font-medium">
            {recipe.title}
          </li>
        </ol>
      </nav>

      <article className="card overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recipe.image}
              alt={`Image of ${recipe.title}`}
              className="w-full h-full object-cover"
              style={{ minHeight: 280 }}
            />
          </div>
          <div className="p-6 flex flex-col gap-4">
            <header className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                {recipe.title}
              </h1>
              <p className="text-sm" style={{ color: "rgba(17,24,39,0.7)" }}>
                {recipe.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {recipe.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </header>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <InfoPill label="Time" value={recipe.time} />
              <InfoPill label="Servings" value={String(recipe.servings)} />
              <InfoPill label="Difficulty" value={recipe.difficulty} />
            </div>

            <section className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Steps</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </section>

            <div className="pt-2">
              <Link href="/" className="btn">
                ← Back to recipes
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="px-3 py-2 rounded-lg"
      style={{
        background: "rgba(37,99,235,0.08)",
        color: "var(--color-text)",
        border: "1px solid rgba(37,99,235,0.15)",
      }}
      aria-label={`${label}: ${value}`}
    >
      <span className="text-[11px] uppercase tracking-wide opacity-70">
        {label}
      </span>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
