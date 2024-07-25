"use client";
import Heading from "@/components/common/heading";
import ProductCarousel from "../common/product-crousel";
import CollectionCard from "@/components/home/collection-card";
import ImageCarousel from "@/components/home/image-carousel";
import { sortDataByDate } from "@/lib/utils";
import { API } from "@/services";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [sliderImagesReverse, setSliderImagesReverse] = useState([]);
  const [allCategoriesWithImages, setAllCategoriesWithImages] = useState([]);

  const fetchData = async () => {
    try {
      const [sliderRes, bannerRes, categoryRes] = await Promise.all([
        API.GetSliderProducts(),
        API.SliderResImages(),
        API.GetAllCategoriesWithImages(),
      ]);
      setSliderImages(sortDataByDate(sliderRes?.data));
      let reversdata = [...sliderRes.data].reverse();
      setSliderImagesReverse(reversdata);
      setBannerImage(bannerRes?.data);
      setAllCategoriesWithImages(categoryRes?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen">
      {loading ? (
        <div>
          <Skeleton className="w-full mx-auto md:aspect-[9/3.5] aspect-[9/8] bg-[#CCCCCC]/90 inline-block object-cover object-center " />
        </div>
      ) : (
        <ImageCarousel data={bannerImage} />
      )}
      <div className=" px-4 md:my-20 my-10 flex flex-col gap-y-14 ">
        <div>
          <Heading title={"All Collections"} addClass={"mb-8"} />
          <div className="xl:max-w-[1350px] md:max-w-5xl mx-auto xl:px-16 md:px-12 sm:px-6 px-4 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-5 ">
            {loading ? (
              <>
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <Skeleton className="  md:h-[360px] h-80 w-full rounded-[4px] bg-[#CCCCCC]" />
                    </div>
                  ))}
              </>
            ) : (
              allCategoriesWithImages?.map((data, key) => {
                return <CollectionCard data={data} key={key} />;
              })
            )}
          </div>
        </div>
        <div>
          <Heading title={"New Arrival"} addClass={"mb-8"} />
          {loading ? (
            <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4 w-full  ">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <Skeleton className="h-[310px] w-full rounded-[8px] bg-[#CCCCCC]" />
                    <Skeleton className="h-7 w-full rounded-lg bg-[#CCCCCC]/90" />
                    <Skeleton className="h-7 w-full rounded-lg bg-[#CCCCCC]/90" />
                  </div>
                ))}
            </div>
          ) : (
            <ProductCarousel data={sliderImages} />
          )}
        </div>
        <div>
          <Heading title={"Exclusive"} addClass={"mb-8"} />
          {loading ? (
            <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4 w-full  ">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <Skeleton className="h-[310px] w-full rounded-[8px] bg-[#CCCCCC]" />
                    <Skeleton className="h-7 w-full rounded-lg bg-[#CCCCCC]/90" />
                    <Skeleton className="h-7 w-full rounded-lg bg-[#CCCCCC]/90" />
                  </div>
                ))}
            </div>
          ) : (
            <ProductCarousel data={sliderImagesReverse} />
          )}
        </div>
        <div>
          <Heading title={"Top Rated"} addClass={"mb-8"} />
          {loading ? (
            <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4 w-full  ">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <Skeleton className="h-[310px] w-full rounded-[8px] bg-[#CCCCCC]" />
                    <Skeleton className="h-7 w-full rounded-lg bg-[#CCCCCC]/90" />
                    <Skeleton className="h-7 w-full rounded-lg bg-[#CCCCCC]/90" />
                  </div>
                ))}
            </div>
          ) : (
            <ProductCarousel data={sliderImages} />
          )}
        </div>
      </div>
    </main>
  );
}
