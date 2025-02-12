import React, { useEffect, useState } from "react";
import { ProductCategoryItem } from "../components/Dashboard/ProductCategoryItem";
import Button from "../components/Common/Button";
import { useSelector } from "react-redux";
import { updateCategories } from "../redux/actions/dashboardActions";
import {
  getProductCategories,
  getProductStaticValuesByName,
} from "../redux/actions/productActions";
import { setProductCategories } from "../redux";
import { toast } from "react-toastify";

export const ProductOptions = () => {
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
    <form onSubmit={handleUpdate}>
      <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
        <div className="flex justify-end pr-3">
          <Button loading={isSubmitting} type="submit" btnText="Update" />
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-14 overflow-x-auto pl-[54px]">
          {categories.map((category) => (
            <ProductCategoryItem
              key={category}
              name={category}
              loading={isSubmitting}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
            />
          ))}
        </div>
      </div>
    </form>
  );
};
