import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

function CollectionCard({ data }) {
  return (
    <Link href={`/product-design/${data?.id}?category=${data?.name}`}>
      <Card className="bg-white rounded-[4px] w-full overflow-hidden hover:opacity-90 hover:transition-opacity  ease-out duration-300   relative">
        <CardHeader>
          <Image
            src={
              data?.images[0]?.filename &&
              `https://api.sumairatariq.com/GetImage/${data?.images[0]?.filename}`
            }
            width={500}
            height={500}
            alt="Product Image"
            className="w-full md:h-[360px] h-80 bg-cover bg-center rounded-[2px]"
          />
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
