"use client";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Roboto } from "next/font/google";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import Loader from "@/components/common/loader";
import ReactWhatsapp from "react-whatsapp";
import { RiWhatsappFill } from "react-icons/ri";
import { sortDataByDate } from "@/lib/utils";
import { API } from "@/services";
import { useHome } from "@/store/home";
import axios from "axios";

const inter = Roboto({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  const {
    loader,
    setLoader,
    setLoading,
    setBannerImage,
    setSliderImages,
    setSliderImagesReverse,
    setAllCategoriesWithImages,
    setCategoriesL,
    setCategoriesR,
    setData,
  } = useHome();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/GetAllCategories`
        );
        let data = res?.data;
        console.log(data, "dataa");
        setData(data);
        const midIndex = Math.ceil(data.length / 2);
        setCategoriesL(data.slice(midIndex));
        setCategoriesR(data.slice(0, midIndex));
        setLoader(false);
      } catch (error) {
      } finally {
        setLoader(false);
      }
    };
    getAllCategories();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [sliderRes, bannerRes, categoryRes] = await Promise.all([
        API.GetSliderProducts(),
        API.SliderResImages(),
        API.GetAllCategoriesWithImages(),
      ]);

      const sortedSliderImages = sortDataByDate(sliderRes?.data);
      setBannerImage(bannerRes?.data);
      setSliderImages(sortedSliderImages);
      setSliderImagesReverse([...sortedSliderImages].reverse());
      setAllCategoriesWithImages(categoryRes?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {loader ? (
          <Loader />
        ) : (
          <>
            <Header />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ReactWhatsapp
              number="+92 322 2368356"
              message=""
              className="whatsapp_float"
            >
              <RiWhatsappFill className="whatsapp-icon" />
            </ReactWhatsapp>
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
