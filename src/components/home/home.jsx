"use client";
import Heading from "@/components/common/heading";
import ProductCarousel from "../common/product-crousel";
import CollectionCard from "@/components/home/collection-card";
import ImageCarousel from "@/components/home/image-carousel";
import { Skeleton } from "../ui/skeleton";
import { useHome } from "@/store/home";

export default function Home() {
  const {
    isLoading,
    bannerImage,
    sliderImages,
    sliderImagesReverse,
    allCategoriesWithImages,
  } = useHome();

  const renderSkeletons = (count, className) =>
    Array(count)
      .fill()
      .map((_, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <Skeleton className={className} />
        </div>
      ));

  return (
    <main className="min-h-screen">
      {isLoading ? (
        <div>
          <Skeleton className="w-full mx-auto md:aspect-[9/3.5] aspect-[9/8] bg-[#CCCCCC]/90 inline-block object-cover object-center" />
        </div>
      ) : (
        <ImageCarousel data={bannerImage} />
      )}
      <div className="px-4  md:mt-20 mt-10  mb-14">
        <div>
          <Heading title="All Collections" addClass="mb-6" />
          <div className="xl:max-w-[1350px] md:max-w-5xl mx-auto xl:px-16 md:px-12 sm:px-6 px-4 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
            {isLoading
              ? renderSkeletons(
                  4,
                  "md:h-[360px] h-80 w-full rounded-[4px] bg-[#CCCCCC]/90"
                )
              : allCategoriesWithImages.map((data, key) => (
                  <CollectionCard data={data} key={key} />
                ))}
          </div>
        </div>
      </div>
      <div className="sm:px-4 px-2 md:mb-20 mb-10 flex flex-col gap-y-14">
        <div>
          <Heading title="New Arrival" addClass="mb-6" />
          {isLoading ? (
            <div className="grid lg:grid-cols-5 xs:grid-cols-2 grid-cols-1 gap-4 w-full">
              {renderSkeletons(
                5,
                "sm:h-[310px] xs:h-[250px] h-[280px]  w-full rounded-[8px] bg-[#CCCCCC]/90"
              )}
              {renderSkeletons(5, "h-7 w-full rounded-lg bg-[#CCCCCC]/90")}
            </div>
          ) : (
            <ProductCarousel data={sliderImages} />
          )}
        </div>
        <div>
          <Heading title="Exclusive" addClass="mb-6" />
          {isLoading ? (
            <div className="grid lg:grid-cols-5 xs:grid-cols-2 grid-cols-1 gap-4 w-full">
              {renderSkeletons(
                5,
                "sm:h-[310px] xs:h-[250px] h-[280px]  w-full rounded-[8px] bg-[#CCCCCC]/90"
              )}
              {renderSkeletons(5, "h-7 w-full rounded-lg bg-[#CCCCCC]/90")}
            </div>
          ) : (
            <ProductCarousel data={sliderImagesReverse} />
          )}
        </div>
        <div>
          <Heading title="Top Rated" addClass="mb-6" />
          {isLoading ? (
            <div className="grid lg:grid-cols-5 xs:grid-cols-2 grid-cols-1 gap-4 w-full">
              {renderSkeletons(
                5,
                "sm:h-[310px] xs:h-[250px] h-[280px]  w-full rounded-[8px] bg-[#CCCCCC]/90"
              )}
              {renderSkeletons(5, "h-7 w-full rounded-lg bg-[#CCCCCC]/90")}
            </div>
          ) : (
            <ProductCarousel data={sliderImages} />
          )}
        </div>
      </div>
    </main>
  );
}
