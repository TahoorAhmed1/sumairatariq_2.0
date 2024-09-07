import ResetPassword from "@/components/reset-password/reset-password";
import { redirect } from "next/navigation";

function page({ searchParams }) {
  const { token } = searchParams;
  if (!token) {
    return redirect("/forgot-password");
  }
  return <ResetPassword token={token} />;
}

export default page;
