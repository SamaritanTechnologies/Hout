import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import filter from "../assets/shopPage/filter.svg";
import ProductsList from "../components/ShopComponents/ProductsList";
import Filters from "../components/ShopComponents/Filters";
import QualitySection from "../components/Common/QualitySection";
import Switch from "../components/Common/Switch";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../components/Common/Pagination";
import {
  PRODUCT_MAX_PRICE,
  PRODUCT_MIN_PRICE,
  PRODUCT_PAGE_SIZE,
} from "../utils/const";
import { useTranslation } from "react-i18next";

export const ShopPage = () => {
  const { t } = useTranslation();
  const [filterKey, setFilterKey] = useState(0);
  const { productCategories } = useSelector((state) => state.admin);

  const categories = [
    t("s_group"),
    t("s_type"),
    t("s_material"),
    t("s_profile"),
    t("s_durability"),
    t("s_quality"),
    t("s_application"),
  ];
  const [categoryData, setCategoryData] = useState({});
  const [includeVAT, setIncludeVAT] = useState(false);
  const [filters, setFilters] = useState({
    selectedFilters: {},
    price: [PRODUCT_MIN_PRICE, PRODUCT_MAX_PRICE],
    includeVAT: false,
  });
  const debounceTimer = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = PRODUCT_PAGE_SIZE;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const translatedCategories = [
      t("s_group"),
      t("s_type"),
      t("s_material"),
      t("s_profile"),
      t("s_durability"),
      t("s_quality"),
      t("s_application"),
    ];
    const initialData = translatedCategories.reduce((acc, category) => {
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

  const handleFilterChange = useCallback((newFilters) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        selectedFilters: newFilters.selectedFilters,
        price: newFilters.price,
      }));
      setCurrentPage(0);
    }, 300); // Wait 300ms after user stops moving
  }, []);

  const initialFiltersMemo = useMemo(
    () => ({
      selectedFilters: filters.selectedFilters,
      price: filters.price,
    }),
    [filters.selectedFilters, filters.price]
  );

  const handleVATToggle = () => {
    setIncludeVAT((prev) => !prev);
    setFilters((prev) => ({ ...prev, includeVAT: !prev.includeVAT }));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      selectedFilters: {},
      price: [PRODUCT_MIN_PRICE, PRODUCT_MAX_PRICE],
      includeVAT: false,
    };
    setFilters(resetFilters);
    setIncludeVAT(false);
    setCurrentPage(0);
    setFilterKey((prev) => prev + 1);
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
            <img
              src={filter}
              className="md:size-5 xs:size-5 mb-[1px]"
              alt="filter icon"
            />
            <h4 className="prop text-xl sm:text-16 xs:text-14 xs:leading-[22px] font-footer1 text-[#111727]">
              Filter
            </h4>
          </div>
          <button
            onClick={handleResetFilters}
            className="p-2 rounded-lg text-white bg-[#FBD232]"
          >
            {t("s_reset_filter_button")}
          </button>
          <div className="pops md:text-14 sm:text-14 xs:text-12">
            {t("s_showing_results_text", {
              start: currentPage * pageSize + 1,
              end: Math.min((currentPage + 1) * pageSize, totalItems),
              total: totalItems,
            })}
          </div>
        </div>

        <div className="sm:pt-4 xs:pt-4">
          <div className="flex gap-x-6 md:gap-x-5 items-center font-footer1">
            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("s_show_prices")}
            </div>

            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("s_excl_vat")}
            </div>

            <div className="recPasswrd">
              <Switch
                optional
                checked={includeVAT}
                onChange={handleVATToggle}
              />
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("s_incl_vat")}
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-start pb-[200px] md:flex-col sm:flex-col xs:flex-col">
        <div
          className={`${
            filterDrawer ? "open-filter-drawer" : ""
          } assortment-filters bg-white py-4 w-full shadow-xl max-w-[300px] transition-transform duration-300 ease-in-out`}
        >
          <div
            className="close-menu xl:hidden lg:hidden flex justify-end"
            onClick={filterToggler}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </div>
          <Filters
            key={filterKey}
            categories={categoryArray}
            onFilterChange={handleFilterChange}
            initialFilters={initialFiltersMemo}
          />
        </div>
        <div className="flex flex-col w-full gap-10">
          <ProductsList
            filters={filters}
            currentPage={currentPage}
            pageSize={pageSize}
            setTotalItems={setTotalItems}
            includeVAT={includeVAT}
          />

          {totalItems > pageSize && (
            <Pagination
              pageCount={Math.ceil(totalItems / pageSize)}
              onPageChange={handlePageChange}
              forcePage={currentPage}
            />
          )}
        </div>
      </section>
      <QualitySection />
    </>
  );
};
