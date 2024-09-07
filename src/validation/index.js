import { z } from "zod";

export const checkoutFormSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country is required.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  note: z.string().optional(),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  phone: z.string().min(7, {
    message: "Phone must be at least 7 characters.",
  }),
  email: z.string().email().min(1, {
    message: "Email required",
  }),
});

export const userFormSchema = z.object({
  firstname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  display: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),

  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export const resetFormSchema = z
  .object({
    oldPassword: z.string().min(1, {
      message: "OldPassword required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    password: z.string().min(6, {
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

export const trackOrderchema = z.object({
  orderId: z.string().min(2, {
    message: "order Id must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email required",
  }),
});

export const reviewFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }),

  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});
