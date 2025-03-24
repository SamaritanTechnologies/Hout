import React from "react";
import frameImage from "../../assets/LandingPageImages/frameImage.svg";
import Rating from "../Common/Rating";

const TestimonialSection = () => {
  return (
    <>
      <section className="py-12 xl:py-20 xxl:py-28">
        <div className="flex flex-col px-4 text-center gap-2">
          <p className="text-lg xl:text-xl font-semibold text-[#111727]">
            Share your setup with
          </p>
          <h2 className="text-2xl xl:text-[40px] font-bold"> #HOUT</h2>
        </div>
        <img src={frameImage} className="w-full" /> 
        {/* <Rating /> */}
      </section>
    </>
  );
};

export default TestimonialSection;
