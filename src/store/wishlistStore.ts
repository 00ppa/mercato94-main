import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistProduct {
    id: string;
    title: string;
    slug: string;
    price: number;
    currency: string;
    image: string;
    seller: {
        name: string;
        avatar: string;
    };
    category: string;
    rating: number;
}

interface WishlistState {
    items: WishlistProduct[];
    addToWishlist: (product: WishlistProduct) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (product: WishlistProduct) => boolean; // returns true if added, false if removed
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addToWishlist: (product) =>
                set((state) => {
                    if (state.items.some((item) => item.id === product.id)) {
                        return state; // Already in wishlist
                    }
                    return { items: [...state.items, product] };
                }),

            removeFromWishlist: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),

            isInWishlist: (productId) => {
                return get().items.some((item) => item.id === productId);
            },

            toggleWishlist: (product) => {
                const isCurrentlyInWishlist = get().isInWishlist(product.id);
                if (isCurrentlyInWishlist) {
                    get().removeFromWishlist(product.id);
                    return false;
                } else {
                    get().addToWishlist(product);
                    return true;
                }
            },

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'mercato-wishlist', // localStorage key
        }
    )
);
