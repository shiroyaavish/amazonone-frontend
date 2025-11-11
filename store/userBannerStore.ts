import { create } from "zustand";

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
  fetchBanners: (baseUrl: string) => Promise<void>;
}

export const useBannerStore = create<BannerState>((set) => ({
  banners: [],
  loading: false,
  error: null,

  fetchBanners: async (baseUrl: string) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`${baseUrl}/banner/active/data`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const bannerList = Array.isArray(data) ? data : data.data || [];
      const activeBanners = bannerList.filter((b: Banner) => b.isActive);

      set({ banners: activeBanners, loading: false });
    } catch (err: any) {
      console.error("Error fetching banners:", err);
      set({ loading: false, error: err.message || "Failed to load banners" });
    }
  },
}));
