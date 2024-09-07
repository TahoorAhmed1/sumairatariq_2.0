"use client";
import Heading from "@/components/common/heading";
import ProductCarousel from "../common/product-crousel";
import CollectionCard from "@/components/home/collection-card";
import ImageCarousel from "@/components/home/image-carousel";
import { Skeleton } from "../ui/skeleton";
import { useHome } from "@/store/home";
import { renderSkeletons } from "../common/productcardSkeleton";

export default function Home() {
  const {
    isLoading,
    bannerImage,
    sliderImages,
    sliderImagesReverse,
    allCategoriesWithImages,
  } = useHome();

  return (
    <main className="min-h-screen">
      <div className={`${isLoading ? "block" : "hidden"}`}>
        <Skeleton className="w-full mx-auto md:aspect-[9/3.5] aspect-[9/8]  bg-[#CCCCCC]/90  inline-block object-cover object-center" />
      </div>
      <div className={`${isLoading ? "hidden" : "block"} w-full h-full`}>
        <ImageCarousel data={bannerImage} />
      </div>
      <div className="px-4  md:mt-20 mt-10  mb-14">
        <div>
          <Heading title="All Collections" addClass="mb-6" />
          <div className="xl:max-w-[1350px] md:max-w-5xl mx-auto xl:px-16 md:px-12 sm:px-6 px-4 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
            {isLoading
              ? renderSkeletons(
                  4,
                  "md:h-[360px] h-80 w-full rounded-[4px]                            "
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
              {renderSkeletons(5)}
            </div>
          ) : (
            <ProductCarousel data={sliderImages} />
          )}
        </div>
        <div>
          <Heading title="Exclusive" addClass="mb-6" />
          {isLoading ? (
            <div className="grid lg:grid-cols-5 xs:grid-cols-2 grid-cols-1 gap-4 w-full">
              {renderSkeletons(5)}
            </div>
          ) : (
            <ProductCarousel data={sliderImagesReverse} />
          )}
        </div>
        <div>
          <Heading title="Top Rated" addClass="mb-6" />
          {isLoading ? (
            <div className="grid lg:grid-cols-5 xs:grid-cols-2 grid-cols-1 gap-4 w-full">
              {renderSkeletons(5)}
            </div>
          ) : (
            <ProductCarousel data={sliderImages} />
          )}
        </div>
      </div>
    </main>
  );
}
