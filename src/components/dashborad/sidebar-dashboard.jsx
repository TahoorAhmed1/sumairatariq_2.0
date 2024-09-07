"use client";
import Link from "next/link";
import { Heart, Home, LogOut, Shield, ShoppingCart, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const SidebarDashboard = ({ route }) => {
  const router = useRouter();

  return (
    <div className=" border bg-muted/40 block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="">My Account</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
            <Link
              href="/dashboard?route="
              className={`flex items-center gap-3 rounded-lg px-3 ${
                route == "" ? "bg-slate-200/50" : ""
              } hover:bg-slate-200/60 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard?route=order"
              className={`flex items-center gap-3  ${
                route == "order" ? "bg-slate-200/50" : ""
              } rounded-lg px-3 hover:bg-slate-200/60 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              <ShoppingCart className="h-4 w-4" />
              Track Orders
            </Link>
            <Link
              href="/dashboard?route=account"
              className={`flex items-center gap-3 rounded-lg   ${
                route == "account" ? "bg-slate-200/50" : ""
              }  px-3 py-2 hover:bg-slate-200/60 text-muted-foreground transition-all hover:text-primary`}
            >
              <Users className="h-4 w-4" />
              Account Info
            </Link>
            <Link
              href="/dashboard?route=credentials"
              className={`flex items-center gap-3 rounded-lg   ${
                route == "credentials" ? "bg-slate-200/50" : ""
              } hover:bg-slate-200/60 px-3 py-2 text-primary transition-all hover:text-primary`}
            >
              <Shield className="h-4 w-4" />
              Credentials{" "}
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-200/60 text-muted-foreground transition-all hover:text-primary"
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </Link>

            <button
              onClick={() => {
                Cookies.remove("token");
                localStorage.clear();
                router.push("/login");
              }}
              href="#"
              className="flex text-red-500 items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-200/60 text-muted-foreground transition-all hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
