import React from "react";
import frameImage from "../../assets/LandingPageImages/frameImage.svg";
import Rating from "../Common/Rating";

const TestimonialSection = () => {
  return (
    <>
      <section>
        <div className="text-16 md:text-18 lg:text-20 xl:text-20 font-semibold  pt-[30px] md:pt-[70px] lg:pt-[100px] xl:pt-[100px] text-center">
          {" "}
          Share your setup with
        </div>
        <div className="text-20 md:text-30 lg:text-40 xl:text-40 font-bold text-center"> #HOUT</div>
        <div>
          {" "}
          <img src={frameImage}  className="w-full"/>{" "}
        </div>

        <div className="pt-[30px] md:pt-[40px] lg:pt-[50px] xl:pt-[50px] pb-[50px] md:pb-[90px] lg:pb-[121px] xl:pb-[121px] px-[30px]">
          {" "}
          <Rating />{" "}
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
