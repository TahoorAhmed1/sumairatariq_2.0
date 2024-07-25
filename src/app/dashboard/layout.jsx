import { Nunito } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
const inter = Nunito({ subsets: ["latin"], weight: "400" });
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/common/header";

export const metadata = {
  title: "Sumaira Tariq || Were Different",
  description: "Sumara Tariq || Were Different ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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

        <div className="flex justify-between container py-12">{children}</div>
      </body>
    </html>
  );
}
