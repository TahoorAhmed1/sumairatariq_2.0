"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, reviewFormSchema } from "@/validation";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import Button from "../common/button";
import { API } from "@/services";
import { notify } from "@/lib/notify";
import { Loader } from "lucide-react";

function Review({ productId, reviews, setReviews, setReview }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingMessage, setRatingMessage] = useState(false);

  const form = useForm({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    if (rating == 0) {
      return setRatingMessage(true);
    }
    try {
      let payload = {
        ...values,
        rating,
        product_id: productId,
      };
      await API.createRating(payload);
      setReviews([...reviews, { ...payload, createdAt: Date.now() }]);
      setRating(0);
      setHover(0);
      form.reset();
      notify("success", "Your review has been added");
      setReview(false);
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid gap-5 grid-cols-1   "
      >
        <div className="flex flex-col gap-y-4 w-full ">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-500">Name</FormLabel>
                  <FormControl>
                    <Input {...field} className=" border-slate-300  py-2" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-500">Email</FormLabel>
                  <FormControl>
                    <Input {...field} className=" border-slate-300" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <label className="text-sm text-slate-500">Rating</label>
            <div className="flex space-x-1">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={`text-3xl ${
                      index <= (hover || rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    &#9733;
                  </button>
                );
              })}
            </div>
            {ratingMessage && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                Rating is required
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-500">
                  Title of Review
                </FormLabel>
                <FormControl>
                  <Input {...field} className=" border-slate-300" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-500">
                  How was your overall experience?
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className=" border-slate-300  py-2 h-32"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            disabled={isLoading}
            type={"submit"}
            name={
              isLoading ? (
                <Loader className="animate-spin text-center w-5 h-5 m-auto " />
              ) : (
                "Submit"
              )
            }
            newClass={
              "bg-black text-white text-sm py-2 px-5 w-20 rounded disabled:cursor-not-allowed "
            }
          ></Button>
        </div>
      </form>
    </Form>
  );
}

export default Review;
