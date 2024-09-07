import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import newArrivalImage from "./../../assets/home/newArrivalImage.jpeg";

function CollectionCard({ data }) {
  return (
    <Link href={`/product-design/${data?.id}?category=${data?.name}`}>
      <Card className="bg-white rounded-[4px] w-full overflow-hidden hover:opacity-90 hover:transition-opacity  ease-out duration-300   relative">
        <CardHeader>
          {data?.images[1]?.filename && (
            <Image
              src={
                data?.name === "New Arrivals"
                  ? newArrivalImage
                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${
                      data?.images[data?.images?.length - 1]?.filename
                    }`
              }
              width={640}
              height={853}
              loading={"eager"}
              alt="Product Image"
              className="w-full md:h-[360px] h-80 bg-cover bg-center rounded-[2px]"
              priority
            />
          )}
        </CardHeader>
        <CardContent className="py-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-0 flex flex-col justify-center items-center">
          <Button className=" px-4 text-base py-1.5 bg-white/40 hover:bg-white/70 border-slate-400 rounded-[4px] font-semibold ">
            {data?.name}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CollectionCard;
