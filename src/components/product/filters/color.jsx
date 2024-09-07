"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/common/heading";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Color = ({ selectedColors, setSelectedColors }) => {
  const [showColors, setShowColors] = useState(false);

  const data = [
    "Yellow",
    "Blue",
    "Black",
    "Red",
    "Green",
    "White",
    "Beige",
    "Grey",
    "Brown",
    "Pink",
    "Purple",
    "Maroon",
    "Orange",
    "Off white",
  ];

  const toggleColorSelection = (color) => {
    const isSelected = selectedColors?.includes(color);

    if (isSelected) {
      setSelectedColors(
        selectedColors.filter((selectedColor) => selectedColor !== color)
      );
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div className="cursor-pointer">
      <div className="mb-2" onClick={() => setShowColors(!showColors)}>
        <div className="flex justify-between items-center py-1 pr-2">
          <Heading
            title="By Color"
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
            {data.map((color, index) => (
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
                  checked={selectedColors?.includes(color)}
                  onChange={() => toggleColorSelection(color)}
                />
                <span
                  style={{ background: color }}
                  className={`w-4 h-4 rounded-full border border-slate-300`}
                ></span>
                {color}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
