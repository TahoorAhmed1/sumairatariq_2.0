"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Heading from "../common/heading";
import { CheckoutForm } from "./checkout-form";
import { useProductCart } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { checkoutFormSchema } from "../../validation";
import { notify } from "@/lib/notify";
import { API } from "@/services";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import CryptoJS from "crypto-js";

export function Checkout() {
  const { subTotal, cart, clearCart } = useProductCart();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      note: "",
      fullname: "",
      country: "",
      address: "",
      note: "",
      city: "",
      phone: "",
      email: "",
    },
  });
  const [isLoadingbutton, setIsLoadingbutton] = useState(false);
  const [isCheckedTerm, setIsCheckedTerm] = useState(false);
  const [multipleProduct, setAllMultipleProducts] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setIsCheckedTerm(event.target.checked);
  };

  const getProduct = async (cart) => {
    let itemId = [];

    Object.keys(cart)?.map((e, i) => {
      return itemId.push(cart[e].product_id);
    });
    let arr = itemId.join("','");
    let arr2 = "'" + arr + "'";
    const payload = {
      ids: arr2,
    };
    await API.getAllMultipleProducts(payload)
      .then((res) => {
        let obj2 = [];
        Object.keys(cart)?.map((e, i) => {
          let filter = res.data.filter(
            (prod) => prod?.id === cart[e]?.product_id
          );
          return obj2.push({ Quantity: cart[e]?.quantity, ...filter[0] });
        });
        setAllMultipleProducts(obj2);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      try {
        let bytes = CryptoJS.AES.decrypt(cart, "12345");
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        getProduct(decryptedData);
      } catch (error) {
        if (error.message == "Malformed UTF-8 data") {
          localStorage.removeItem("cart");
        }
      }
    }
  }, [cart]);

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user_id"));
    if (id) {
      getUser(id);
    }
  }, []);

  useEffect(() => {
    if (user) {
      form.setValue("phone", user.phoneNumber);
      form.setValue("email", user.email);
      form.setValue("fullname", user.name);
    }
  }, [user, form]);

  function CreateSale(guestId, values) {
    const location = {
      Address: values?.address,
      Country: values?.country,
      City: values?.city,
    };

    const DataForAPI = user?.id
      ? {
          SpecialInstruction: "",
          TrackingNumber: "",
          discount: 0,
          shippingCharges: 0,
          Location: JSON.stringify(location),
          customerid: guestId,
          products: multipleProduct,
          total: subTotal.toString(),
        }
      : {
          SpecialInstruction: "",
          TrackingNumber: "",
          discount: 0,
          shippingCharges: 0,
          Location: JSON.stringify(location),
          guestid: guestId,
          products: multipleProduct,
          total: subTotal.toString(),
        };
    try {
      API.createSale(DataForAPI)
        .then((res) => {
          notify("success", "Order created successfully");
          router.push(`/thankyou/${res?.data?.Sale?.id}`);
          localStorage.removeItem("cart");
          clearCart();
          setIsLoadingbutton(false);
        })
        .catch((error) => {
          setIsLoadingbutton(false);
          if (error?.response?.data?.message) {
            notify("error", error?.response?.data?.message);
          } else {
            notify("error", error?.message);
          }
        });
    } catch (error) {
      setIsLoadingbutton(false);

      if (error?.response?.data?.message) {
        notify("error", error?.response?.data?.message);
      } else {
        notify("error", error?.message);
      }
    }
  }

  const CreateGuest = (values) => {
    try {
      let payload = {
        email: values?.email,
        name: values?.fullname,
        phoneNumber: values?.phone,
      };
      API.createGuest(payload)
        .then((res) => {
          CreateSale(res?.data?.data?.id, values);
        })
        .catch((error) => {});
    } catch (error) {
      if (error?.response?.data?.message) {
        notify("error", error?.response?.data?.message);
      } else {
        notify("error", error?.message);
      }
    }
  };

  const getUser = async (id) => {
    try {
      let res = await API.getCustomerInfo(id);
      let data = res.data;
      setUser(data[0]);
    } catch (error) {}
  };

  function onSubmit(values) {
    if (!multipleProduct.length) return;
    if (!isCheckedTerm) {
      setError("plz accept terms and condition");
    } else {
      setIsLoadingbutton(true);
      if (user?.id) {
        CreateSale(user?.id, values);
      } else {
        CreateGuest(values);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container grid gap-5 lg:grid-cols-2 grid-cols-1 my-20  "
      >
        <div className="">
          <h1 className="mb-8 font-semibold text-xl">BILLING & SHIPPING</h1>
          <CheckoutForm form={form} />
        </div>
        <div className="bg-slate-100 rounded-[5px] md:px-10 px-4  py-5">
          <Heading
            addClass={
              "text-center text-xl font-semibold text-black md:mb-10 mb-5 "
            }
            title={"Your Order"}
          />
          <div className="bg-white p-8 rounded-[5px]">
            <div className="flex justify-between items-center text-lg border-b pb-3">
              <p>Product</p>
              <p>SubTotal</p>
            </div>
            <div className="flex justify-between items-center text-sm text-black border-b py-4">
              <p>SubTotal</p>
              <p className="text-slate-600 ">
                <span>PKR</span> {subTotal}
              </p>
            </div>
            <div className="flex justify-between items-center text-sm  text-black border-b py-4">
              <p>Shipping Charges</p>
              <p className="text-slate-600">
                <span>PKR</span> 0
              </p>
            </div>

            <div className="flex justify-between items-center text-lg  font-semibold text-black pt-4">
              <p>Total</p>
              <p className="text-[#DD3333]">
                <span>PKR</span> {subTotal}
              </p>
            </div>
          </div>
          <div className="py-5">
            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                value={true}
                checked={true}
                className="border-teal-500 text-teal-500 w-4 h-4"
              />
              <span className="text-sm">Cash on Delivery</span>
            </div>

            <div className="p-4 bg-white w-full text-sm text-gray-700 my-5">
              Pay with cash upon delivery. We use Tracks for nationwide
              delivery.
            </div>
            <div className="py-4 border-y text-sm">
              Your personal data may be used to process your order, support your
              experience throughout this website, and for other purposes
              described in our privacy policy.
            </div>
            <div className="py-4">
              <div className="flex xs:items-center items-start gap-2 mb-1">
                <input
                  type="checkbox"
                  value={isCheckedTerm}
                  checked={isCheckedTerm}
                  onChange={handleChange}
                  className="text-xs sm:w-3 sm:h-3 w-4 h-4 rounded-[4px] text-gray-600"
                />
                <p className="text-sm ">
                  I have read and agree to the website terms and conditions *
                </p>
              </div>
              <p className="text-red-600 text-sm animate-pulse">{error}</p>
            </div>
            <div className="w-full my-4">
              <button
                disabled={isLoadingbutton}
                type={"submit"}
                className="bg-[#DD3333] text-sm rounded-[4px] py-3 px-6 w-full text-white"
              >
                {isLoadingbutton ? (
                  <LoaderIcon className="text-center w-5 h-5 mx-auto text-white animate-spin" />
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
