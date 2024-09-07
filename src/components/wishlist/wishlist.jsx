"use client";
import { noItem } from "@/assets";
import Heading from "@/components/common/heading";
import WishlistCard from "@/components/wishlist/wishlist-card";
import { useWishlistCart } from "@/store/wishlist-store";
import Image from "next/image";
import { TbSearchOff } from "react-icons/tb";

function Wishlist() {
  const { wishlist } = useWishlistCart();

  return (
    <div className="container my-10 min-h-[70vh]">
      <Heading
        title={"Your wishlist"}
        newClass={"text-center font-semibold md:text-4xl text-3xl"}
      />

      {Object.values(wishlist).length < 1 && (
        <div className="text-xl text-center text-slate-500 font-bold  flex  flex-col justify-center min-h-[50vh] items-center">
          <Image
            src={noItem}
            width={1000}
            height={1000}
            className="w-12 h-12"
            alt="root"
          ></Image>
          No product founds
        </div>
      )}
      <div
        className={`gap-5 my-10 ${
          Object.values(wishlist).length < 4
            ? "flex flex-wrap justify-start items-start"
            : "grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        }`}
      >
        {Object.values(wishlist).map((e, index) => (
          <WishlistCard
            key={index}
            data={e}
            className={`${
              Object.values(wishlist).length < 4
                ? "lg:w-1/4 sm:w-1/3 w-full"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
