import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X, XIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { useProductCart } from "@/store/cart-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/notify";

export function CartDrawer({ open, setClose }) {
  const { cart, subTotal, clearCartById } = useProductCart();
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={setClose} className="w-[90%]">
      <SheetContent className="bg-white py-0 px-0 outline-none focus:outline-none border-0 md:w-full w-[90%]">
        <SheetHeader className={"px-4 py-4"}>
          <SheetTitle className="text-left">SHOPPING CART</SheetTitle>
        </SheetHeader>
        <Separator className="bg-slate-100"></Separator>
        <ScrollArea className="h-[80vh] pb-20">
          <div className="px-5 py-4 flex flex-col gap-y-2 ">
            {Object.keys(cart).length < 1 && (
              <div className="text-lg">No item in cart</div>
            )}
            {Object.keys(cart).map((key, index) => (
              <div key={index}>
                <div className="flex items-center px-5 py-4 gap-3 bg-gray-50/50 hover:bg-slate-100/60 relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${cart[key]?.image}`}
                    width={1000}
                    height={1000}
                    className="w-20 h-24 object-cover"
                    alt="root"
                  />
                  <div className="text-sm font-medium flex justify-between flex-col gap-y-1">
                    <p>
                      {cart[key].title} - ({cart[key]?.color}) - (
                      {cart[key]?.size})
                    </p>
                    <div className="text-xs flex gap-1">
                      <span>{cart[key]?.quantity}</span>
                      <span>x</span>
                      <span className="text-[#d33]">
                        PKR. {cart[key]?.price}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => {
                      clearCartById({
                        id: cart[key]?.id,
                        color: cart[key]?.color,
                        quantity: cart[key]?.quantity,
                        size: cart[key]?.size,
                        image: cart[key]?.image,
                        price: cart[key]?.price,
                      });
                    }}
                  >
                    <XIcon className="w-4 h-4 text-red-600 hover:text-red-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="absolute px-5 py-4 bottom-0 left-0 right-0 bg-white shadow-md border">
          <div className="flex mb-2 justify-between items-center ">
            <span className="text-lg font-semibold">Subtotal :</span>
            <span className="text-lg font-semibold text-[#d33]">
              PKR {subTotal}
            </span>
          </div>
          <SheetFooter className="bg-white">
            <div className="flex flex-col gap-2 w-full">
              <Link
                onClick={() => setClose()}
                href={"/my-cart"}
                variant={"link"}
                className="bg-slate-100 hover:bg-slate-100/70 text-black text-center p-2 rounded hover:underline"
              >
                View Cart
              </Link>
              <button
                onClick={() => {
                  if (Object.keys(cart).length > 0) {
                    router.push("/checkout");
                    setClose();
                  } else {
                    notify("error", "Please add a product to your cart");
                    setClose();
                  }
                }}
                className="bg-[#d33] hover:bg-[#d33]/90 text-white text-center p-2 rounded"
              >
                Check Out{" "}
              </button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
