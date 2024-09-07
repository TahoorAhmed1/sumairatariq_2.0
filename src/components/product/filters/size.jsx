"use client";

import Heading from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { API } from "@/services";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Size = ({ setSelectedSizes, selectedSizes }) => {
  const [size, setSize] = useState([]);
  const [showColors, setShowColors] = useState(false);
  const getSize = async () => {
    try {
      const res = await API.getSize();
      setSize(res?.data?.data);
    } catch (error) {}
  };

  const toggleSizeSelection = (selectedSize) => {
    const index = selectedSizes.indexOf(selectedSize);
    if (index === -1) {
      setSelectedSizes([...selectedSizes, selectedSize]);
    } else {
      setSelectedSizes(selectedSizes.filter((size) => size !== selectedSize));
    }
  };

  useEffect(() => {
    getSize();
  }, []);

  return (
    <div className="cursor-pointer">
      <div
        className=" cursor-pointer 
                mb-2"
        onClick={() => setShowColors(!showColors)}
      >
        <div className=" flex justify-between items-center py-1 pr-2">
          <Heading
            title="By Size"
            newClass={"text-start text-[16px] font-semibold  text-slate-800 "}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {showColors ? (
              <ArrowDown width={15} height={15} />
            ) : (
              <ArrowUp width={15} height={15} />
            )}
          </motion.div>
        </div>
      </div>
      <Separator className="bg-slate-200 "></Separator>

      {showColors && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ul className="flex flex-col gap-2 text-[14.5px] lg:text-[15px] text-black">
            {size.map((item) => (
              <motion.li
                key={item._id}
                className=" pb-2 flex items-center gap-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="checkbox"
                  className="text-xs w-4 h-4 rounded-[5px] text-gray-600"
                  checked={selectedSizes?.includes(item.size)}
                  onChange={() => toggleSizeSelection(item.size)}
                />
                {item?.size}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Size;
