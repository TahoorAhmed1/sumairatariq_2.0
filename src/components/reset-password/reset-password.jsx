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
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

function ResetPassword({ token }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    if (!token) return;
    try {
      let res = await API.resetPassword({
        token: token,
        password: values?.password,
      });
      if (res?.data) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return notify("success", "password change successfully");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        setTimeout(() => {
          router.push("/forgot-password");
        }, 2000);
        return notify("error", error?.response?.data?.message);
      }
      return notify("error", error?.message);
    }
  }
  const isLoading = form?.formState?.isSubmitting;
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-[#d33] text-base">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Password"
                        className="border-slate-300 placeholder:text-slate-400"
                      />
                    </FormControl>

                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password{" "}
                      <span className="text-[#d33] text-base">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Confirm password"
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
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default ResetPassword;
