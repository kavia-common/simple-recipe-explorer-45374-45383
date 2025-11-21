"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  isInteractive?: boolean;
  size?: number;
}

const StarRating = ({ rating, setRating, isInteractive = true, size = 24 }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    if (isInteractive && setRating) {
      setRating(rate);
    }
  };

  const handleMouseEnter = (rate: number) => {
    if (isInteractive) {
      setHoverRating(rate);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRating(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "cursor-pointer transition-colors",
            !isInteractive && "cursor-default"
          )}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          disabled={!isInteractive}
        >
          <Star
            size={size}
            className={cn(
              "stroke-1",
              (hoverRating >= star || rating >= star)
                ? "text-secondary fill-secondary"
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
