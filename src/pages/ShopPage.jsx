import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import filter from "../assets/shopPage/filter.svg";
import ProductsList from "../components/ShopComponents/ProductsList";
import Filters from "../components/ShopComponents/Filters";
import QualitySection from "../components/Common/QualitySection";
import Switch from "../components/Common/Switch";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const ShopPage = () => {
  const { productCategories } = useSelector((state) => state.admin);

  const categories = [
    "Group",
    "Type",
    "Material",
    "Profile",
    "Durability",
    "Quality",
    "Application",
  ];
  const [categoryData, setCategoryData] = useState({});
  const [includeVAT, setIncludeVAT] = useState(false);
  const [filters, setFilters] = useState({
    selectedFilters: {},
    price: [0, 1000],
    includeVAT: false,
  });

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

  const categoryArray = Object.values(categoryData);

  const [filterDrawer, setFilterDrawer] = useState(false);
  const filterToggler = () => setFilterDrawer((prev) => !prev);

  // Handle filter changes from the Filters component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleVATToggle = () => {
    setIncludeVAT((prev) => !prev);
    setFilters((prev) => ({ ...prev, includeVAT: !prev.includeVAT }));
  };

  return (
    <>
      <nav aria-label="breadcrumb" className="shop">
        <div className="about flex justify-center items-center">
          <div className="w-[320px] m-auto text-center bg-transparentGray text-white py-[35px] rounded-lg">
            <h1 className="text-white text-48 font-medium">Shop</h1>
            <ol className="flex items-center justify-center gap-x-3 pt-5 font-medium text-white">
              <li>
                <Link to="/" className="cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <img src={rightArrow} alt="right arrow" />
              </li>
              <li className="font-light">Shop</li>
            </ol>
          </div>
        </div>
      </nav>

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

        <div className="sm:pt-4 xs:pt-4">
          <div className="flex gap-x-6 md:gap-x-5 items-center font-footer1">
            <div className="pops md:text-14 sm:text-14 xs:text-12">Show Prices</div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">Incl. VAT</div>
            <div className="recPasswrd">
              <Switch optional checked={includeVAT} onChange={handleVATToggle} />
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">Excl. VAT</div>
          </div>
        </div>
      </section>

      <section className="flex items-start pb-[200px] md:flex-col sm:flex-col xs:flex-col">
        <div
          className={`${
            filterDrawer ? "open-filter-drawer" : ""
          } assortment-filters bg-white py-4 w-full shadow-xl max-w-[300px] transition-transform duration-300 ease-in-out`}
        >
          <div className="close-menu xl:hidden lg:hidden flex justify-end" onClick={filterToggler}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </div>
          <Filters categories={categoryArray} onFilterChange={handleFilterChange} />
        </div>

        <ProductsList filters={filters} />
      </section>

      <QualitySection />
    </>
  );
};