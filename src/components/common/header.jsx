"use client";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import { CartDrawer } from "./cart-drawer";
import HeaderTop from "./header-top";
import { Sidebar } from "./sidebar";
import { useProductCart } from "@/store/cart-store";
import { useProductDrawer } from "@/store/use-drawer";
import Cookies from "js-cookie";
import { logo } from "@/assets";
import Loader from "./loader";

function Header({ loader, CategoriesL, CategoriesR, data }) {
  const [token, setToken] = useState(null);
  const { cart } = useProductCart();

  useEffect(() => {
    let token = Cookies.get("token");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  }, []);

  const { isOpen, setOpen, setClose } = useProductDrawer();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const OpenSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <>
      <div className={`w-full h-full `}>
        <HeaderTop setOpen={setOpen} token={token} />
      </div>

      <div className={`bg-white py-1.5 sticky top-0 z-20  shadow-lg`}>
        <div
          className={` flex ${
            CategoriesL?.length > 0 ? "justify-between" : "justify-center"
          } items-center md:max-w-[900px] sm:container px-3 mx-auto `}
        >
          {CategoriesL?.map((a, i) => {
            return <Navigation a={a} key={i} />;
          })}

          <div className="lg:hidden block ">
            <Menu
              onClick={OpenSidebar}
              className="w-5 h-5 cursor-pointer"
              width={1000}
              height={1000}
            />
          </div>

          <Link href={`/`}>
            <div className="logo">
              <Image
                src={logo}
                width={1000}
                height={1000}
                className="lg:w-[162px] w-[120px] mx-auto"
                alt="logo"
              />
            </div>
          </Link>
          <div className="lg:hidden block ">
            <div className="relative">
              <ShoppingCart
                onClick={setOpen}
                className="w-5 h-5 cursor-pointer"
                width={1000}
                height={1000}
              />
              <span className="absolute bg-red-600 text-white -top-2 -right-2 w-4 h-4 text-center rounded-full text-[11px]">
                {Object.keys(cart).length}
              </span>
            </div>
          </div>
          {CategoriesR?.map((a, i) => {
            return <Navigation a={a} key={i} />;
          })}
        </div>
      </div>

      <div className={`w-full h-full `}>
        <div className="bg-slate-800 py-1 sm:block hidden ">
          <div className="container flex items-center text-xs justify-between">
            <p className="text-white">
              Whatsapp:
              <span className=" text-[#ff9900]"> +92 3222368356</span>
            </p>
            <Link href={"/track-order"} className="text-white">
              Track Your Order
            </Link>
          </div>
        </div>
        <Sidebar open={isOpenSidebar} setOpen={OpenSidebar} e={data} />
        <CartDrawer open={isOpen} setClose={setClose} />
      </div>
    </>
  );
}

export default Header;
