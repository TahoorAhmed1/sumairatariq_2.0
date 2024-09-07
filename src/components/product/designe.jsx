"use client";
import ProductCard from "@/components/common/product-card";
import SideNav from "@/components/product/side-nav";
import { API } from "@/services";
import { Filter, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SideNavDrawer } from "@/components/product/side-nav-drawer";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/common/heading";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import Link from "next/link";
import { renderSkeletons } from "../common/productcardSkeleton";

function Design({
  id,
  category,
  subcategory,
  tags,
  color,
  minPrice,
  maxPrice,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const setOpenHandle = () => setIsOpen(!isOpen);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [grid, setGrid] = useState(3);

  const priceList = [
    { priceOne: 500, priceTwo: 1000 },
    { priceOne: 1000, priceTwo: 3000 },
    { priceOne: 3000, priceTwo: 6000 },
    { priceOne: 6000, priceTwo: 8000 },
    { priceOne: 8000, priceTwo: 10000 },
    { priceOne: 10000, priceTwo: 12000 },
    { priceOne: 14000, priceTwo: 16000 },
    { priceOne: 16000, priceTwo: 18000 },
  ];

  const fetchData = async () => {
    setPage(1);
    setItems([]);
    try {
      const response = await API.GetFilterProduct({
        category,
        color,
        subcategory,
        page,
        minPrice: (minPrice === Infinity) | "" ? "" : minPrice,
        maxPrice: (maxPrice === -Infinity) | "" ? "" : maxPrice,
      });

      const newItems = response.data.items;
      setItems(newItems);
      setHasMore(page < response.data.totalPages);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFilter = debounce(async () => {
    try {
      setPage(page + 1);
      const response = await API.GetFilterProduct({
        category,
        color,
        subcategory,
        tags,
        page: page + 1,
        minPrice: (minPrice === Infinity) | "" ? "" : minPrice,
        maxPrice: (maxPrice === -Infinity) | "" ? "" : maxPrice,
      });
      const newItems = response?.data?.items;
      setItems([...items, ...newItems]);
      setPage(page + 1);
      setHasMore(page < response?.data?.totalPages);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, 100);

  useEffect(() => {
    setLoading(true);
    setItems([]);
    fetchData();
  }, [router, category, subcategory]);

  useEffect(() => {
    const newCategory = category ? category?.split(",") : [];
    const newColor = color ? color?.split(",") : [];
    const newTags = tags ? tags?.split(",") : [];
    setSelectedCategories(newCategory);
    setSelectedColors(newColor);
    setSelectedSizes(newTags);

    if (minPrice && maxPrice) {
      const initialSelectedPrices = priceList.filter(
        (priceRange) =>
          priceRange.priceOne >= parseInt(minPrice, 10) &&
          priceRange.priceTwo <= parseInt(maxPrice, 10)
      );
      setSelectedPrices(initialSelectedPrices);
    }
  }, [category, color, tags]);

  return (
    <div className="py-10 min-h-screen">
      <h1 className="text-center text-3xl font-semibold mb-10">{category}</h1>
      <div className="sm:container mx-auto px-2">
        <div>
          <div className="items-center flex justify-end lg:hidden mb-5">
            <Filter onClick={setOpenHandle} className="w-6 h-6" />
          </div>
        </div>
        <div>
          <SideNavDrawer
            id={id}
            open={isOpen}
            setOpen={setOpenHandle}
            fetchData={fetchData}
            setHasMore={setHasMore}
            setItems={setItems}
            items={items}
            setLoading={setLoading}
            setPage={setPage}
            selectedColors={selectedColors}
            selectedPrices={selectedPrices}
            selectedSizes={selectedSizes}
            selectedCategories={selectedCategories}
            setSelectedPrices={setSelectedPrices}
            setSelectedColors={setSelectedColors}
            setSelectedSizes={setSelectedSizes}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        <div className="w-full h-full flex gap-5 ">
          <div className="hidden lg:block    xl:w-[32%] lg:w-[42%]  overflow-auto h-full">
            <div className="flex  border-r  ">
              <Heading
                title={"Filter"}
                newClass="text-3xl  font-semibold text-slate-800 mb-5 "
              />
            </div>

            <SideNav
              id={id}
              fetchData={fetchData}
              setHasMore={setHasMore}
              setItems={setItems}
              items={items}
              setLoading={setLoading}
              setPage={setPage}
              selectedColors={selectedColors}
              selectedPrices={selectedPrices}
              selectedSizes={selectedSizes}
              selectedCategories={selectedCategories}
              setSelectedPrices={setSelectedPrices}
              setSelectedColors={setSelectedColors}
              setSelectedSizes={setSelectedSizes}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="w-full">
            <div className=" justify-between mb-4 lg:flex hidden">
              <div className="flex text-[14px] items-center text-slate-700">
                <Link href={"/"}>Home</Link>/{category}
              </div>
              <div className="flex justify-end gap-x-3 items-center ">
                <BsFillGridFill
                  className="w-5 h-5"
                  onClick={() => {
                    setGrid(3);
                  }}
                />
                <BsFillGrid3X3GapFill
                  className="w-5 h-5"
                  onClick={() => {
                    setGrid(4);
                  }}
                />
              </div>
            </div>

            {loading ? (
              <div
                className={`grid lg:grid-cols-${grid} xs:grid-cols-2 grid-cols-1  gap-3 w-full `}
              >
                {renderSkeletons(6)}
              </div>
            ) : items?.length > 0 ? (
              <div className="w-full">
                <div className="w-full min-h-screen flex flex-col gap-10">
                  <InfiniteScroll
                    dataLength={items.length}
                    next={fetchDataFilter}
                    hasMore={hasMore}
                    loader={
                      <div className="flex justify-center py-8">
                        <LoaderIcon className="animate-spin w-8 h-8 text-gray-700" />
                      </div>
                    }
                  >
                    <div
                      className={`grid  lg:grid-cols-${grid} xs:grid-cols-2  grid-cols-1 gap-3 w-full `}
                    >
                      {items.map((e, index) => (
                        <ProductCard key={index} data={e} />
                      ))}
                    </div>
                  </InfiniteScroll>
                </div>
              </div>
            ) : (
              <div className="w-full text-2xl font-semibold  ">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
