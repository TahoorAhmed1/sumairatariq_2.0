"use client";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import Button from "../common/button";
import { useSearchParams } from "next/navigation";
import { useProductCart } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useProductDrawer } from "@/store/use-drawer";
import { notify } from "@/lib/notify";
import { API } from "@/services";
import Review from "./review-form";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Skeleton } from "../ui/skeleton";
import ProductCarousel from "../common/product-crousel";
import Heading from "../common/heading";

function ProductDetail({ data }) {
  const router = useRouter();
  const { addToCart, buyNow, cart } = useProductCart();
  const params = useSearchParams();
  const paramsColor = params.get("color");
  const paramsSize = params.get("size");
  const { setOpen } = useProductDrawer();
  const [stock, setStock] = useState();
  const [color, setColor] = useState(paramsColor);
  const [size, setSize] = useState(paramsSize);
  const [api1, setApi1] = useState(null);
  const [api2, setApi2] = useState(null);
  const [image, setImage] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [discount, setDiscount] = useState(0);
  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (api1 && api2) {
      api1.on("select", () => {
        api2.scrollTo(api1.selectedScrollSnap());
      });

      api2.on("select", () => {
        api1.scrollTo(api2.selectedScrollSnap());
      });
    }
  }, [api1, api2]);

  const handleSliderItemClick = (index) => {
    if (api1 && api2) {
      api1.scrollTo(index);
      api2.scrollTo(index);
    }
  };
  const [productId, setProductId] = useState();

  useEffect(() => {
    filterImageByColor(paramsColor);
    let item = data?.items?.filter((item) => item?.color === color);
    setDiscount(item[0]?.Discount);
    setStock(item[0].QuantityAvailable);
    setProductId(item[0].id);
  }, [data]);

  const filterImageByColor = async (color) => {
    setImage([]);
    let newdata = data?.Images?.filter((data) => {
      return data.itemColor == color;
    });
    setImage(newdata);
  };

  const [sliderImages, setSliderImages] = useState([]);
  const [productLoading, setLoadingProduct] = useState(true);
  const fetchData = async () => {
    setLoadingProduct(true);
    try {
      const [sliderRes] = await Promise.all([API.GetSliderProducts()]);
      setSliderImages(sliderRes?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProduct(false);
    }
  };

  const getReview = async (id) => {
    try {
      let res = await API.getReviews(id);
      let data = res.data;
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (data?.id) {
      getReview(data?.id);
    }
  }, []);

  const [isReview, setReview] = useState(false);
  const filteredImages = data?.Images?.filter((image) => {
    const colors = data?.Color?.split(",") || [];
    return colors.includes(image.itemColor);
  });
  console.log(data);

  return (
    <main className="overflow-x-hidden">
      <div className=" absolute -left-[9999px]">
        {filteredImages?.map((data, index) => {
          return (
            <div key={index} className="w-1 h-1 opacity-0  cursor-pointer">
              <div className=" flex justify-center items-center">
                <Image
                  width={1000}
                  height={1000}
                  loading={"lazy"}
                  alt="product image"
                  quality={0}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                  priority
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex xl:flex-row flex-col bg-white gap-4 items-start justify-center pt-10 sm:container mx-auto px-2 overflow-hidden">
        <div className="w-full  gap-4 lg:flex hidden ">
          {image?.length < 0 ? (
            <Skeleton className="xl:w-[173px] w-[250px] h-[750px] bg-[#CCCCCC]/90" />
          ) : (
            <div className="flex flex-col" style={{ height: "750px" }}>
              <Carousel
                setApi={setApi1}
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                orientation="vertical"
                className="xl:w-[173px] w-[250px] "
              >
                <CarouselContent className="h-[750px]">
                  {image?.map((data, index) => (
                    <CarouselItem
                      key={index}
                      className="h-full basis-1/3 cursor-pointer"
                    >
                      <div
                        onClick={() => handleSliderItemClick(index)}
                        className="h-full flex justify-center items-center"
                      >
                        <Image
                          width={1000}
                          loading={"eager"}
                          height={1000}
                          alt="product image"
                          className={`object-cover object-center rounded-xl `}
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                          priority
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
          {image?.length < 0 ? (
            <Skeleton className="w-full h-[750px] bg-[#CCCCCC]/90" />
          ) : (
            <div className="h-[750px] ">
              <Carousel
                setApi={setApi2}
                className="w-[549px]"
                opts={{
                  align: "start",
                  loop: true,
                }}
                orientation="horizontal"
              >
                <CarouselContent className="h-[750px]">
                  {image?.map((data, index) => (
                    <CarouselItem
                      key={index}
                      className="h-full  cursor-pointer"
                    >
                      <div onClick={() => handleSliderItemClick(index)}>
                        <Image
                          width={1000}
                          loading={"eager"}
                          height={1000}
                          alt="image of a girl posing"
                          className={`object-cover object-center h-full w-full rounded-xl `}
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                          priority
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </div>

        {image?.length < 0 ? (
          <Skeleton className="w-full h-full bg-[#CCCCCC]/90" />
        ) : (
          <div className="w-full gap-4 lg:hidden flex justify-center">
            <div className="h-full w-full">
              <Carousel
                className="h-full w-full "
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                orientation="horizontal"
              >
                <CarouselContent className="">
                  {image?.map((data, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div onClick={() => handleSliderItemClick(index)}>
                        <Image
                          width={1000}
                          loading={"eager"}
                          height={1000}
                          alt="image of a girl posing"
                          className={`object-cover object-center h-full w-full rounded-xl `}
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                          priority
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        )}
        <div className=" w-[90%]  flex flex-col gap-y-5">
          <h1 className="lg:text-2xl text-xl font-semibold">{data?.name}</h1>
          <span className="lg:text-2xl text-xl font-semibold text-[#d33] flex items-center gap-x-3">
            {discount !== 0 ? (
              <span className="line-through text-[#bdbdbd]">
                <span className="mr-0.5">PKR.</span>
                {data?.price}{" "}
              </span>
            ) : null}
            <span>
              <span className="mr-0.5">PKR.</span>
              {discount !== 0
                ? data?.price - (discount / 100) * data?.price
                : data?.price}
            </span>
          </span>
          <div>
            <p className="text-sm mb-1.5 font-semibold  text-slate-800 ">
              Color : <span>{color}</span>
            </p>
            <div className="flex gap-2 items-center flex-wrap  text-slate-800 ">
              {data?.Color?.split(",").map((name, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // router.replace(
                    //   `/product/${data.id}?color=${name}&size=${
                    //     size ? size : ""
                    //   }`
                    // );
                    let newdata = data?.Images?.filter((data) => {
                      return data.itemColor == name;
                    });
                    setImage(newdata.length > 0 ? newdata : data?.Images);

                    let item = data?.items?.filter(
                      (item) => item?.color === name
                    );
                    setStock(item[0].QuantityAvailable);
                    setProductId(item[0].id);
                    setColor(name);
                  }}
                  className={`${
                    color == name
                      ? "bg-slate-200 text-black  hover:bg-slate-200/80"
                      : "bg-white  hover:bg-slate-50  text-black border-slate-200"
                  }  px-3 py-1.5 text-sm border  transition-opacity duration-500   rounded`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          {stock > 0 ? (
            <div className="flex items-center gap-x-2">
              <div>
                <Check className="text-[#d33] w-5 h-5"></Check>
              </div>
              <p className="font-semibold flex gap-2">
                <span>{stock}</span>
                <span>in Stock</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="font-semibold flex gap-2 text-[#d33]">
                <span>Out of Stock</span>
              </p>
            </div>
          )}
          <div>
            <p className="text-sm mb-1.5  text-black font-semibold ">
              Size : <span>{size}</span>
            </p>
            <div className="flex gap-2      items-center flex-wrap">
              {data?.size?.split(",").map((name, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSize(name);
                    router.replace(
                      `/product/${data.id}?color=${
                        color ? color : ""
                      }&size=${name}`
                    );
                  }}
                  className={`${
                    size == name
                      ? "bg-slate-200 text-black  hover:bg-slate-200/80"
                      : "bg-white  hover:bg-slate-50  text-black border-slate-200"
                  }  px-3 py-1.5 text-sm border  transition-opacity duration-500   rounded`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-1.5 ">
            <div className="inline-flex items-center ">
              <Button
                onClick={decrement}
                disabled={quantity < 2 ? true : false || stock <= 0}
                name={<Minus width={1000} height={1000} className="w-5 h-5" />}
                newClass="bg-white rounded-l border text-gray-600 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1.5 border-r border-gray-200"
              />
              <div className="bg-slate-50 border-t border-b border-gray-100  text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1.5 select-none text-sm">
                {quantity}
              </div>
              <Button
                disabled={quantity == stock || stock <= 0}
                onClick={increment}
                name={<Plus width={1000} height={1000} className="w-5 h-5" />}
                newClass="bg-white rounded-r border text-gray-600 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1.5 border-r border-gray-200"
              />
            </div>
            <div className="flex items-center flex-wrap gap-4   ">
              <button
                disabled={!data || stock === 0 || quantity === 0}
                onClick={() => {
                  if (!data || stock === 0 || quantity === 0) {
                    return;
                  }

                  const id = `${data.id}${color}${size}`;
                  const currentProduct = cart[id];

                  const totalQuantityInCart = currentProduct
                    ? currentProduct.quantity + quantity
                    : quantity;

                  if (totalQuantityInCart > stock) {
                    return notify(
                      "error",
                      "Maximum available quantity reached. Review your cart"
                    );
                  }

                  addToCart({
                    id: data?.id,
                    product_id: productId,
                    title: data?.name,
                    color: color,
                    quantity: quantity,
                    size: size,
                    image: image[0]?.filename,
                    price: data?.price,
                    stock: stock,
                  });
                  setOpen();
                }}
                className="px-4 w-28 py-1.5 text-white text-sm bg-[#d33] border border-[#d33] disabled:bg-[#d33]/80 disabled:cursor-not-allowed rounded hover:bg-[#d33]/80"
              >
                Add to Cart
              </button>

              <button
                disabled={!data || stock === 0 || quantity === 0}
                onClick={() => {
                  if (!data || stock === 0 || quantity === 0) {
                    return;
                  }

                  buyNow({
                    id: data?.id,
                    product_id: productId,
                    title: data?.name,
                    color: color,
                    quantity: quantity,
                    size: size,
                    image: image[0]?.filename,
                    price: data?.price,
                    stock: stock,
                  });
                  router.push("/checkout");
                }}
                className="px-4 w-28  py-1.5  text-white text-sm bg-[#d33] disabled:bg-[#d33]/80 disabled:cursor-not-allowed  border border-[#d33] rounded hover:bg-[#d33]/80"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex mb-6 text-slate-800 items-center gap-x-2 text-sm  ">
              <p className="text-black font-semibold ">Tags:</p>
              {data?.Tags?.split(",").map((name, index) => (
                <span key={index}>{name + ","}</span>
              ))}
            </div>
            <div className="text-sm text-slate-800 flex flex-col gap-y-4">
              {data?.Description ? (
                <Editor
                  readOnly={true}
                  editorState={EditorState.createWithContent(
                    convertFromRaw(JSON.parse(data?.Description))
                  )}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:container mx-auto px-2 my-10 grid gap-5">
        <div className="flex justify-end ">
          <Button
            name={"Write A Review"}
            onClick={() => setReview(!isReview)}
          />
        </div>
        {isReview && (
          <div className="border border-slate-300  md:p-6 p-4 rounded-md">
            <Review
              setReview={setReview}
              setReviews={setReviews}
              reviews={reviews}
              productId={data.id}
            />
          </div>
        )}
        <div>
          <h2 className="text-sm text-slate-600 font-semibold mb-3">Reviews</h2>
          {reviews.length == 0 ? (
            <h2 className="text-base font-semibold text-gray-900">
              No Reviews Available
            </h2>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-5 gap-5 ">
              {reviews?.map((review, index) => {
                return (
                  <div
                    key={index}
                    className=" bg-slate-100/70 hover:bg-slate-100/50 rounded-lg p-4"
                  >
                    <div class="flex items-center gap-x-2 mb-1 ">
                      <div className="text-gray-900 w-11 h-11 text-base text-center flex items-center justify-center rounded-full bg-slate-200/90 hover:bg-slate-200/70  ">
                        {review?.name?.slice(0, 1)}
                      </div>
                      <div class="font-medium text-gray-900 ">
                        <p>
                          {review?.name}
                          <time
                            datetime="2014-08-16 19:00"
                            class="block text-sm text-gray-500"
                          >
                            {new Date(review?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center  space-x-1 mb-1  ">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={`text-2xl ${
                              index <= review?.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            } cursor-none`}
                          >
                            &#9733;
                          </button>
                        );
                      })}
                    </div>
                    <p className="mb-1 text-base text-gray-800 min-h-5">
                      {review?.title}
                    </p>
                    <p class=" text-gray-500  text-sm min-h-5">
                      {review?.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className=" sm:container mx-auto px-2 my-20">
        <Heading title={"Recent Products"} addClass={"mb-10 font-semibold"} />

        {productLoading ? (
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-4 w-full  py-5">
            {Array(4)
              .fill()
              .map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <Skeleton
                    className="h-[310px] w-full rounded-[8px] bg-[#CCCCCC]"
                    animation="wave"
                  />
                  <Skeleton
                    className="h-7 w-full rounded-lg bg-[#CCCCCC]/90"
                    animation="wave"
                  />
                  <Skeleton
                    className="h-7 w-full rounded-lg bg-[#CCCCCC]/90"
                    animation="wave"
                  />
                </div>
              ))}
          </div>
        ) : (
          <ProductCarousel
            data={sliderImages}
            newClass={`xl:basis-1/4  md:basis-1/3  xs:basis-1/2 `}
          />
        )}
      </div>
    </main>
  );
}

export default ProductDetail;
