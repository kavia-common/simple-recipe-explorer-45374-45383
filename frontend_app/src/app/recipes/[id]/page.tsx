import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById, getAllRecipeIds } from "@/lib/api";
import type { Recipe } from "@/lib/types";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import RecipeDetailClient from "@/components/RecipeDetailClient";


/**
 * PUBLIC_INTERFACE
 * generateStaticParams
 * Required for output: "export" with dynamic routes. Produces static paths from available recipes.
 */
export async function generateStaticParams() {
  const ids = getAllRecipeIds();
  return ids.map((id) => ({ id }));
}

/**
 * Attempt to generate metadata server-side if route params are available.
 * Note: When output: "export", dynamic params may be limited, so we fall back gracefully.
 */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const recipe = await getRecipeById(params.id);
    if (recipe) {
      return {
        title: `${recipe.name} · Ocean Recipes`,
        description: recipe.description,
        openGraph: {
          title: recipe.name,
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
  params: { id: string };
}) {
  const recipe: Recipe | undefined = await getRecipeById(params.id);
  if (!recipe) return notFound();

  const imageQuality = 80;

  return (
    <div className="container py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
            {recipe.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {recipe.description}
          </p>
        </header>

        <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={recipe.image}
            alt={`Image of ${recipe.name}`}
            fill
            quality={imageQuality}
            style={{ objectFit: 'cover' }}
            className="transform group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-white text-sm font-medium shadow-lg">
            Quality: {imageQuality}
          </div>
          <RecipeDetailClient recipeId={recipe.id} recipeName={recipe.name} />
        </div>

        <div className="flex items-center justify-center gap-8 md:gap-12 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <Clock className="w-6 h-6 text-primary" />
                <span className="font-medium">{recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <Users className="w-6 h-6 text-primary" />
                <span className="font-medium">{recipe.servings} Servings</span>
            </div>
        </div>


        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-200">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12">
          <ReviewsSection recipe={recipe} />
        </div>

      </article>
    </div>
  );
}
