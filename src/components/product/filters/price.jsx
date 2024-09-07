"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/common/heading";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Price = ({ selectedPrices, setSelectedPrices }) => {
  const [showColors, setShowColors] = useState(false);
  const priceList = [
    { priceOne: 500, priceTwo: 1000 },
    { priceOne: 1000, priceTwo: 3000 },
    { priceOne: 3000, priceTwo: 6000 },
    { priceOne: 6000, priceTwo: 8000 },
    { priceOne: 8000, priceTwo: 10000 },
    { priceOne: 10000, priceTwo: 12000 },
    { priceOne: 14000, priceTwo: 16000 },
    { priceOne: 16000, priceTwo: 18000 },
  ];

  const togglePriceSelection = (priceRange) => {
    const isSelected = selectedPrices?.some(
      (selectedPrice) =>
        selectedPrice?.priceOne === priceRange?.priceOne &&
        selectedPrice?.priceTwo === priceRange?.priceTwo
    );

    if (isSelected) {
      setSelectedPrices(
        selectedPrices?.filter(
          (selectedPrice) =>
            selectedPrice?.priceOne !== priceRange?.priceOne ||
            selectedPrice?.priceTwo !== priceRange?.priceTwo
        )
      );
    } else {
      setSelectedPrices([...selectedPrices, priceRange]);
    }
  };

  return (
    <div className="cursor-pointer">
      <div className="mb-2" onClick={() => setShowColors(!showColors)}>
        <div className="flex justify-between items-center py-1 pr-2">
          <Heading
            title="By Price"
            newClass="text-start text-[16px] font-semibold text-slate-800"
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
      <Separator className="bg-slate-200" />
      {showColors && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ul className="flex flex-col gap-2 text-[14.5px] lg:text-[15px] text-black">
            {priceList.map((item, index) => (
              <motion.li
                key={index}
                className="pb-2 flex items-center gap-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="checkbox"
                  className="text-xs w-4 h-4 rounded-[4px] text-gray-600"
                  checked={selectedPrices?.some(
                    (selectedPrice) =>
                      selectedPrice?.priceOne === item?.priceOne &&
                      selectedPrice?.priceTwo === item?.priceTwo
                  )}
                  onChange={() => togglePriceSelection(item)}
                />
                {item.priceOne.toFixed(2)} - {item.priceTwo.toFixed(2)}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Price;
