"use client";

function ThankYou({ data }) {
  return (
    <div className=" container mt-14 mb-20 ">
      <h1 className=" border-2 border-dashed border-green-500 p-5 font-normal text-green-500 text-3xl w-full text-center">
        Thank you your order has been received
      </h1>
      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 max-w-[1000px] mx-auto my-10  text-sm ">
          <div className="flex flex-col gap-2 text-center border-r">
            <p>Order Number</p>
            <p className="font-semibold">{data?.orderNo}</p>
          </div>
          <div className="flex flex-col gap-2 text-center border-r">
            <p>Date</p>
            <p className="font-semibold">
              {new Date(data?.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center border-r">
            <p>Total</p>
            <p className="font-semibold">{data?.total}</p>
          </div>

          <div className="flex flex-col gap-2 text-center">
            <p>Payment method</p>
            <p className="font-semibold">Cash On delivery</p>
          </div>
        </div>
      </div>
      <p className="text-sm">
        Pay With cash upon delivery we have Tracks for NationalWide delivery
      </p>
      <div className="my-8">
        <h2 className="text-xl mb-5 font-semibold">ORDER DETAILS</h2>
        <div>
          <div className="bg-white  rounded-[5px]">
            <div className="flex justify-between items-center text-lg border-b pb-3 font-bold">
              <p>Product</p>
              <p>Total</p>
            </div>
            <div className="flex justify-between items-center text-sm text-black border-b py-4">
              <p>Total</p>
              <p className="text-slate-600 ">
                <span>Rs</span> {data?.total}
              </p>
            </div>
            <div className="flex justify-between items-center text-sm  text-black border-b py-4">
              <p>Shipping Charges</p>
              <p className="text-slate-600">
                <span>Rs</span> 0
              </p>
            </div>
            <div className="flex justify-between items-center text-sm  text-black border-b py-4">
              <p>Shipping Charges</p>
              <p className="text-slate-600">
                <span>Rs</span> 0
              </p>
            </div>

            <div className="flex justify-between items-center text-lg  font-semibold text-black pt-4">
              <p>Total</p>
              <p className="text-[#DD3333]">
                <span>Rs</span> {data?.total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
