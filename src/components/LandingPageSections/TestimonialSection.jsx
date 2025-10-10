import React from "react";
import frameImage from "../../assets/LandingPageImages/frameImage.svg";
import Rating from "../Common/Rating";
import { useTranslation } from "react-i18next";

const TestimonialSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="py-12 xl:py-20 xxl:py-28">
        <div className="flex flex-col px-4 text-center gap-2">
          <p className="text-lg xl:text-xl font-semibold text-[#111727]">
            {t("t_share_setup_text")}
          </p>
          <h2 className="text-2xl xl:text-[40px] font-bold">
            {t("t_share_setup_heading")}
          </h2>
        </div>
        <img src={frameImage} className="w-full" />
        <Rating />
      </section>
    </>
  );
};

export default TestimonialSection;
