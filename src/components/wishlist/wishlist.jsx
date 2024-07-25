"use client";
import Heading from "@/components/common/heading";
import WishlistCard from "@/components/wishlist/wishlist-card";
import { useWishlistCart } from "@/store/wishlist-store";

function Wishlist() {
  const { wishlist } = useWishlistCart();

  return (
    <div className="container my-10 min-h-[70vh]">
      <Heading
        title={"Your wishlist "}
        newClass={"text-center font-medium md:text-4xl text-3xl"}
      />
      <div
        className={`gap-5 my-10 ${
          Object.values(wishlist).length < 4
            ? "flex flex-wrap justify-start items-start"
            : "grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        }`}
      >
        {Object.values(wishlist).length < 1 && (
          <div className="text-xl">No item found</div>
        )}
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
