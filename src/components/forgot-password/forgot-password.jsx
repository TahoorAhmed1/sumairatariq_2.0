"use client";
import { logo } from "@/assets";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { notify } from "@/lib/notify";
import { API } from "@/services";

const formSchema = z.object({
  email: z.string().email(),
});

function ForgotPassword() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    try {
      let res = await API.forgetPassword(values);

      if (res?.data) {
        return notify("success", "Email send successfully");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        return notify("error", error?.response?.data?.message);
      }
      return notify("error", error?.message);
    }
  }
  const isLoading = form.formState.isSubmitting;
  return (
    <main class="flex min-h-screen bg-pink-50  ">
      <div class="w-full max-w-lg m-auto  bg-white shadow-2xl rounded px-6 py-5">
        <Link href={"/"}>
          <Image
            width={1000}
            height={1000}
            src={logo}
            class="w-[170px] mx-auto mb-2"
          />
        </Link>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-[#d33] text-base">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Email "
                        className="border-slate-300 placeholder:text-slate-400"
                      />
                    </FormControl>

                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-2">
              <button class="w-full text-sm uppercase bg-slate-900/90 hover:bg-slate-900/80 text-white font-semibold py-2.5 px-4  rounded">
                {isLoading ? (
                  <Loader className="animate-spin text-center w-5 h-5 m-auto" />
                ) : (
                  "Forgot Email"
                )}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default ForgotPassword;
