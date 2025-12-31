import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
}

interface WishlistState {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (itemId: string) => void;
    toggleItem: (item: WishlistItem) => void;
    isInWishlist: (itemId: string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) =>
                set((state) => {
                    if (state.items.find((i) => i.id === item.id)) {
                        return state; // Already exists
                    }
                    return { items: [...state.items, item] };
                }),
            removeItem: (itemId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== itemId),
                })),
            toggleItem: (item) => {
                const { items } = get();
                if (items.find((i) => i.id === item.id)) {
                    set({ items: items.filter((i) => i.id !== item.id) });
                } else {
                    set({ items: [...items, item] });
                }
            },
            isInWishlist: (itemId) => {
                return get().items.some((item) => item.id === itemId);
            },
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage', // localStorage key
        }
    )
);
