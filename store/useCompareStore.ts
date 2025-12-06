import { create } from "zustand";
import { apiHelpers } from "@/lib/axios";

// ----------------- TYPES -----------------
interface CompareStore {
  products: string[];                  // textboxes
  addProduct: (val?: string) => void;
  updateProduct: (index: number, val: string) => void;
  removeProduct: (index: number) => void;

  resultHtml: string;                  // API response HTML
  loading: boolean;
  error: string | null;

  compareProducts: () => Promise<void>; // API CALL
  reset: () => void;
}

// ----------------- STORE -----------------
export const useCompareStore = create<CompareStore>((set, get) => ({
  products: [],
  resultHtml: "",
  loading: false,
  error: null,

  // Add textbox
  addProduct: (val = "") =>
    set((state) => ({ products: [...state.products, val] })),

  // Update textbox value
  updateProduct: (index, val) =>
    set((state) => {
      const updated = [...state.products];
      updated[index] = val;
      return { products: updated };
    }),

  // Remove textbox
  removeProduct: (index) =>
    set((state) => ({
      products: state.products.filter((_, i) => i !== index),
    })),

  // -----------------------------
  // API CALL: /product/comparison
  // -----------------------------
  compareProducts: async () => {
    const { products } = get();

    set({ loading: true, error: null });

    try {

      if (products.length && products[0] === "") {
        set({
          loading: false, error: "Please add products name"
        });
      } else {

        const payload = { products }; // API requires {products: []}

        const response: any = await apiHelpers.post(
          "/product/comparison",
          payload
        );

        set({
          resultHtml: response.data ?? "",
          loading: false,
        });
      }
    } catch (err: any) {
      set({
        error: err.message || "Failed to compare products",
        loading: false,
      });
    }
  },

  // Reset all states
  reset: () =>
    set({
      products: [""],
      resultHtml: "",
      loading: false,
      error: null,
    }),
}));
