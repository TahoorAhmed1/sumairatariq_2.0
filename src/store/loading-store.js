import { create } from "zustand";
export const useLoading = create((set, get) => ({
  isLoading: true,
  setLoading: (value) => {
    set({ isLoading: value });
  },
}));
