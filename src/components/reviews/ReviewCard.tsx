import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Review } from "@/store/reviewsStore";

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full bg-muted"
                    />
                    <div>
                        <p className="font-medium text-sm">{review.userName}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating
                                    ? "text-champagne fill-current"
                                    : "text-muted-foreground"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Comment */}
            <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
            </p>
        </div>
    );
}
