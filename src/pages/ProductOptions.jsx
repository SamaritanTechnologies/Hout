import React from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import { ProductCategoryItem } from "../components/Dashboard/ProductCategoryItem";
import { Category } from "@mui/icons-material";

export const ProductOptions = () => {
  const categories = [
    "Group",
    "Type",
    "Material",
    "Profile",
    "Durability Class",
    "Quality",
    "Application",
  ];
  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">Products</h5>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-14 overflow-x-auto pl-[54px]">
        {categories.map((category, index) => (
          <ProductCategoryItem key={index} name={category} />
        ))}
      </div>
    </div>
  );
};
