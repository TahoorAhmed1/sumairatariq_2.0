import ProductDetail from "@/components/product/product-detail";
import { API } from "@/services";
import { redirect } from "next/navigation";

async function page({ params: id }) {
  try {
    let res = await API.GetProductInfo(id.id);
    return <ProductDetail data={res?.data} />;
  } catch (error) {
    return redirect("/");
  }
}

export default page;
