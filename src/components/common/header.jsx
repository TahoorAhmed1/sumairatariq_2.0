"use client";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import axios from "axios";
import { CartDrawer } from "./cart-drawer";
import HeaderTop from "./header-top";
import { Sidebar } from "./sidebar";
import { useProductCart } from "@/store/cart-store";
import { useProductDrawer } from "@/store/use-drawer";
import Cookies from "js-cookie";
import { Skeleton } from "../ui/skeleton";
import { logo } from "@/assets";
import { FaRegCircleUser } from "react-icons/fa6";

function Header() {
  const [data, setData] = useState();
  const [CategoriesL, setCategoriesL] = useState([]);
  const [CategoriesR, setCategoriesR] = useState([]);
  const [token, setToken] = useState(null);
  const { cart } = useProductCart();
  const [loading, setLoading] = useState(true);

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `https://api.sumairatariq.com/GetAllCategories`
      );
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    let token = Cookies.get("token");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const midIndex = Math.ceil(data.length / 2);
      setCategoriesL(data.slice(0, midIndex));
      setCategoriesR(data.slice(midIndex));
    }
  }, [data]);

  const { isOpen, setOpen, setClose } = useProductDrawer();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const OpenSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <>
      <HeaderTop setOpen={setOpen} token={token} />
      <div className="bg-white py-2 sticky top-0 z-20  shadow-lg">
        {loading ? (
          <div
            className={` md:max-w-[1150px] container mx-auto flex items-center text-xs justify-between`}
          >
            <div className="lg:hidden block ">
              <Menu
                onClick={OpenSidebar}
                className="w-5 h-5 cursor-pointer"
                width={1000}
                height={1000}
              />
            </div>
            <Skeleton
              className={"w-[100px] h-8 bg-slate-200 lg:block hidden"}
            />
            <Skeleton
              className={"w-[100px] h-8 bg-slate-200 lg:block hidden"}
            />
            {/* <Link href={`/`}>
                <div className="logo">
                  <Image
                    src={logo}
                    width={500}
                    height={500}
                    className="lg:w-[180px] w-[120px] mx-auto"
                    alt="logo"
                  />
                </div>
              </Link> */}
            <Skeleton
              className={
                "lg:w-[180px] w-[125px]  lg:h-[86px] h-[56px] my-[3px]  bg-slate-200 "
              }
            />

            <Skeleton
              className={"w-[100px] h-8 bg-slate-200 lg:block hidden"}
            />
            <Skeleton
              className={"w-[100px] h-8 bg-slate-200 lg:block hidden"}
            />
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
          </div>
        ) : (
          <div
            className={` flex ${
              CategoriesL?.length > 0 ? "justify-between" : "justify-center"
            } items-center md:max-w-[1150px] container mx-auto `}
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
                  className="lg:w-[165px] w-[120px] mx-auto"
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
        )}
      </div>
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
    </>
  );
}

export default Header;
