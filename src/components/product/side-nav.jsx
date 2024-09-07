"use client";
import Button from "../common/button";

import Category from "./filters/category";
import Color from "./filters/color";
import Price from "./filters/price";
import Size from "./filters/size";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "@/services";

const SideNav = ({
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
}) => {
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
    <div className="w-full flex flex-col gap-y-2  border-r    ">
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
      <Size selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes} />
      <div className="mt-5">
        <Button
          onClick={() => onSubmit()}
          name="Filter"
          newClass={
            "bg-[#d33] hover:bg-[#d33]/80 px-6 py-1.5 text-base text-white rounded-[4px]"
          }
        />
      </div>
    </div>
  );
};

export default SideNav;
