import { Roboto } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Roboto({ subsets: ["latin"], weight: "400" });
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import TrustpilotWidget from "@/components/common/trustpilotWidget";
import Script from "next/script";

export const metadata = {
  title: "Sumaira Tariq || Were Different",
  description: "Sumara Tariq || Were Different ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
        {children}
      </body>
    </html>
  );
}
