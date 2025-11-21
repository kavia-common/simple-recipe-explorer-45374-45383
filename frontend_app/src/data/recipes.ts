import { Recipe } from "@/lib/types";

export const sampleRecipes: Omit<Recipe, 'cookTime'>[] = [
  {
    id: "lemon-garlic-salmon",
    name: "Lemon Garlic Salmon",
    description:
      "Pan-seared salmon finished with a bright lemon-garlic butter sauce.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    ingredients: [
      "2 salmon fillets",
      "2 tbsp butter",
      "2 cloves garlic, minced",
      "1 lemon (juice and zest)",
      "Salt & pepper",
      "Fresh parsley",
    ],
    instructions: [
      "Pat salmon dry, season with salt and pepper.",
      "Sear salmon in a hot pan with a little oil, 3-4 min per side.",
      "Remove salmon; add butter and garlic to pan and sauté 30 sec.",
      "Add lemon juice and zest; simmer 1 min and pour over salmon.",
      "Garnish with parsley and serve.",
    ],
    servings: "2",
    reviews: [],
  },
  {
    id: "creamy-mushroom-pasta",
    name: "Creamy Mushroom Pasta",
    description:
      "Silky pasta tossed in a creamy garlic mushroom sauce with parmesan.",
    image:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1600&auto=format&fit=crop",
    ingredients: [
      "200g pasta",
      "250g mushrooms, sliced",
      "2 cloves garlic, minced",
      "1 cup cream",
      "1/2 cup grated parmesan",
      "2 tbsp olive oil",
      "Salt & pepper",
      "Parsley to serve",
    ],
    instructions: [
      "Cook pasta in salted water until al dente, reserve 1/4 cup water.",
      "Sauté mushrooms in olive oil until golden.",
      "Add garlic and cook 30 sec until fragrant.",
      "Pour in cream; simmer gently 2-3 min.",
      "Toss with pasta, parmesan, and splash of pasta water to emulsify.",
      "Season and garnish with parsley.",
    ],
    servings: "2",
    reviews: [],
  },
  {
    id: "spicy-chicken-tacos",
    name: "Spicy Chicken Tacos",
    description:
      "Juicy, spiced chicken tucked in warm tortillas with crisp toppings.",
    image:
      "https://images.unsplash.com/photo-1604467794349-0b74285de7e9?q=80&w=1600&auto=format&fit=crop",
    ingredients: [
      "400g chicken thighs, sliced",
      "2 tsp chili powder",
      "1 tsp cumin",
      "1 tsp smoked paprika",
      "1 lime",
      "Tortillas",
      "Shredded lettuce, diced tomato, sour cream",
      "Salt & pepper",
    ],
    instructions: [
      "Toss chicken with spices, lime juice, salt and pepper.",
      "Sear in a hot pan until cooked through and lightly charred.",
      "Warm tortillas and assemble with toppings.",
    ],
    servings: "3",
    reviews: [],
  },
];
