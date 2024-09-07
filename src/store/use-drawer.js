import { create } from "zustand";
export const useProductDrawer = create((set, get) => ({
  isOpen: false,
  setOpen: () => {
    const { isOpen } = get();
    set({ isOpen: !isOpen });
  },
  setClose: () => {
    set({ isOpen: false });
  },
}));
