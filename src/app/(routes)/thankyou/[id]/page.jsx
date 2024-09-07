import ThankYou from "@/components/thankyou/thank-you";
import { API } from "@/services";
import React from "react";

async function page({ params: id }) {
  try {
    let res = await API.getSaleInfo(id?.id);
    let data = res.data[0];
    return <ThankYou data={data} />;
  } catch (error) {}
}

export default page;
