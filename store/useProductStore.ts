import { create } from "zustand";

// ---------- Types ----------
interface Specification {
  key: string;
  details: { key: string; value: string }[];
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
  isPopular?: boolean;
  bestSeller?: boolean;
  newRelease?: boolean;
}

// ---------- Store ----------
interface ProductStore {
  // ✅ Single product
  product: Product | null;
  productLoading: boolean;
  productError: string | null;

  // ✅ Product list
  products: Product[];
  listLoading: boolean;
  listError: string | null;

  // ✅ Pagination + filters
  totalPages: number;
  currentPage: number;
  category: string[];
  isPopular: boolean;
  bestSeller: boolean;
  newRelease: boolean;
  minPrice: string;
  maxPrice: string;
  sort: string;
  limit: number;

  // ✅ Actions
  setFilter: (key: keyof ProductStore, value: any) => void;
  resetFilters: () => void;
  fetchProducts: (baseUrl: string, page?: number) => Promise<void>;
  findOne: (baseUrl: string, slug: string) => Promise<void>;
}

// ---------- Implementation ----------
export const useProductStore = create<ProductStore>((set, get) => ({
  // --- Single Product ---
  product: null,
  productLoading: false,
  productError: null,

  // --- Product List ---
  products: [],
  listLoading: false,
  listError: null,

  // --- Pagination + Filters ---
  totalPages: 1,
  currentPage: 1,
  category: [],
  isPopular: false,
  bestSeller: false,
  newRelease: false,
  minPrice: "",
  maxPrice: "",
  sort: "newest",
  limit: 25,

  // --- Actions ---
  setFilter: (key, value) => set({ [key]: value }),

  resetFilters: () =>
    set({
      category: [],
      isPopular: false,
      bestSeller: false,
      newRelease: false,
      minPrice: "",
      maxPrice: "",
      sort: "newest",
      currentPage: 1,
    }),

  // --- Fetch Product List ---
  fetchProducts: async (baseUrl: string, page = 1) => {
    const {
      category,
      isPopular,
      bestSeller,
      newRelease,
      minPrice,
      maxPrice,
      sort,
      limit,
    } = get();

    set({ listLoading: true, listError: null });

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (category.length > 0) category.forEach((id) => params.append("category", id));
      if (isPopular) params.append("isPopular", "true");
      if (bestSeller) params.append("bestSeller", "true");
      if (newRelease) params.append("newRelease", "true");
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sort) params.append("sort", sort);

      const res = await fetch(`${baseUrl}/product?${params.toString()}`);
      const data = await res.json();

      if (data?.statusCode === 200 && Array.isArray(data.data)) {
        set({
          products: data.data,
          totalPages: data.isNextPageAvailble ? page + 1 : page,
          currentPage: page,
          listLoading: false,
        });
      } else {
        set({
          products: [],
          totalPages: 1,
          currentPage: 1,
          listLoading: false,
        });
      }
    } catch (error: any) {
      console.error("❌ Fetch products error:", error);
      set({ listLoading: false, listError: error.message || "Failed to fetch products." });
    }
  },

  // --- Fetch Single Product ---
  findOne: async (baseUrl, slug) => {
    try {
      set({ productLoading: true, productError: null });

      const res = await fetch(`${baseUrl}/product/${slug}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.statusCode === 200) {
        set({ product: data.data, productLoading: false });
      } else {
        throw new Error(data.message || "Product not found");
      }
    } catch (err: any) {
      console.error("Error fetching product:", err);
      set({ productError: err.message || "Failed to load product", productLoading: false });
    }
  },
}));
