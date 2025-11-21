"use client";

import { useReviews } from '@/lib/reviews';
import { type Recipe } from '@/lib/types';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import StarRating from '@/components/StarRating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewsSectionProps {
  recipe: Recipe;
}

const ReviewsSection = ({ recipe }: ReviewsSectionProps) => {
  const { reviews, isLoading, error, addReview } = useReviews(recipe.id, recipe.reviews);

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <section aria-labelledby="reviews-heading" className="space-y-8">
       <Card>
        <CardHeader>
          <h2 id="reviews-heading" className="text-3xl font-bold tracking-tight">
            Ratings & Reviews
          </h2>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center">
             <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
             <div className="mt-1">
                <StarRating rating={averageRating} isInteractive={false} />
             </div>
             <p className="text-sm text-muted-foreground mt-2">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
          </div>
           {/* Placeholder for rating distribution chart */}
        </CardContent>
      </Card>

      <ReviewForm recipeId={recipe.id} onReviewSubmit={addReview} />

      {isLoading && <p>Loading reviews...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {!isLoading && !error && <ReviewList reviews={reviews} />}
    </section>
  );
};

export default ReviewsSection;
