import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  _id: string;
  slug: string;
  title: string;
  brand: string;
  imageUrls: string[];
  price: {
    current: number;
    original: number;
  };
}

interface WishlistState {
  wishlist: string[];
  products: Product[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  fetchWishlistProducts: (baseUrl: string, page?: number) => Promise<void>;
}

const PAGE_SIZE = 25;

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      products: [],
      totalPages: 0,
      currentPage: 1,
      loading: false,

      addToWishlist: (id) =>
        set((state) => {
          if (state.wishlist.includes(id)) return state;
          const updated = [...state.wishlist, id];
          return { wishlist: updated };
        }),

      removeFromWishlist: (id) =>
        set((state) => {
          const updated = state.wishlist.filter((x) => x !== id);
          const products = state.products.filter((x) => x._id !== id);
          return { ...state, wishlist: updated, products };
        }),

      toggleWishlist: (id) =>
        set((state) => {
          const updated = state.wishlist.includes(id)
            ? state.wishlist.filter((x) => x !== id)
            : [...state.wishlist, id];
          return { wishlist: updated };
        }),

      isInWishlist: (id) => get().wishlist.includes(id),

      fetchWishlistProducts: async (baseUrl: string, page = 1) => {
        const { wishlist } = get();
        if (!wishlist || wishlist.length === 0) {
          set({ products: [], totalPages: 0 });
          return;
        }

        const totalPages = Math.ceil(wishlist.length / PAGE_SIZE);
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const currentIds = wishlist.slice(start, end);

        set({ loading: true });

        try {
          const res = await fetch(`${baseUrl}/product/wishlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: currentIds }),
          });

          const data = await res.json();

          if (data?.statusCode === 200 && Array.isArray(data.data)) {
            set({
              products: data.data,
              totalPages,
              currentPage: page,
              loading: false,
            });
          } else {
            set({ products: [], loading: false });
          }
        } catch (err) {
          set({ loading: false });
        }
      },
    }),
    {
      name: "wishlist",
    }
  )
);
