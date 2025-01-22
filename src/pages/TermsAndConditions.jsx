import React from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import RichTextEditor from "../components/Common/RichTextEditor";

export const TermsAndConditions = () => {
  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center mb-6">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
        Terms and Conditions
        </h5>
      </div>
      <div className="flex gap-8 pl-[54px] w-full">
        <div className="w-1/2">
          <RichTextEditor
            label="Algemene Voorwaarden"
          />
        </div>
        <div className="w-1/2">
          <RichTextEditor
            label="Terms and Conditions"
          />
        </div>
      </div>

      <Button
        loading={false}
        type="submit"
        btnText="Save"
        paddingX="20px"
        textColor="#000000"
        breakpoint="xl:w-[354px] lg:w-[280px] w-[240px] ml-[54px] mt-[100px]"
      />
    </div>
  );
};