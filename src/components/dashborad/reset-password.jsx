"use client";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { resetFormSchema } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "@/services";
import { LoaderIcon } from "lucide-react";
import { notify } from "@/lib/notify";

function ResetPassword() {
  const form = useForm({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      password: "",
      oldPassword: "",
      confirmPassword: "",
    },
  });

  const isLoadingbutton = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      let res = await API.updatePassword({
        oldpassword: values?.oldPassword,
        password: values?.password,
      });
      let data = res.data;
      form.reset();
      return notify("success", data.message);
    } catch (error) {
      form.reset();
      if (error?.response?.data?.message) {
        return notify("error", error.message);
      }
      return notify("error", error.message);
    }
  }

  return (
    <div>
      <h2 className="font-semibold text-xl mb-5"> Change Password</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-2 grid gap-4 lg:grid-cols-2 grid-cols-1"
        >
          <div className="col-span-full w-full">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Current password (leave blank to leave unchanged)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-slate-300 py-4"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    New password (leave blank to leave unchanged)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-slate-300 py-4"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full w-full">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-slate-300 py-4"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <button
            disabled={isLoadingbutton}
            type="submit"
            className="bg-[#DD3333] text-sm rounded-[4px] py-3 px-6 w-full text-white mt-5"
          >
            {isLoadingbutton ? (
              <LoaderIcon className="text-center w-5 h-5 mx-auto text-white animate-spin" />
            ) : (
              "Save changes"
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPassword;
