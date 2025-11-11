import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  wishlist: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      // ✅ Add item only if not already there
      addToWishlist: (id) => {
        const current = get().wishlist;
        if (!current.includes(id)) {
          const updated = [...current, id];
          set({ wishlist: updated });
          console.log("✅ Added to wishlist:", updated);
        }
      },

      // ✅ Remove item safely
      removeFromWishlist: (id) => {
        const updated = get().wishlist.filter((x) => x !== id);
        set({ wishlist: updated });
        console.log("🗑 Removed from wishlist:", updated);
      },

      // ✅ Toggle wishlist (like/unlike)
      toggleWishlist: (id) => {
        const current = get().wishlist;
        const updated = current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id];
        set({ wishlist: updated });
        console.log("❤️ Wishlist toggled:", updated);
      },

      // ✅ Utility: check if item exists
      isInWishlist: (id) => get().wishlist.includes(id),

      // ✅ Clear all
      clearWishlist: () => {
        set({ wishlist: [] });
        console.log("🧹 Wishlist cleared");
      },
    }),
    {
      name: "wishlist", // LocalStorage key
    }
  )
);
