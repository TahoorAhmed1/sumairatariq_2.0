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

import "react-photo-view/dist/react-photo-view.css";
import FullViewSlider from "./fullViewSlider";
import { renderSkeletons } from "../common/productcardSkeleton";

function ProductDetail({ data }) {
  const router = useRouter();
  const { addToCart, buyNow, cart } = useProductCart();
  const params = useSearchParams();
  const paramsColor = params.get("color");
  const paramsSize = params.get("size");
  const { setOpen } = useProductDrawer();
  const [stock, setStock] = useState(0);
  const [color, setColor] = useState(paramsColor);
  const [size, setSize] = useState(paramsSize);
  const [api1, setApi1] = useState(null);
  const [api2, setApi2] = useState(null);
  const [image, setImage] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [productId, setProductId] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [productLoading, setLoadingProduct] = useState(true);
  const [isReview, setReview] = useState(false);

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

  useEffect(() => {
    if (data?.items?.length > 0) {
      filterImageByColor(paramsColor || data.items[0].color);
    }
  }, [paramsColor]);

  useEffect(() => {
    if (data && data.items?.length > 0) {
      const selectedItem = data.items.find((item) => item.color === color);
      if (!selectedItem?.QuantityAvailable) {
        router.push();
      }
      if (selectedItem) {
        setDiscount(selectedItem?.Discount);
        setStock(selectedItem?.QuantityAvailable);
        setProductId(selectedItem?.id);
      }
    } else {
      router.push("/");
    }
  }, [color]);

  const filterImageByColor = (selectedColor) => {
    const filteredImages = data?.Images?.filter(
      (img) => img.itemColor === selectedColor
    );
    setImage(filteredImages);
  };

  const fetchData = async () => {
    setLoadingProduct(true);
    try {
      const sliderRes = await API.GetSliderProducts();
      setSliderImages(sliderRes?.data);
    } catch (error) {
    } finally {
      setLoadingProduct(false);
    }
  };

  const getReview = async (id) => {
    try {
      const res = await API.getReviews(id);
      setReviews(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    if (data?.id) {
      getReview(data?.id);
    }
  }, [data?.id]);

  const filteredImages = data?.Images?.filter((img) =>
    data?.Color?.split(",").includes(img.itemColor)
  );
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

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
                  loading={"eager"}
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

      <div className="flex xl:flex-row flex-col bg-white gap-5 items-start justify-center pt-10 sm:container mx-auto px-2 overflow-hidden">
        <div className=" gap-5 lg:flex hidden">
          {image?.length < 0 ? (
            <Skeleton className="xl:w-[173px] w-[250px] h-[700px] bg-[#CCCCCC]/90" />
          ) : (
            <div className="flex flex-col " style={{ height: "100%" }}>
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
                className="xl:w-[173px] w-[250px]"
              >
                <CarouselContent className="h-[685px]  ">
                  {image?.map((data, index) => (
                    <CarouselItem
                      key={index}
                      className="h-full basis-1/3 cursor-pointer "
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
                          className="object-cover object-center rounded-lg h-full"
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
            <Skeleton className="w-full h-[670px] bg-[#CCCCCC]/90" />
          ) : (
            <div className="h-[670px]">
              <Carousel
                setApi={setApi2}
                className="w-[549px]"
                opts={{
                  align: "start",
                  loop: true,
                }}
                orientation="horizontal"
              >
                <CarouselContent className="h-[670px] ">
                  {image?.map((data, index) => (
                    <CarouselItem key={index} className="h-full cursor-pointer">
                      <div
                        onClick={() => handleSliderItemClick(index)}
                        className="relative"
                      >
                        <Image
                          width={1000}
                          loading={"eager"}
                          height={1000}
                          alt="image of a girl posing"
                          className="object-cover object-center h-[670px] w-full rounded-lg  "
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                          priority
                        />
                        <div
                          onClick={() => {
                            setShow(true);
                            setIndex(index);
                          }}
                          className="absolute bottom-5 left-5 z-50  bg-slate-600/30 text-white w-8 h-8 rounded flex items-center justify-center"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                            ></path>
                          </svg>
                        </div>
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
                className="h-full w-full"
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
                <CarouselContent>
                  {image?.map((data, index) => (
                    <CarouselItem key={index} className="h-full ">
                      <div
                        className="relative"
                        onClick={() => handleSliderItemClick(index)}
                      >
                        <Image
                          width={1000}
                          loading={"eager"}
                          height={1000}
                          alt="image of a girl posing"
                          className="object-cover object-center h-full w-full rounded-lg"
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                          priority
                        />
                        <div
                          onClick={() => {
                            setShow(true);
                            setIndex(index);
                          }}
                          className="absolute bottom-5 left-5 z-50  bg-slate-600/30 text-white w-8 h-8 rounded flex items-center justify-center"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <FullViewSlider
              images={image}
              Color={color}
              show={show}
              index={index}
              close={() => setShow(false)}
            />
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
              /-
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
                    setStock(item[0]?.QuantityAvailable);
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
                    // router.replace(
                    //   `/product/${data.id}?color=${
                    //     color ? color : ""
                    //   }&size=${name}`
                    // );
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
                    price:
                      discount !== 0
                        ? data?.price - (discount / 100) * data?.price
                        : data?.price,
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
                    price:
                      discount !== 0
                        ? data?.price - (discount / 100) * data?.price
                        : data?.price,
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
            {renderSkeletons(5)}
          </div>
        ) : (
          <ProductCarousel
            data={sliderImages}
            newClass={`xl:basis-1/5  lg:basis-1/4  xs:basis-1/2 `}
          />
        )}
      </div>
    </main>
  );
}

export default ProductDetail;
