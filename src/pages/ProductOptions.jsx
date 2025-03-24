import React, { useEffect, useState } from "react";
import { ProductCategoryItem } from "../components/Dashboard/ProductCategoryItem";
import Button from "../components/Common/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCategories } from "../redux/actions/dashboardActions";
import {
  getProductCategories,
  getProductStaticValuesByName,
} from "../redux/actions/productActions";
import { setProductCategories } from "../redux";
import { toast } from "react-toastify";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const ProductOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = [
    "Group",
    "Type",
    "Material",
    "Profile",
    "Durability",
    "Quality",
    "Application",
  ];

  const { productCategories } = useSelector((state) => state.admin);
  const [categoryData, setCategoryData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize categoryData from Redux state
  useEffect(() => {
    const initialData = categories?.reduce((acc, category) => {
      const foundCategory = productCategories?.find(
        (c) => c.name?.toLowerCase() === category.toLowerCase()
      );
      acc[category] = foundCategory || { name: category, choices: [] };
      return acc;
    }, {});
    setCategoryData(initialData);
  }, [productCategories]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    // Convert categoryData object into an array of objects
    const formattedCategories = Object.values(categoryData);
    try {
      await updateCategories(formattedCategories);
      fetchCategories();
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // fetch dynamic categories
      const dynamicCategories = await getProductCategories();

      // fetch unqiue values for thickness, width, and weight from all products list
      const staticValuesPromises = [
        getProductStaticValuesByName("thickness"),
        getProductStaticValuesByName("width"),
      ];
      // backend not sending weight unique values :) need to add from backend
      const [thicknessRes, widthRes] = await Promise.all(staticValuesPromises);

      // transform unqiue values into the same format as categories
      const transformUniqiueValues = (name, values) => ({
        id: Math.floor(Math.random() * 1000),
        name,
        choices: values?.map((value) => ({
          id: Number(value),
          category: name,
          name_en: value,
          name_nl: value,
        })),
      });

      const uniqueCategories = [
        transformUniqiueValues("thickness", thicknessRes.values),
        transformUniqiueValues("width", widthRes.values),
      ];

      // combine dynamic and unique static categories
      const combinedCategories = [...dynamicCategories, ...uniqueCategories];
      dispatch(setProductCategories(combinedCategories));
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error getting categories");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Product options
      </h2>
      <form onSubmit={handleUpdate} className="max-w-[848px] mx-auto">
        {categories.map((category) => (
          <ProductCategoryItem
            key={category}
            name={category}
            loading={isSubmitting}
            categoryData={categoryData}
            setCategoryData={setCategoryData}
          />
        ))}
        <Button
          loading={isSubmitting}
          type="submit"
          btnText="Update"
          textColor="#000000"
          breakpoint="w-full max-w-[280px]"
        />
      </form>
    </div>
  );
};
