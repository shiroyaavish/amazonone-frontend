import { create } from "zustand";
import { apiHelpers } from "@/lib/axios"; // your axios wrapper

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

interface CategoryWithProducts {
  _id: string;
  name: string;
  products: Product[];
}

interface Category {
  _id: string;
  name: string;
}

interface HomeState {
  popular: Product[];
  newRelease: Product[];
  bestSeller: Product[];
  categoryWithProducts: CategoryWithProducts[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchHomeData: () => Promise<void>;
  fetchCategoriesData: () => Promise<void>;
}

export const useHomeStore = create<HomeState>((set) => ({
  popular: [],
  newRelease: [],
  bestSeller: [],
  categoryWithProducts: [],
  categories: [],
  loading: false,
  error: null,

  fetchHomeData: async () => {
    try {
      set({ loading: true, error: null });

      const popularReq = apiHelpers.get("/product", {
        page: 1,
        limit: 10,
        isPopular: true,
      });

      const newReq = apiHelpers.get("/product", {
        page: 1,
        limit: 10,
        newRelease: true,
      });

      const bestReq = apiHelpers.get("/product", {
        page: 1,
        limit: 10,
        bestSeller: true,
      });

      const catReq = apiHelpers.get("/category/products");
      const categoriesReq = apiHelpers.get("/category");

      const [
        popularData,
        newData,
        bestData,
        catData,
        categoriesData,
      ]: any[] = await Promise.all([
        popularReq,
        newReq,
        bestReq,
        catReq,
        categoriesReq,
      ]);

      set({
        popular: popularData.data ?? [],
        newRelease: newData.data ?? [],
        bestSeller: bestData.data ?? [],
        categoryWithProducts: catData.data ?? [],
        categories: categoriesData.data ?? [],
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.message || "Failed to load home data",
        loading: false,
      });
    }
  },
  fetchCategoriesData: async () => {
    try {
      set({ loading: true, error: null })
      const categoriesReq: any = await apiHelpers.get("/category");
      set({
        categories: categoriesReq.data ?? [],
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error?.message || "Failed to load category data",
        loading: false,
      });
    }
  }
}));
