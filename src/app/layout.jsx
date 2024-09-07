"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Roboto({ subsets: ["latin"], weight: "400" });
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script>
          {`(function(w,d,s,r,n){
            w.TrustpilotObject=n;
            w[n]=w[n]||function(){
                (w[n].q=w[n].q||[]).push(arguments)
            };
            a=d.createElement(s);
            a.async=1;
            a.src=r;
            a.type='text/java'+s;
            f=d.getElementsByTagName(s)[0];
            f.parentNode.insertBefore(a,f)
        })(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
        tp('register', '6E54m9Ir9odOQr4Q');
        
        
        
        
        `}
        </script>
      </head>
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
