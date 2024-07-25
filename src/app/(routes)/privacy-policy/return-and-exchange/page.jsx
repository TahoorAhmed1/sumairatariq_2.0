import Heading from "@/components/common/heading";

function page() {
  return (
    <div className="container mx-auto items-center md:my-20 my-16 ">
      <Heading title={"Return & Exchange"} newClass="text-4xl mb-5" />
      <nav>
        <ul className="grid gap-2 sm:list-disc sm:pl-6 text-base">
          <li>No cash refund Policy/ Credit voucher will be provided.</li>
          <li>
            We will gladly accept any unworn, unwashed merchandise with original
            tags within 30 Days of purchase for an exchange.
          </li>
          <li>
            Item bought on Sale can be a one-time exchange with another item.
          </li>
          <li>
            Item bought on Clearance Sale can’t be exchanged with another item.
          </li>
          <li>Item can be exchanged through the Dispatch process.</li>
          <li>
            Customer needs to return the merchandise via traceable delivery i.e.
            courier or registered post at their own expense to our address.
          </li>
          <li>
            Refund requests will be processed within 10 days after receiving the
            return products.
          </li>
          <li>
            All returns should be sent to: SUMAIRA TARIQ, Diamond Residency near
            Iqra University, Defence View, Karachi
          </li>
          <li>
            For further queries about exchanges and returns, please contact us
            at: 0322 2368356, info@sumairatariq.com (10 AM to 7 PM) - Monday to
            Saturday
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default page;
