"use client";
import { useForm } from "react-hook-form";
import Heading from "../common/heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderchema } from "@/validation";
import Button from "../common/button";

function TrackOrder() {
  const form = useForm({
    resolver: zodResolver(trackOrderchema),
    defaultValues: {
      orderId: "",
      email: "",
    },
  });
  function onSubmit(values) {}
  return (
    <div className="max-w-[1000px] px-4 mx-auto items-center my-5 flex flex-col justify-center min-h-[70vh]">
      <Heading title={"Track Your Order"} newClass="text-4xl" />

      <div className="grid gap-8 my-8">
        <p className="text-slate-700 text-sm">
          To track your order please enter your Order ID in the box below and
          press the Track button. This was given to you on your receipt and in
          the confirmation email you should have received.
        </p>
        <div className="grid gap-5 w-full ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full grid  gap-5 "
            >
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Order Id <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className=" border-slate-300"
                        placeholder="Find in your order email"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Billing Email <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className=" border-slate-300"
                        placeholder="Email used during checkout"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  type={"submit"}
                  name={"Track"}
                  newClass={"bg-[#d33] text-white py-2 text-sm px-6 rounded-md"}
                ></Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
