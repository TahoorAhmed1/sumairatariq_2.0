import CryptoJS from "crypto-js";
import { create } from "zustand";
export const useProductCart = create((set, get) => ({
  subTotal: 0,
  cart: {},
  setCart: (cart) => {
    set({ cart: cart });
  },
  saveCart: (cart) => {
    const encryptData = CryptoJS.AES.encrypt(
      JSON.stringify(cart),
      "12345"
    ).toString();
    localStorage.setItem("cart", encryptData);
    let subt = 0;
    let keys = Object.keys(cart);
    for (let index = 0; index < keys.length; index++) {
      subt += cart[keys[index]].price * cart[keys[index]].quantity;
    }
    set({ subTotal: subt });
  },
  addToCart: (data) => {
    const { saveCart, cart } = get();
    const mycart = cart;
    let Id = data?.id + data?.color + data?.size;
    if (Id in cart) {
      mycart[Id].quantity = cart[Id]?.quantity + data?.quantity;
    } else {
      mycart[Id] = {
        id: data?.id,
        product_id: data?.product_id,
        title: data?.title,
        color: data?.color,
        quantity: data?.quantity || 1,
        size: data?.size || 1,
        image: data?.image,
        price: data?.price,
        stock: data?.stock,
      };
    }
    set({ cart: mycart });
    saveCart(mycart);
  },
  updateCart: (data) => {
    const { saveCart, cart } = get();
    const mycart = cart;

    const Id = data?.id;

    if (Id in cart) {
      mycart[Id].quantity = data?.quantity;
      mycart[Id].selected_brand_id = selected_brand_id;
    }
    set({ cart: mycart });
    saveCart(mycart);
  },
  buyNow: (data) => {
    const { saveCart } = get();
    let concatId = data?.id + data?.color + data?.size;
    let newCart = {
      [concatId]: {
        id: data?.id,
        product_id: data?.product_id,
        title: data?.title,
        color: data?.color,
        quantity: data?.quantity || 1,
        size: data?.size || 1,
        image: data?.image,
        price: data?.price,
        stock: data?.stock,
      },
    };
    set({ cart: newCart });
    saveCart(newCart);
  },
  removeFromCart: (data) => {
    const { cart, saveCart } = get();
    let mycart = cart;
    let concatId = data?.id + data?.color + data?.size;

    if (concatId in cart) {
      mycart[concatId].quantity = cart[concatId].quantity - 1;
    }
    if (mycart[concatId]["quantity"] <= 0) {
      delete mycart[concatId];
    }
    set({ cart: mycart });
    saveCart(mycart);
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
