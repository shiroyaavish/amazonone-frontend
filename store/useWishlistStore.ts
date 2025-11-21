import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiHelpers } from "@/lib/axios";

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
  availability: boolean;
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
  fetchWishlistProducts: (page?: number) => Promise<void>;
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
          return { wishlist: [...state.wishlist, id] };
        }),

      removeFromWishlist: (id) =>
        set((state) => {
          return {
            wishlist: state.wishlist.filter((x) => x !== id),
            products: state.products.filter((x) => x._id !== id),
          };
        }),

      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((x) => x !== id)
            : [...state.wishlist, id],
        })),

      isInWishlist: (id) => get().wishlist.includes(id),

      // ✅ Axios version
      fetchWishlistProducts: async (page = 1) => {
        const { wishlist } = get();

        if (!wishlist.length) {
          set({ products: [], totalPages: 0 });
          return;
        }

        const totalPages = Math.ceil(wishlist.length / PAGE_SIZE);
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const currentIds = wishlist.slice(start, end);

        set({ loading: true });

        try {
          const data: any = await apiHelpers.post("/product/wishlist", {
            productId: currentIds,
          });

          if (Array.isArray(data.data)) {
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
    { name: "wishlist" }
  )
);
