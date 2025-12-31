import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import api from "@/lib/api";

interface Review {
    id: number;
    user_name: string;
    user_avatar: string | null;
    rating: number;
    comment: string;
    created_at: string;
    verified_purchase: boolean;
}

interface ReviewSectionProps {
    productId: number;
    productSlug: string;
}

export function ReviewSection({ productId, productSlug }: ReviewSectionProps) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    // Fetch reviews - call this when component mounts or when you want to refresh
    const fetchReviews = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/products/${productSlug}/reviews`);
            setReviews(response.data.reviews || response.data || []);
        } catch (err) {
            // API not implemented yet - show empty state
            console.log("Reviews API not available yet");
            setReviews([]);
        } finally {
            setIsLoading(false);
            setHasLoadedOnce(true);
        }
    };

    // Load reviews on mount
    useEffect(() => {
        fetchReviews();
    }, [productSlug]);

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please log in to leave a review");
            return;
        }

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        try {
            setIsSubmitting(true);
            await api.post(`/products/${productSlug}/reviews`, {
                rating,
                comment: comment.trim(),
            });

            toast.success("Review submitted!", {
                description: "Thank you for your feedback.",
            });

            setRating(0);
            setComment("");
            fetchReviews(); // Refresh reviews
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to submit review";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="mt-16 pt-16 border-t border-border">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="heading-medium">Customer Reviews</h2>
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= Math.round(averageRating)
                                            ? "text-champagne fill-champagne"
                                            : "text-muted-foreground"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {averageRating.toFixed(1)} out of 5 ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Review Form */}
            {user ? (
                <div className="mb-10 p-6 rounded-xl bg-secondary/30">
                    <h3 className="font-medium mb-4">Write a Review</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        {/* Star Rating Selector */}
                        <div>
                            <label className="text-sm text-muted-foreground block mb-2">Your Rating</label>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="p-1 transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`h-6 w-6 transition-colors ${star <= (hoverRating || rating)
                                                ? "text-champagne fill-champagne"
                                                : "text-muted-foreground"
                                                }`}
                                        />
                                    </button>
                                ))}
                                {rating > 0 && (
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {rating} star{rating !== 1 ? "s" : ""}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="text-sm text-muted-foreground block mb-2">Your Review</label>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience with this product..."
                                rows={4}
                                className="resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="luxury"
                            disabled={isSubmitting || rating === 0 || !comment.trim()}
                        >
                            {isSubmitting ? (
                                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
                            ) : (
                                "Submit Review"
                            )}
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="mb-10 p-6 rounded-xl bg-secondary/30 text-center">
                    <p className="text-muted-foreground mb-4">Please log in to leave a review</p>
                    <Button variant="luxury-outline" asChild>
                        <a href="/login">Log In</a>
                    </Button>
                </div>
            )}

            {/* Reviews List */}
            {isLoading && !hasLoadedOnce ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-champagne" />
                </div>
            ) : reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="p-6 rounded-xl border border-border">
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                {review.user_avatar ? (
                                    <img
                                        src={review.user_avatar}
                                        alt={review.user_name}
                                        className="w-10 h-10 rounded-full bg-secondary object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                )}

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <span className="font-medium">{review.user_name}</span>
                                            {review.verified_purchase && (
                                                <span className="ml-2 text-xs text-champagne bg-champagne/10 px-2 py-0.5 rounded">
                                                    Verified Purchase
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(review.created_at)}
                                        </span>
                                    </div>

                                    {/* Stars */}
                                    <div className="flex items-center gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${star <= review.rating
                                                    ? "text-champagne fill-champagne"
                                                    : "text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-muted-foreground">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
}
