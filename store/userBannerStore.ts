import { create } from "zustand";
import { apiHelpers } from "@/lib/axios";

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  media: string;
  type: "image" | "video";
  url: string;
  isActive: boolean;
}

interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
  fetchBanners: () => Promise<void>;
}

export const useBannerStore = create<BannerState>((set) => ({
  banners: [],
  loading: false,
  error: null,

  fetchBanners: async () => {
    try {
      set({ loading: true, error: null });

      // Axios (with interceptors)
      const data = await apiHelpers.get("/banner/active/data");

      const bannerList = Array.isArray(data)
        ? data
        : data.data || [];

      const activeBanners = bannerList.filter(
        (b: Banner) => b.isActive
      );

      set({
        banners: activeBanners,
        loading: false,
      });

    } catch (err: any) {
      console.error("Error fetching banners:", err);

      set({
        loading: false,
        error: err.message || "Failed to load banners",
      });
    }
  },
}));
