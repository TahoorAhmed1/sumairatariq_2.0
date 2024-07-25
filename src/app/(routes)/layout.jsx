"use client";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Roboto } from "next/font/google";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Loader from "@/components/common/loader";
import ReactWhatsapp from "react-whatsapp";
import { RiWhatsappFill } from "react-icons/ri";

const inter = Roboto({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
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
