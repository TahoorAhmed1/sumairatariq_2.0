"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/common/heading";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { API } from "@/services";

const Category = ({ selectedCategories, setSelectedCategories }) => {
  const [showColors, setShowColors] = useState(false);
  const [category, setCategory] = useState([]);

  const getSize = async () => {
    try {
      const res = await API.getAllCategories();
      setCategory(res?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getSize();
  }, []);

  const toggleCategorySelection = (selectedCategory) => {
    const index = selectedCategories.indexOf(selectedCategory);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== selectedCategory)
      );
    }
  };

  return (
    <div>
      <div
        className=" cursor-pointer
                mb-2"
        onClick={() => setShowColors(!showColors)}
      >
        <div className=" flex justify-between items-center py-1 pr-2">
          <Heading
            title="By Category"
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
            {category.map((item) => (
              <motion.li
                key={item._id}
                className=" pb-2 flex items-center gap-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="checkbox"
                  className="text-xs w-4 h-4 rounded-[5px] text-gray-600 border-slate-800 border"
                  checked={selectedCategories?.includes(item.name)}
                  onChange={() => toggleCategorySelection(item.name)}
                />
                {item.name}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Category;
