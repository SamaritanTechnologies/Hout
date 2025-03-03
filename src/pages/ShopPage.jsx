import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import filter from "../assets/shopPage/filter.svg";
import ProductsSection from "../components/ShopComponents/ProductsSection";
import Filters from "../components/ShopComponents/Filters";
import QualitySection from "../components/Common/QualitySection";
import Switch from "../components/Common/Switch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ShopPage = () => {
  const navigate = useNavigate();
  const { productCategories } = useSelector((state) => state.admin);
  console.log(productCategories,"hhhhhhhh")
  // Define filter categories
  const categories = [
    "Group",
    "Type",
    "Material",
    "Profile",
    "Durability",
    "Quality",
    "Application",
  ];
  
  // Store categories from API
  const [categoryData, setCategoryData] = useState({});
  
  useEffect(() => {
    const initialData = categories.reduce((acc, category) => {
      const foundCategory = productCategories?.find(
        (c) => c.name?.toLowerCase() === category.toLowerCase()
      );
      acc[category] = foundCategory || { name: category, choices: [] };
      return acc;
    }, {});
    
    setCategoryData(initialData);
  }, [productCategories]);

  console.log(categoryData, "categoryData");

  const [state, setState] = useState({
    openfilter: true,
    selectedFilter: "",
  });

  const [filterDrawer, setFilterDrawer] = useState(false);

  const filterToggler = () => setFilterDrawer((prev) => !prev);
  const toggleFilterPanel = () =>
    setState((prev) => ({ ...prev, openfilter: !prev.openfilter }));

  const handleFilterCheck = (item) => {
    setState((prev) => ({
      ...prev,
      selectedFilter: item.checked ? item.filter : "",
    }));
  };

  return (
    <>
      <div className="shop">
        <section className="about flex justify-center items-center">
          <div className="w-[320px] m-auto text-center bg-transparentGray text-white py-[35px] rounded-lg">
            <div className="text-white text-48 font-medium">Shop</div>
            <div className="text-white flex items-center justify-center gap-x-3 pt-5">
              <div className="flex items-center gap-x-3 font-medium">
                <p className="cursor-pointer" onClick={() => navigate("/")}>
                  Home
                </p>
                <img src={rightArrow} alt="right arrow" />
              </div>
              <div className="font-light">Shop</div>
            </div>
          </div>
        </section>
      </div>

      <section className="flex justify-between sm:flex-col xs:flex-col items-center py-[36px] font-poppins bg-[#F4F5F7] xl:px-[80px] lg:px-[50px] md:px-[40px]">
        <div className="flex items-center gap-x-6 md:gap-x-5 xs:gap-x-4 font-footer1">
          <div
            className="flex lg:hidden xl:hidden items-center gap-3 cursor-pointer"
            onClick={filterToggler}
            role="button"
            aria-pressed={filterDrawer}
          >
            <img src={filter} className="md:size-5 xs:size-5 mb-[1px]" alt="filter icon" />
            <h4 className="prop text-xl sm:text-16 xs:text-14 xs:leading-[22px] font-footer1 text-[#111727]">
              Filter
            </h4>
          </div>
          <div className="pops md:text-14 sm:text-14 xs:text-12">
            Showing 1-16 of 32 results
          </div>
        </div>

        <section className="sm:pt-4 xs:pt-4">
          <div className="flex gap-x-6 md:gap-x-5 items-center font-footer1">
            <div className="pops md:text-14 sm:text-14 xs:text-12">Show Prices</div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">Incl. VAT</div>
            <div className="recPasswrd">
              <Switch optional />
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">Excl. VAT</div>
          </div>
        </section>
      </section>

      <section className="flex pb-[200px] md:flex-col sm:flex-col xs:flex-col">
        <div
          className={`${
            filterDrawer ? "open-filter-drawer" : ""
          } assortment-filters bg-white py-4 w-full shadow-xl max-w-[300px] transition-transform duration-300 ease-in-out`}
        >
          <div className="close-menu xl:hidden lg:hidden flex justify-end" onClick={filterToggler}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </div>
          <Filters categories={categoryData} filterCheck={handleFilterCheck} />
        </div>

        <ProductsSection />
      </section>

      <section>
        <QualitySection />
      </section>
    </>
  );
};
