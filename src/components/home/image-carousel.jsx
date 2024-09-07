import { sliderImage1 } from "@/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
function ImageCarousel({ newClass, data }) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {data?.map((data, index) => {
          return (
            <CarouselItem key={index} className={newClass ? newClass : ``}>
              <Image
                src={
                  data || data?.filename
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`
                    : sliderImage1
                }
                alt="home"
                loading="eager"
                width={1000}
                height={1000}
                priority
                className="w-full mx-auto md:aspect-[9/3.8] aspect-[9/8] inline-block object-cover object-center "
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious
        className={"left-5 bg-white/80  hover:bg-black/80 border-0"}
      />
      <CarouselNext
        className={"right-5  bg-white/80 hover:bg-black/80 border-0  "}
      />
    </Carousel>
  );
}

export default ImageCarousel;
