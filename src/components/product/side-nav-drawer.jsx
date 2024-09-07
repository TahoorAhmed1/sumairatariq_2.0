import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import Price from "./filters/price";
import Color from "./filters/color";
import Category from "./filters/category";
import Size from "./filters/size";
import Button from "../common/button";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "@/services";

export function SideNavDrawer({
  id,
  open,
  setOpen,
  setItems,
  setHasMore,
  setLoading,
  setPage,
  selectedPrices,
  selectedCategories,
  selectedColors,
  selectedSizes,
  setSelectedPrices,
  setSelectedColors,
  setSelectedSizes,
  setSelectedCategories,
}) {
  const params = useSearchParams();
  const category = params.get("category");
  const router = useRouter();

  const onSubmit = async () => {
    setPage(1);
    setItems([]);
    setLoading(true);
    const categoryQuery =
      selectedCategories?.length > 0 ? selectedCategories?.join(",") : category;
    const colorQuery =
      selectedColors?.length > 0 ? selectedColors?.join(",") : "";
    const sizeQuery = selectedSizes?.length > 0 ? selectedSizes?.join(",") : "";

    let lowestValue = Infinity;
    let highestValue = -Infinity;

    selectedPrices?.forEach((obj) => {
      if (obj.priceOne < lowestValue) {
        lowestValue = obj.priceOne;
      }
      if (obj.priceTwo < lowestValue) {
        lowestValue = obj.priceTwo;
      }
      if (obj.priceOne > highestValue) {
        highestValue = obj.priceOne;
      }
      if (obj.priceTwo > highestValue) {
        highestValue = obj.priceTwo;
      }
    });

    const queryParams = new URLSearchParams({
      category: categoryQuery,
      color: colorQuery,
      tags: sizeQuery,
      minPrice: (lowestValue === Infinity) | "" ? "" : lowestValue,
      maxPrice: (highestValue === -Infinity) | "" ? "" : highestValue,
    });

    router.replace(
      `/product-design/42e2b00d-b44a-4db5-9e2d?${queryParams.toString()}`
    );

    try {
      const response = await API.GetFilterProduct({
        category: categoryQuery,
        color: colorQuery,
        page: 1,
        tags: sizeQuery,
        minPrice: lowestValue === Infinity ? "" : lowestValue,
        maxPrice: highestValue === -Infinity ? "" : highestValue,
      });

      const newItems = response.data.items;
      setItems([...newItems]);
      setHasMore(1 < response.data.totalPages);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} className="w-[80%]">
      <SheetContent
        side={"left"}
        className="bg-white py-0 px-0 outline-none focus:outline-none border-0 md:w-full w-[90%]"
      >
        <SheetHeader className={"px-4 py-3"}>
          <div className="text-left">
            <SheetTitle className="text-xl">Filter</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="h-[85vh] pb-12 px-4">
          <div className="w-full flex flex-col gap-5   ">
            <Price
              selectedPrices={selectedPrices}
              setSelectedPrices={setSelectedPrices}
            />
            <Color
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
            <Category
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <Size
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
            />
          </div>
        </ScrollArea>

        <div className="absolute px-5 py-4 bottom-0 left-0 right-0  bg-white shadow-md border">
          <SheetFooter className="bg-white">
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={() => {
                  onSubmit();
                  setOpen();
                }}
                name="Filter"
                newClass={
                  "bg-[#d33] hover:bg-[#d33]/80 px-6 py-1.5 text-base text-white rounded-[4px]"
                }
              />
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
