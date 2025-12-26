import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

interface ReviewsState {
    reviews: Review[];
    addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
    getProductReviews: (productId: string) => Review[];
    getAverageRating: (productId: string) => number;
    hasUserReviewed: (productId: string, userId: string) => boolean;
}

export const useReviewsStore = create<ReviewsState>()(
    persist(
        (set, get) => ({
            reviews: [],

            addReview: (reviewData) => {
                const newReview: Review = {
                    ...reviewData,
                    id: crypto.randomUUID(),
                    createdAt: new Date(),
                };
                set((state) => ({
                    reviews: [newReview, ...state.reviews],
                }));
            },

            getProductReviews: (productId) => {
                return get().reviews
                    .filter((review) => review.productId === productId)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            },

            getAverageRating: (productId) => {
                const productReviews = get().getProductReviews(productId);
                if (productReviews.length === 0) return 0;
                const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
                return Math.round((sum / productReviews.length) * 10) / 10;
            },

            hasUserReviewed: (productId, userId) => {
                return get().reviews.some(
                    (review) => review.productId === productId && review.userId === userId
                );
            },
        }),
        {
            name: 'mercato-reviews',
            // Handle date serialization
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    const data = JSON.parse(str);
                    // Convert date strings back to Date objects
                    if (data.state?.reviews) {
                        data.state.reviews = data.state.reviews.map((review: Review) => ({
                            ...review,
                            createdAt: new Date(review.createdAt),
                        }));
                    }
                    return data;
                },
                setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);
