import { type Review } from '@/lib/types';
import StarRating from '@/components/StarRating';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!reviews || reviews.length === 0) {
    return (
       <Card className="mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="flex flex-row justify-between items-start">
             <div>
                <CardTitle className="text-lg">{review.name || 'Anonymous'}</CardTitle>
                <time dateTime={review.createdAt} className="text-sm text-muted-foreground">
                  {formatDate(review.createdAt)}
                </time>
              </div>
              <div className="flex items-center gap-4">
                <StarRating rating={review.rating} isInteractive={false} size={20} />
                <Badge variant="success">Public</Badge>
              </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;
