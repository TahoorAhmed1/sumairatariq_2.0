import { detail } from "@/assets";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CircleAlert, Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useWishlistCart } from "@/store/wishlist-store";
import { notify } from "@/lib/notify";

function ProductCard({ data }) {
  let image = data?.Images?.filter(
    (ev) => ev?.type.split("/")[0] === "image"
  )[0];
  const [isVisible, setIsVisible] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistCart();
  const id = `${data.id}${data.color}${data?.size}`;
  const currentProduct = wishlist[id];

  const handleHeartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    addToWishlist({
      id: data?.id,
      product_id: data.productId,
      title: data?.product?.name,
      color: data?.color,
      size: data?.size,
      image: image?.filename,
      price: data?.price,
    });
    notify("success", "Product added to wishlist.");
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist({
      id: data?.id,
      title: data?.product?.name,
      color: data?.color,
      size: data?.size,
      image: image?.filename,
      price: data?.price,
    });
    notify("error", "The product has been removed from your wishlist.");
  };

  console.log("data", data);
  return (
    <Link
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="cursor-pointer w-full group"
      href={`/product/${data?.productId}?color=${data?.color}&size=${data?.size}`}
    >
      <div className="bg-white shadow-lg w-full overflow-hidden border-0 transition duration-500 relative rounded-[8px]">
        <div className="relative">
          <div className="sm:h-[330px] xs:h-[250px] h-[300px] overflow-hidden relative">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.4 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformOrigin: "center" }}
            >
              <Image
                src={
                  image?.filename
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${image?.filename}`
                    : detail
                }
                alt="Product Image"
                layout="fill"
                width={1000}
                height={1000}
                loading={"eager"}
                objectFit="cover"
                className="rounded-t-[8px] transition-transform object-center duration-500 ease-in-out"
              />
            </motion.div>
          </div>
        </div>
        <div className="py-2 px-0">
          <div className="text-[#333] text-[12px] text-center font-medium mb-1">
            <p>{data?.product?.name} </p>{" "}
            <p className="text-[10px]">
              ({data?.size})
              <span className="text-[10px] ml-1">({data?.color}) </span>
            </p>
          </div>
          <div className="text-[#d33] text-[13px] font-semibold text-center flex justify-center gap-x-2 items-center">
            {data?.Discount !== 0 ? (
              <span className="line-through text-[#bdbdbd]">
                PKR. {data?.price}
              </span>
            ) : null}
            <span>
              {data?.Discount !== 0
                ? data?.price - (data?.Discount / 100) * data?.price
                : data?.price}
            </span>
          </div>
          {data?.Discount !== 0 && (
            <div className="flex  items-center justify-center bg-red-600 absolute rounded-full top-4 left-4 w-10 h-10 font-light text-white text-xs">
              <span className="text-sm ">-</span> {data?.Discount}%
            </div>
          )}
          <div className="lg:block hidden">
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  className="flex flex-col bg-white absolute rounded-2xl top-4 right-4 sm:px-2 sm:py-3 sm:gap-y-4 gap-y-3 py-2 px-1.5"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Heart
                          fill={`${currentProduct ? "red" : "none"}`}
                          className="sm:w-5 sm:h-5 h-4 w-4 text-red-600"
                          onClick={
                            currentProduct
                              ? handleRemoveClick
                              : handleHeartClick
                          }
                        />
                      </TooltipTrigger>
                      {currentProduct ? (
                        <TooltipContent
                          side="left"
                          className="bg-white text-black text-xs font-semibold rounded-[4px]"
                        >
                          <p>Remove from wishlist</p>
                        </TooltipContent>
                      ) : (
                        <TooltipContent
                          side="left"
                          className="bg-white text-black text-xs font-semibold rounded-[4px]"
                        >
                          <p>Add to wishlist</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleAlert className="sm:w-5 sm:h-5 h-4 w-4 text-slate-600" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black text-xs font-semibold rounded-[4px]">
                        <p>Coming soon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Search className="sm:w-5 sm:h-5 h-4 w-4 text-slate-600" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black text-xs font-semibold rounded-[4px] ">
                        <p>Coming soon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="lg:hidden block">
            <div className="flex flex-col bg-white absolute rounded-2xl top-4 right-4 sm:px-2 sm:py-3 sm:gap-y-4 gap-y-3 py-2 px-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Heart
                      fill={`${currentProduct ? "red" : "none"}`}
                      className="sm:w-5 sm:h-5 h-4 w-4 text-red-600"
                      onClick={
                        currentProduct ? handleRemoveClick : handleHeartClick
                      }
                    />
                  </TooltipTrigger>
                  {currentProduct ? (
                    <TooltipContent
                      side="left"
                      className="bg-white text-black text-xs font-semibold rounded-[4px]"
                    >
                      <p>Remove from wishlist</p>
                    </TooltipContent>
                  ) : (
                    <TooltipContent
                      side="left"
                      className="bg-white text-black text-xs font-semibold rounded-[4px]"
                    >
                      <p>Add to wishlist</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleAlert className="sm:w-5 sm:h-5 h-4 w-4 text-slate-600" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black text-xs font-semibold rounded-[4px]">
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Search className="sm:w-5 sm:h-5 h-4 w-4 text-slate-600" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black text-xs font-semibold rounded-[4px] ">
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
