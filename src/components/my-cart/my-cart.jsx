"use client";
import { noItem } from "@/assets";
import Button from "@/components/common/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { notify } from "@/lib/notify";
import { useProductCart } from "@/store/cart-store";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function MyCart() {
  const { cart, subTotal, addToCart, removeFromCart, clearCartById } =
    useProductCart();

  const router = useRouter();

  return (
    <main class="min-h-screen  pt-10">
      <h1 class="mb-10 text-center text-3xl font-bold">Cart Items</h1>
      <div class=" container flex lg:flex-row flex-col gap-x-5">
        <div class="rounded-lg lg:w-[70%] w-full">
          {Object.values(cart).length < 1 && (
            <div className="text-xl text-center text-slate-500 font-bold  flex  flex-col justify-center h-full items-center">
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
          {Object.values(cart).length > 0 && (
            <div class="justify-between mb-6 rounded-lg bg-white p-2 shadow-md sm:flex sm:justify-start">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[450px] md:block hidden  text-base font-semibold">
                      Product
                    </TableHead>
                    <TableHead className="text-center w-[400px] text-base font-semibold">
                      Price
                    </TableHead>
                    <TableHead className="text-center text-base font-semibold">
                      Quantity
                    </TableHead>
                    <TableHead className="text-center text-base font-semibold">
                      SubTotal
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.keys(cart).map((key) => {
                    return (
                      <TableRow key={key} className="relative">
                        <TableCell className=" items-center gap-x-3 md:flex hidden ">
                          <div className="">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${cart[key]?.image}`}
                              width={1000}
                              height={1000}
                              alt="product-image"
                              className="w-full rounded-[4px] sm:w-40"
                            />
                          </div>
                          <p className="md:text-sm text-xs uppercase  ">
                            {cart[key].quantity} x {cart[key].title} - (
                            {cart[key]?.color}) - ({cart[key]?.size})
                          </p>
                        </TableCell>
                        <TableCell className="text-center">
                          PKR. {cart[key].price}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="inline-flex items-center text-right mr-auto">
                            <Button
                              disabled={cart[key]?.quantity < 2}
                              onClick={() => {
                                removeFromCart({
                                  id: cart[key]?.id,
                                  color: cart[key]?.color,
                                  quantity: 1,
                                  size: cart[key]?.size,
                                  image: cart[key]?.image,
                                  price: cart[key]?.price,
                                });
                              }}
                              name={
                                <Minus
                                  width={1000}
                                  height={1000}
                                  className="w-3 h-3"
                                />
                              }
                              newClass="bg-white rounded-l border text-gray-600 cursor-pointer disabled:cursor-not-allowed hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-2 border-r border-gray-200"
                            />
                            <div className="bg-slate-50 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1.5 select-none text-xs">
                              {cart[key]?.quantity}
                            </div>
                            <Button
                              disabled={cart[key]?.quantity > 49}
                              onClick={() => {
                                if (cart[key].quantity === cart[key].stock) {
                                  return notify(
                                    "error",
                                    "Maximum available quantity reached"
                                  );
                                }
                                addToCart({
                                  id: cart[key]?.id,
                                  product_id: cart[key]?.product_id,
                                  color: cart[key]?.color,
                                  quantity: 1,
                                  size: cart[key]?.size,
                                  image: cart[key]?.image,
                                  price: cart[key]?.price,
                                });
                              }}
                              name={
                                <Plus
                                  width={1000}
                                  height={1000}
                                  className="w-3 h-3"
                                />
                              }
                              newClass="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-2 border-r border-gray-200"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          PKR. {cart[key]?.quantity * cart[key]?.price}
                        </TableCell>
                        <TableCell className="relative">
                          <div
                            className="absolute top-4 right-4 cursor-pointer"
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
                            <Trash2Icon className="w-5 h-5 text-red-600 hover:text-red-800" />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <div class=" h-full rounded-lg bg-white px-6 py-7 shadow-md lg:mt-0 lg:w-[35%] w-full">
          <div class="mb-5 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">PKR. {subTotal}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <div className="space-y-1 text-right text-sm">
              <p class="text-gray-700"> Shipping Charges: PKR 0</p>
              <p class="text-gray-700"> Shipping to</p>
              <p class="text-gray-700"> Change address</p>
            </div>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">{subTotal}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (Object.keys(cart).length > 0) {
                router.push("/checkout");
              } else {
                notify("error", "Please add a product to your cart");
              }
            }}
            class="mt-6 w-full rounded-md bg-[#DD3333] py-1.5 font-medium text-blue-50 hover:bg-[#DD3333]/90"
          >
            Check out
          </button>
        </div>
      </div>
    </main>
  );
}

export default MyCart;
