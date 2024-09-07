import Design from "@/components/product/designe";

function page({ params, searchParams }) {
  let { category, subcategory, tags, color, minPrice, maxPrice } = searchParams;
  return (
    <Design
      id={params?.id}
      category={category || ""}
      subcategory={subcategory || ""}
      tags={tags || ""}
      color={color || ""}
      minPrice={minPrice || ""}
      maxPrice={maxPrice || ""}
    />
  );
}

export default page;
