import { create } from "zustand";
export const useHome = create((set, get) => ({
  user: "",
  data: [],
  CategoriesL: [],
  CategoriesR: [],
  setUser: (value) => {
    set({ user: value });
  },
  setData: (value) => {
    set({ data: value });
  },
  setCategoriesL: (value) => {
    set({ CategoriesL: value });
  },
  setCategoriesR: (value) => {
    set({ CategoriesR: value });
  },
  loader: false,
  setLoader: (value) => {
    set({ loader: value });
  },
  isLoading: true,
  setLoading: (value) => {
    set({ isLoading: value });
  },
  bannerImage: [],
  setBannerImage: (value) => {
    set({ bannerImage: value });
  },
  sliderImages: [],
  setSliderImages: (value) => {
    set({ sliderImages: value });
  },
  sliderImagesReverse: [],
  setSliderImagesReverse: (value) => {
    set({ sliderImagesReverse: value });
  },
  allCategoriesWithImages: [],
  setAllCategoriesWithImages: (value) => {
    set({ allCategoriesWithImages: value });
  },
}));
