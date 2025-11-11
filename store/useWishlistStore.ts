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
          console.log("✅ Added to wishlist:", updated);
          return { wishlist: updated };
        }),

      removeFromWishlist: (id) =>
        set((state) => {
          const updated = state.wishlist.filter((x) => x !== id);
          console.log("🗑 Removed from wishlist:", updated);
          return { wishlist: updated };
        }),

      toggleWishlist: (id) =>
        set((state) => {
          const updated = state.wishlist.includes(id)
            ? state.wishlist.filter((x) => x !== id)
            : [...state.wishlist, id];
          console.log("❤️ Wishlist toggled:", updated);
          return { wishlist: updated };
        }),

      isInWishlist: (id) => get().wishlist.includes(id),

      fetchWishlistProducts: async (baseUrl: string, page = 1) => {
        const { wishlist } = get();
        if (!wishlist || wishlist.length === 0) {
          console.warn("⚠️ Empty wishlist, skipping fetch");
          set({ products: [], totalPages: 0 });
          return;
        }

        const totalPages = Math.ceil(wishlist.length / PAGE_SIZE);
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const currentIds = wishlist.slice(start, end);

        console.log("📦 Sending productIds:", currentIds);

        set({ loading: true });

        try {
          const res = await fetch(`${baseUrl}/product/wishlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // ⚠️ Change this key to match your backend — either "productId" or "productIds"
            body: JSON.stringify({ productId: currentIds }),
          });

          const data = await res.json();
          console.log("📥 API Response:", data);

          if (data?.statusCode === 200 && Array.isArray(data.data)) {
            set({
              products: data.data,
              totalPages,
              currentPage: page,
              loading: false,
            });
          } else {
            console.warn("⚠️ Unexpected API format:", data);
            set({ products: [], loading: false });
          }
        } catch (err) {
          console.error("🚨 Error fetching wishlist:", err);
          set({ loading: false });
        }
      },
    }),
    {
      name: "wishlist", // must match your old localStorage key
    }
  )
);
