import { create } from "zustand";

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

interface Category {
  _id: string;
  name: string;
  products: Product[];
}

interface HomeState {
  popular: Product[];
  newRelease: Product[];
  bestSeller: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchHomeData: (baseUrl: string) => Promise<void>;
}

export const useHomeStore = create<HomeState>((set) => ({
  popular: [],
  newRelease: [],
  bestSeller: [],
  categories: [],
  loading: false,
  error: null,

  fetchHomeData: async (baseUrl: string) => {
    try {
      set({ loading: true, error: null });

      const [popularRes, newRes, bestRes, catRes] = await Promise.all([
        fetch(`${baseUrl}/product?page=1&limit=10&isPopular=true`),
        fetch(`${baseUrl}/product?page=1&limit=10&newRelease=true`),
        fetch(`${baseUrl}/product?page=1&limit=10&bestSeller=true`),
        fetch(`${baseUrl}/category/products`),
      ]);

      const popularData = await popularRes.json();
      const newData = await newRes.json();
      const bestData = await bestRes.json();
      const catData = await catRes.json();

      set({
        popular: popularData.data || [],
        newRelease: newData.data || [],
        bestSeller: bestData.data || [],
        categories: catData.data || [],
        loading: false,
      });
    } catch (err: any) {
      console.error("Error fetching home data:", err);
      set({
        error: err.message || "Failed to load home data",
        loading: false,
      });
    }
  },
}));
