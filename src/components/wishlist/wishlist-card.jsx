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
import { cn } from "@/lib/utils";
function WishlistCard({ data, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const { removeFromWishlist, wishlist } = useWishlistCart();
  const id = `${data.id}${data.color}${data?.size}`;
  const currentProduct = wishlist[id];
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist({
      id: data.id,
      title: data?.title,
      color: data?.color,
      size: data?.size,
      image: data?.image,
      price: data?.price,
    });
    notify("success", "Product has been removed wishlist");
  };

  return (
    <Link
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={cn("cursor-pointer  w-full group", className)}
      href={`/product/${data?.product_id}?color=${data?.color}&size=${data?.size}`}
    >
      <div className="bg-white shadow-lg w-full overflow-hidden border-0 transition duration-500 relative rounded-[8px]">
        <div className="relative">
          <div className="h-[350px] overflow-hidden relative">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.4 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: "center" }}
            >
              <Image
                src={
                  data.image
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.image}`
                    : detail
                }
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                className="rounded-t-[8px] transition-transform duration-500 ease-in-out"
              />
            </motion.div>
          </div>
        </div>
        <div className="py-2 px-0">
          <div className="text-[#333] text-[14px] text-center font-medium mb-2">
            {data?.title}
          </div>
          <div className="text-[#d33] text-[14px] font-semibold text-center">
            PKR <span>{data?.price}</span>
          </div>
          <AnimatePresence>
            {isVisible && (
              <motion.div
                className="flex flex-col bg-white absolute rounded-2xl top-4 right-4 px-2 py-3 gap-y-4"
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
                        className="w-5 h-5 text-red-600"
                        onClick={handleRemoveClick}
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="bg-white text-black text-xs font-semibold rounded-[4px]"
                    >
                      <p>Remove from wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleAlert className="w-5 h-5 text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="bg-white text-black text-xs font-semibold rounded-[4px]"
                    >
                      <p>Coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Search className="w-5 h-5 text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="bg-white text-black text-xs font-semibold rounded-[4px]"
                    >
                      <p>Coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
}

export default WishlistCard;
