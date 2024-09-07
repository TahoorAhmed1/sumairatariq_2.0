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
import { API } from "@/services";
import { notify } from "@/lib/notify";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    phoneNumber: z.string().min(11, {
      message: "Phone number must be at least 11 characters.",
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

function Signup() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const router = useRouter();
  async function onSubmit(values) {
    const { confirmPassword, ...data } = values;
    try {
      let res = await API.register(data);
      Cookies.set("token", res?.data?.token);
      notify("success", res?.data?.message);
      router.push("/login");
    } catch (error) {
      if (error?.response?.data?.message) {
        return notify("error", error?.response?.data?.message);
      }
      return notify("error", error?.message);
    }
  }
  const isLoading = form.formState.isSubmitting;

  return (
    <main class="flex min-h-screen bg-pink-50 ">
      <div class="w-full max-w-xl m-auto bg-white  shadow-2xl rounded px-6 py-5">
        <Link href={"/"}>
          <Image
            width={1000}
            height={1000}
            src={logo}
            class="w-[170px] mx-auto mb-2"
            alt="root"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-[#d33] text-base">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-[#d33] text-base">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
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
            <div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number{" "}
                      <span className="text-[#d33] text-base">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone Number"
                        className="border-slate-300 placeholder:text-slate-400"
                      />
                    </FormControl>

                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>
            <p className="mt-2 text-slate-500 text-base">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <Link
                href={"/privacy-policy/return-and-exchange"}
                className="text-slate-800 underline"
              >
                privacy policy
              </Link>
              .
            </p>
            <div className="mt-2">
              <button
                disabled={isLoading}
                className="w-full text-sm uppercase disabled:bg-slate-800/80 disabled:cursor-not-allowed bg-slate-900/90 hover:bg-slate-900/80 text-white font-semibold py-2.5 px-4  rounded"
              >
                {isLoading ? (
                  <Loader className="animate-spin text-center w-5 h-5 m-auto" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-sm text-slate-600 ">
          Already have an account{" "}
          <Link href={"/login"} className="text-[#d33]">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Signup;
