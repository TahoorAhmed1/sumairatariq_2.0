import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "./product-card";

function ProductCarousel({ newClass, data }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="pb-2">
        {data?.map((e, index) => {
          return (
            <CarouselItem
              key={index}
              className={
                newClass ? newClass : `xl:basis-1/5 md:basis-1/3  sm:basis-1/2 `
              }
            >
              <ProductCard data={e} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious
        className={
          "-left-2 bg-white/90 border-0 hover:bg-black/80 border-black"
        }
      />
      <CarouselNext
        className={
          "-right-2 bg-white/90 border-0 hover:bg-black/80 border-black"
        }
      />
    </Carousel>
  );
}

export default ProductCarousel;
