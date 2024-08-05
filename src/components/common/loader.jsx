import { logo } from "@/assets";
import Image from "next/image";

function Loader() {
  return (
    <div className="box gap-8 ">
      <Image
        alt="root"
        src={logo}
        className="w-[210px] mx-auto"
        width={1000}
        height={1000}
        loading="eager"
        priority
      />
      <span className="loader-37"></span>
    </div>
  );
}

export default Loader;
