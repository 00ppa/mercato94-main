import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
    onSubmit: (rating: number, comment: string) => void;
    isSubmitting?: boolean;
}

export function ReviewForm({ onSubmit, isSubmitting = false }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        if (comment.trim().length < 10) {
            setError("Please write at least 10 characters");
            return;
        }

        onSubmit(rating, comment.trim());
        setRating(0);
        setComment("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-1 transition-transform hover:scale-110"
                        >
                            <Star
                                className={cn(
                                    "h-7 w-7 transition-colors",
                                    star <= (hoveredRating || rating)
                                        ? "text-champagne fill-current"
                                        : "text-muted-foreground"
                                )}
                            />
                        </button>
                    ))}
                    {rating > 0 && (
                        <span className="ml-2 text-sm text-muted-foreground">
                            {rating === 5
                                ? "Excellent!"
                                : rating === 4
                                    ? "Great"
                                    : rating === 3
                                        ? "Good"
                                        : rating === 2
                                            ? "Fair"
                                            : "Poor"}
                        </span>
                    )}
                </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
                <Label htmlFor="review-comment">Your Review</Label>
                <Textarea
                    id="review-comment"
                    placeholder="Share your experience with this product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="resize-none"
                    disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                    {comment.length}/500 characters
                </p>
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Submit */}
            <Button
                type="submit"
                variant="sapphire"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit Review"
                )}
            </Button>
        </form>
    );
}
