import Heading from "@/components/common/heading";
function page() {
  return (
    <div className="container mx-auto items-center md:my-28 my-20 ">
      <Heading title={"Wholesale"} newClass="text-4xl mb-5" />
      <nav>
        <ul className="grid gap-2 sm:list-disc sm:pl-6 text-base">
          <li>
            Our Address SUMAIRA TARIQ, Diamond Residency near iqra university,
            defence view, karachi
          </li>
          <li>
            For further queries about exchanges and returns, please contact us
            at 0322 2368356, info@sumairatariq.com (10 AM to 7 PM) - Monday to
            Saturday
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default page;
