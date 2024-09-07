import Dashboard from "@/components/dashborad/dashboard";
function page({ searchParams }) {
  return <Dashboard route={searchParams?.route || ""} />;
}
export default page;
