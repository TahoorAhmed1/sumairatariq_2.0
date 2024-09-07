import { Heart, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import CryptoJS from "crypto-js";
import { useProductCart } from "@/store/cart-store";
import { useEffect } from "react";
import { useWishlistCart } from "@/store/wishlist-store";
import { DropdownMenuDemo } from "./userDropDown";

function HeaderTop({ setOpen, token }) {
  const { setCart, cart, saveCart } = useProductCart();
  const { wishlist, saveWishlist, setWishlist } = useWishlistCart();
  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      try {
        let bytes = CryptoJS.AES.decrypt(cart, "12345");
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setCart(decryptedData);
        saveCart(decryptedData);
      } catch (error) {
        if (error.message == "Malformed UTF-8 data") {
          localStorage.removeItem("cart");
        }
      }
    }
  }, []);

  useEffect(() => {
    const wishlist = localStorage.getItem("wishlist");
    if (wishlist) {
      setWishlist(wishlist);
      saveWishlist(JSON.parse(wishlist));
    }
  }, []);

  return (
    <div className="bg-slate-800 py-2.5 sm:block hidden">
      <div className=" container flex items-center justify-between">
        <p className="text-white md:text-sm text-xs text-center">
          <span className="text-[#ff9900] mr-0.5">Free Delivery</span> anywhere
          in Pakistan
        </p>
        <div className=" gap-x-7 items-center lg:flex hidden">
          <div className="relative">
            <ShoppingCart
              onClick={setOpen}
              color="white"
              className="w-4 h-4 cursor-pointer"
              width={1000}
              height={1000}
            />
            <span className="absolute bg-red-600 text-white -top-2 -right-2 w-4 h-4 text-center rounded-full text-[11px]">
              {Object.keys(cart).length}
            </span>
          </div>

          <Link href={"/wishlist"} className="relative">
            <Heart
              className="w-4 h-4 cursor-pointer"
              width={1000}
              height={1000}
              color="white"
            />
            <span className="absolute bg-red-600 text-white -top-2 -right-2 w-4 h-4 text-center rounded-full text-[11px]">
              {Object.keys(wishlist).length}
            </span>
          </Link>
          {token ? (
            <DropdownMenuDemo />
          ) : (
            <Link href="/login">
              <UserRound
                className="w-4 h-4 cursor-pointer"
                width={1000}
                height={1000}
                color="white"
              />
            </Link>
          )}
        </div>
        <div className="lg:hidden block">
          <Link
            href={"track-order"}
            className={
              "bg-slate-50/20 text-white px-2 py-1 text-[11px] rounded-[2px]"
            }
          >
            TRACK ORDER
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
