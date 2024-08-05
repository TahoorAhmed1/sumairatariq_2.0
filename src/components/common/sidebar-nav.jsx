import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
function SidebarNav({ a, setOpen }) {
  const [showColors, setShowColors] = useState(false);

  return (
    <div className=" border-slate-200   ">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowColors(!showColors);
        }}
        className="flex items-center justify-between border-b text-black text-sm bg-slate-50 "
      >
        <button
          href={`/product-design/${a.id}?category=${a?.name}`}
          className="px-4"
        >
          {a.name}
        </button>
        <span
          className={`${
            showColors ? "transform rotate-180" : ""
          } transition-transform duration-200 ease-in-out px-4 py-4`}
        >
          <ArrowDown className="w-[14px] h-[14px]" />
        </span>
      </div>
      {showColors && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ul className="flex flex-col ">
            {a?.SubCategory?.map((b) => (
              <>
                <div
                  key={b?.id}
                  className="text-black hover:bg-slate-100/20   text-xs border-b py-2.5 px-4  "
                >
                  <Link
                    onClick={() => setOpen(true)}
                    href={`/product-design/${a.id}?category=${a?.name}&subcategory=${b?.name}`}
                  >
                    {b.name}
                  </Link>
                </div>
              </>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

export default SidebarNav;
