import React from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import Select from "react-select";

const productOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

export const HomepageProducts = () => {
  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
          Homepage Products
        </h5>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto pl-[54px]">
        <div className="flex gap-[20px] mb-[24px]">
          <div className="w-full">
            <div className="flex gap-[30px] flex-wrap my-10">
              <div className="w-full md:mb-0">
                <label htmlFor="product1" className="text-sm">
                  Product 1
                </label>
                <Select
                  id="product1"
                  options={productOptions}
                  isSearchable
                  placeholder="Product 1"
                />
              </div>
              <div className="w-full">
                <label htmlFor="product2" className="text-sm">
                  Product 2
                </label>
                <Select
                  id="product2"
                  options={productOptions}
                  isSearchable
                  placeholder="Product 2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="product3" className="text-sm">
                  Product 3
                </label>
                <Select
                  id="product3"
                  options={productOptions}
                  isSearchable
                  placeholder="Product 3"
                />
              </div>
              <div className="w-full">
                <label htmlFor="product4" className="text-sm">
                  Product 4
                </label>
                <Select
                  id="product4"
                  options={productOptions}
                  isSearchable
                  placeholder="Product 4"
                />
              </div>
              <div className="w-full">
                <label htmlFor="product4" className="text-sm">
                  Product 5
                </label>
                <Select
                  id="product5"
                  options={productOptions}
                  isSearchable
                  placeholder="Product 5"
                />
              </div>
              <div className="w-full">
                <label htmlFor="product4" className="text-sm">
                  Product 6
                </label>
                <Select
                  id="product6"
                  options={productOptions}
                  isSearchable
                  placeholder="Product 6"
                />
              </div>
            </div>
            <Button
              loading={false}
              type="submit"
              btnText="Save"
              paddingX="20px"
              textColor="#000000"
              breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

