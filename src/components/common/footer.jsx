"use client";
import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import BottomNav from "./bottom-nav";
import { API } from "@/services";
import { notify } from "@/lib/notify";
import { LoaderIcon } from "lucide-react";

function Footer() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let token = Cookies.get("token");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.subscribeByEmail({
        email: email,
        sendEmail: true,
      });
      setEmail("");
    } catch (error) {
      setEmail("");
      if (error?.response?.data?.message) {
        return notify("error", error?.response?.data?.message);
      }
      notify("error", error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <BottomNav token={token} />

      <footer className="bg-black   lg:block hidden">
        <div className="container py-4">
          <div className="flex md:flex-row justify-between flex-col md:gap-10 gap-5  lg:py-6">
            <div className="flex flex-col gap-5">
              <Link href={`/`}>
                <div className="logo">
                  <Image
                    src={logo}
                    width={500}
                    height={500}
                    className="w-[140px]"
                    alt="logo"
                  />
                </div>
              </Link>

              <div className="flex flex-col gap-5 text-white">
                <p className="text-sm ">
                  Diamond Residency near iqra university defence view karachi
                </p>
                <div className="flex flex-col text-sm gap-y-2">
                  <p>Phone: 0322 2368356</p>
                  <p>WhatsApp: +92 3222368356</p>
                  <p> Email: info@sumairatariq.com </p>
                  <p> Customer Care: Monday to Saturday (10AM to 7PM)</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white ">
                CUSTOMER SERVICE
              </h2>
              <ul className="text-white font-medium">
                <li className="mb-1">
                  <Link
                    href="/privacy-policy/return-and-exchange"
                    className="text-sm"
                  >
                    Returns & Exchanges Policy
                  </Link>
                </li>
                <li className="">
                  <Link href="/privacy-policy/wholesale" className="text-sm">
                    Wholesale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase ">
                SUPPORT
              </h2>
              <ul className="text-white font-medium">
                <li className="mb-2">
                  <Link href="/" className="text-sm">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col  text-white">
              <h2 className="mb-6 text-sm font-semibold  uppercase ">
                Subscribe
              </h2>
              <p className="text-sm mb-4">
                Subscribe to our Newsletter for Exclusive Updates
              </p>
              <form
                onSubmit={onSubmit}
                className="flex  flex-wrap  items-center gap-2"
              >
                <input
                  className="rounded-[5px] flex-1 py-2.5 px-4 w-full  text-black text-sm"
                  placeholder="Enter Email "
                  value={email}
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button className="py-2 px-4 w-24 border border-white rounded-[5px] text-sm">
                  {loading ? (
                    <LoaderIcon className="animate-spin w-5 h-5" />
                  ) : (
                    "    Subscribe"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        <Separator className="border-t border-slate-500" />
        <div className="py-6 bg-black md:flex md:items-center md:justify-between">
          <div className="container">
            <span className="text-sm text-white dark:text-gray-300 sm:text-center">
              © Copyright 2023 Sumaira Tariq. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
