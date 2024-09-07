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
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { notify } from "@/lib/notify";
import { API } from "@/services";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, {
    message: "Password must be at least 6 characters.",
  }),
});

function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  async function onSubmit(values) {
    try {
      let res = await API.login(values);

      if (res.data.token) {
        Cookies.set("token", res?.data?.token);
        localStorage.setItem(
          "user_id",
          JSON.stringify(res?.data?.Customer?.id)
        );
        notify("success", "Login successfully");
        router.push("/");
      } else {
        notify("error", res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        return notify("error", error?.response?.data?.message);
      }
      return notify("error", error?.message);
    }
  }
  const isLoading = form?.formState.isSubmitting;
  return (
    <main class="flex min-h-screen bg-pink-50  ">
      <div class="w-full max-w-xl m-auto  bg-white shadow-2xl rounded px-6 py-5">
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
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="border-slate-300 placeholder:text-slate-400"
                      />
                    </FormControl>

                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <button class="w-full text-sm uppercase bg-slate-900/90 W-[200px] hover:bg-slate-900/80 text-white font-semibold py-2.5 px-4  rounded">
                {isLoading ? (
                  <Loader className="animate-spin text-center w-5 h-5 m-auto" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </Form>
        <div className="flex justify-between text-sm items-center mt-5">
          <div className="flex items-center gap-x-2">
            <input type="checkbox" className="w-3 h-3"></input>
            <p>Remember me</p>
          </div>
          <Link href={"/forgot-password"} className="text-[#d33] ml-1">
            Lost your password?
          </Link>
        </div>
        <div className="mt-5 text-sm">
          Don&apos;t have an account
          <Link href={"/signup"} className="text-[#d33] ml-1">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
