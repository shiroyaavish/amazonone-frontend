import { create } from "zustand";

interface Specification {
  key: string;
  value: string;
}

interface Product {
  _id: string;
  slug: string;
  title: string;
  brand: string;
  features: string[];
  affiliateUrl: string;
  imageUrls: string[];
  price: {
    original: number;
    current: number;
    discount?: number;
  };
  rating: {
    average: number;
    count: number;
  };
  specifications?: Specification[];
}

interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProduct: (baseUrl: string, slug: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  product: null,
  loading: false,
  error: null,

  fetchProduct: async (baseUrl, slug) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`${baseUrl}/product/${slug}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.statusCode === 200) {
        set({ product: data.data, loading: false });
      } else {
        throw new Error(data.message || "Product not found");
      }
    } catch (err: any) {
      console.error("Error fetching product:", err);
      set({ error: err.message || "Failed to load product", loading: false });
    }
  },
}));
