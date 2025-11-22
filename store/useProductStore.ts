import { create } from "zustand";
import { apiHelpers } from "@/lib/axios";

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
  availability: boolean;
}

interface Category {
  _id: string;
  name: string;
}

// ---------- Store ----------
interface ProductStore {
  product: Product | null;
  productLoading: boolean;
  productError: string | null;

  categories: Category[] | null;
  categoryLoading: boolean;
  catgeoryError: string | null;

  products: Product[];
  listLoading: boolean;
  listError: string | null;

  totalPages: number;
  currentPage: number;
  category: string[];
  isPopular: boolean;
  bestSeller: boolean;
  newRelease: boolean;
  minPrice: string;
  maxPrice: string;
  search: string;
  sort: string;
  limit: number;

  setFilter: (key: any, value: any) => void;
  resetFilters: () => void;

  fetchProducts: (page?: number) => Promise<void>;
  fetchCategoriesData: () => Promise<void>;
  findOne: (slug: string) => Promise<void>;
  productVisit: (id: string) => Promise<void>;
}

// ---------- Implementation ----------
export const useProductStore = create<ProductStore>((set, get) => ({
  product: null,
  productLoading: false,
  productError: null,

  products: [],
  listLoading: false,
  listError: null,

  categories: null,
  categoryLoading: false,
  catgeoryError: null,

  totalPages: 1,
  currentPage: 1,
  category: [],
  isPopular: false,
  bestSeller: false,
  newRelease: false,
  minPrice: "",
  maxPrice: "",
  search: "",
  sort: "newest",
  limit: 25,

  setFilter: (key, value) => set({ [key]: value }),

  resetFilters: () =>
    set({
      category: [],
      isPopular: false,
      bestSeller: false,
      newRelease: false,
      minPrice: "",
      maxPrice: "",
      search: "",
      sort: "newest",
      currentPage: 1,
    }),

  // --- Fetch Product List ---
  fetchProducts: async (page = 1) => {
    const {
      category,
      isPopular,
      bestSeller,
      newRelease,
      minPrice,
      maxPrice,
      search,
      sort,
      limit,
    } = get();

    set({ listLoading: true, listError: null });

    try {
      const params: any = {
        page,
        limit,
        sort,
      };

      if (category.length > 0) params.category = category;
      if (isPopular) params.isPopular = true;
      if (bestSeller) params.bestSeller = true;
      if (newRelease) params.newRelease = true;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (search) params.search = search;
      const data: any = await apiHelpers.get("/product", params);

      set({
        products: data.data ?? [],
        totalPages: data.isNextPageAvailble ? page + 1 : page,
        currentPage: page,
        listLoading: false,
      });
    } catch (error: any) {
      set({
        listLoading: false,
        listError: error.message || "Failed to fetch products",
      });
    }
  },

  // --- Single Product ---
  findOne: async (slug: string) => {
    try {
      set({ productLoading: true, productError: null });

      const data: any = await apiHelpers.get(`/product/${slug}`);

      set({ product: data.data, productLoading: false });
    } catch (err: any) {
      set({
        productError: err.message || "Failed to load product",
        productLoading: false,
      });
    }
  },

  // --- Fetch Categories ---
  fetchCategoriesData: async () => {
    try {
      set({ categoryLoading: true, catgeoryError: null });

      const data: any = await apiHelpers.get("/category");

      set({
        categories: data.data ?? [],
        categoryLoading: false,
      });
    } catch (err: any) {
      set({
        catgeoryError: err.message || "Failed to load categories",
        categoryLoading: false,
      });
    }
  },
  productVisit: async (id) => {
    try {
      await apiHelpers.get(`/product/${id}/visit`)
    } catch (error) {
      console.error(error)
    }
  }
}));
