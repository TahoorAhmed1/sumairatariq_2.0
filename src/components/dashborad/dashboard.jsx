"use client";
import AccountInfo from "@/components/dashborad/account-info";
import OrderTrack from "@/components/dashborad/order-track";
import ResetPassword from "@/components/dashborad/reset-password";
import SidebarDashboard from "@/components/dashborad/sidebar-dashboard";
import { useHome } from "@/store/home";
export default function Dashboard({ route }) {
  const { user } = useHome();

  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[320px_1fr] gap-5 ">
      <SidebarDashboard route={route} />

      <div className="flex flex-col overflow-auto w-full">
        {route == "" && (
          <div className="text-base">
            <h2 className="mb-4">
              Hello <span className="font-semibold">{user?.name}</span> (not
              <span className="font-semibold ml-1 ">{user?.name}</span> ? Log
              out)
            </h2>
            <p>
              From your account dashboard you can view your recent orders, edit
              your password and account details.
            </p>
          </div>
        )}
        {route === "order" && <OrderTrack />}
        {route === "account" && <AccountInfo user={user} />}
        {route === "credentials" && <ResetPassword />}
      </div>
    </div>
  );
}
