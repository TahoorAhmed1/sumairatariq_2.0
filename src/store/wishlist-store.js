import { create } from "zustand";
export const useWishlistCart = create((set, get) => ({
  wishlist: {},
  setWishlist: (cart) => {
    set({ wishlist: JSON.parse(cart) });
  },
  saveWishlist: (cart) => {
    localStorage.setItem("wishlist", JSON.stringify(cart));
  },
  addToWishlist: (data) => {
    const { saveWishlist, wishlist } = get();
    const mycart = wishlist;
    const Id = data?.id + data?.color + data?.size;
    mycart[Id] = {
      id: data?.id,
      product_id: data.product_id,
      title: data?.title,
      color: data?.color,
      size: data?.size || 1,
      image: data?.image,
      price: data?.price,
    };
    set({ wishlist: mycart });
    saveWishlist(mycart);
  },
  removeFromWishlist: (data) => {
    const { wishlist, saveWishlist } = get();
    let mycart = wishlist;
    let concatId = data?.id + data?.color + data?.size;

    delete mycart[concatId];
    set({ wishlist: mycart });
    saveWishlist(mycart);
  },
  clearCart: () => {
    const { saveCart } = get();
    set({ cart: {} });
    saveCart({});
  },
  clearCartById: (data) => {
    const { cart, saveCart } = get();
    let mycart = cart;

    let concatId = data?.id + data?.color + data?.size;

    if (concatId in cart) {
      delete mycart[concatId];
    }

    set({ cart: mycart });
    saveCart(mycart);
  },
}));
