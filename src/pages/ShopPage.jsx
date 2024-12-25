import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import filter from "../assets/shopPage/filter.svg";
import gridView from "../assets/shopPage/gridView.svg";
import listView from "../assets/shopPage/listView.svg";
import ProductsSection from "../components/ShopComponents/ProductsSection";
import Filters from "../components/ShopComponents/Filters";
import cup from "../assets/shopPage/cup.svg";
import guarantee from "../assets/shopPage/guarantee.svg";
import shipping from "../assets/shopPage/shipping.svg";
import supports from "../assets/shopPage/supports.svg";
import QualitySection from "../components/Common/QualitySection";
import Switch from "../components/Common/Switch";
import { scrollToTop } from "../utils/helper";
import { useNavigate } from "react-router-dom";

export const ShopPage = () => {
  const [filters, setFilters] = useState([
    { id: 1, filter: "Oak", checked: false },
    { id: 2, filter: "Thermo Hout", checked: false },
    { id: 3, filter: "Fire", checked: false },
    { id: 3, filter: "HardWood", checked: false },
    { id: 3, filter: "Beacon", checked: false },
    { id: 3, filter: "Mahogany", checked: false },
    { id: 3, filter: "Brazilian Nuts", checked: false },
    { id: 3, filter: "Iron Store", checked: false },
    { id: 3, filter: "Parasols", checked: false },
  ]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    openfilter: true,
    filterTypes: [],
    selectedFilter: "",
  });
  const [filterDrawer, setFilterDrawer] = useState(false);
  const filterToggler = () => {
    setFilterDrawer((prev) => !prev);
  };
  const toggle = () => {
    setState((prev) => ({
      ...prev,
      openfilter: !state.openfilter,
    }));
  };

  const getTypes = (types) => {
    setState((prev) => ({
      ...prev,
      filterTypes: types,
    }));
  };

  const handleFilterCheck = (item) => {
    setState((prev) => ({
      ...prev,
      selectedFilter: item.checked === true ? item.filter : "",
    }));
  };

  return (
    <>
      <div className="shop ">
        <section className="about flex justify-center items-center ">
          <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
            <div className="text-white text-48 font-medium">Shop</div>
            <div className="text-white flex items-center justify-center gap-x-3 pt-5 ">
              <div className="flex items-center gap-x-3 font-medium">
                <p className="cursor-pointer" onClick={() => navigate("/")}>
                  Home
                </p>{" "}
                <img src={rightArrow} />
              </div>
              <div className="font-light">Shop</div>
            </div>
          </div>
        </section>
      </div>

      <section className="flex justify-between   sm:flex-col xs:flex-col   items-center py-[36px] font-poppins bg-[#F4F5F7] xl:px-[80px] lg:px-[50px] md:px-[40px]  ">
        <div>
          {" "}
          <div className="flex items-center gap-x-6 md:gap-x-5 xs:gap-x-4 font-footer1">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={filterToggler}
              role="button"
              aria-pressed={filterDrawer}
            >
              <img src={filter} className="md:size-5 xs:size-5 mb-[1px]" />
              <h4 className="prop text-xl sm:text-16 xs:text-14 xs:leading-[22px] font-footer1 text-[#111727]">
                {" "}
                Filter{" "}
              </h4>
            </div>
            <div>
              <img src={gridView} className="md:size-4  xs:size-3 " />
            </div>
            <div>
              <img src={listView} className="md:size-5 xs:size-3.5" />
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12  ">
              Showing 1-16 of 32 results
            </div>
          </div>
        </div>

        <section className=" sm:pt-4  xs:pt-4">
          <div className="flex gap-x-6  md:gap-x-5 items-center font-footer1">
            <div className="pops md:text-14  sm:text-14 xs:text-12  ">
              Show Prices
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12 ">
              Incl. VAT
            </div>
            <div className="recPasswrd ">
              {" "}
              <Switch optional />{" "}
            </div>

            <div className="pops md:text-14 sm:text-14 xs:text-12 ">
              Ecxl.VAT
            </div>
          </div>
        </section>
      </section>

      <section className="flex pb-[200px]  md:flex-col sm:flex-col  xs:flex-col">
        {filters && (
          <div
            className={`${
              filterDrawer ? "open-filter-drawer" : ""
            } assortment-filters bg-white py-4 w-full h-0 lg:min-h-[1015px] xl:min-h-[1015px] shadow-xl font-main lg:w-[22%] xl:w-[27.5%] transition-transform duration-300 ease-in-out`}
          >
            <div
              className="close-menu xl:hidden lg:hidden flex justify-end"
              onClick={filterToggler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <Filters filters={filters} filterCheck={handleFilterCheck} />
          </div>
        )}

        <div className="w-[100%] pt-[75px] xl:px-[100px] lg:px-[60px]  md:px-[40px]  sm:px-[40px]  xs:px-[40px]   ">
          {" "}
          <ProductsSection
            isthree
            isbuttonReqird
            notRequired
            passTypes={getTypes}
            selectedFilter={state.selectedFilter}
          />
        </div>
      </section>

      <section>
        <QualitySection />
      </section>
    </>
  );
};
