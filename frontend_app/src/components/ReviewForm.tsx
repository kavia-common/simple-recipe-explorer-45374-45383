"use client";

import { useState } from 'react';
import { useSubmitReview } from '@/lib/reviews';
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { type Review } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface ReviewFormProps {
  recipeId: string;
  onReviewSubmit: (newReview: Review) => void;
}

const ReviewForm = ({ recipeId, onReviewSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const { submitReview, isSubmitting, error: submitError } = useSubmitReview({
    recipeId,
    onSuccess: (newReview) => {
      onReviewSubmit(newReview);
      setRating(0);
      setComment('');
      setName('');
      setFormError(null);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (rating === 0) {
      setFormError('Please select a rating.');
      return;
    }
    if (!isPublic && process.env.NEXT_PUBLIC_API_BASE) {
      setFormError('Only public reviews can be submitted at this time.');
      return;
    }

    await submitReview({ rating, comment, name });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Your Rating</Label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="What did you think of the recipe?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              minLength={10}
              maxLength={500}
              aria-label="Review comment"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Your Name (Optional)</Label>
            <Input
              id="name"
              placeholder="Anonymous"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isPublic" checked={isPublic} onCheckedChange={(checked) => setIsPublic(Boolean(checked))} />
            <Label htmlFor="isPublic" className="text-sm font-normal">Post review publicly</Label>
          </div>
           { !isPublic && (
            <p className="text-sm text-muted-foreground">
              {process.env.NEXT_PUBLIC_API_BASE
                ? "Note: Only public reviews are supported. This review will not be submitted."
                : "Note: All reviews are public in this demonstration."
              }
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" disabled={isSubmitting || (process.env.NEXT_PUBLIC_API_BASE ? !isPublic : false)}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
          {(formError || submitError) && (
            <p className="text-sm text-destructive" role="alert">
              {formError || submitError}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReviewForm;
