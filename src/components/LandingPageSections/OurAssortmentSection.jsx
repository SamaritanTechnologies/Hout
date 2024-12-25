import React from "react";
import oak from "../../assets/LandingPageImages/assortment/oak.svg";
import thermo from "../../assets/LandingPageImages/assortment/thermo.svg";
import fire from "../../assets/LandingPageImages/assortment/fire.svg";
import hardWood from "../../assets/LandingPageImages/assortment/hardWood.svg";
import beacon from "../../assets/LandingPageImages/assortment/beacon.svg";
import mahogany from "../../assets/LandingPageImages/assortment/mahogany.svg";
import brazil from "../../assets/LandingPageImages/assortment/brazil.svg";
import iron from "../../assets/LandingPageImages/assortment/iron.svg";
import parasols from "../../assets/LandingPageImages/assortment/parasols.svg";

const OurAssortmentSection = () => {
  const WoodData = [
    {
      image: oak,
      heading: "OAK",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: thermo,
      heading: "THERMO HOUT",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: fire,
      heading: "FIRE",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: hardWood,
      heading: "HARDWOOD",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: beacon,
      heading: "BEACON",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: mahogany,
      heading: "MAHOGANY",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: brazil,
      heading: "BRAZILAIN NUTS",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: iron,
      heading: "IRON STORE",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
    {
      image: parasols,
      heading: "IRON STORE",
      text: "Our Oak wood, with its remarkable strength and beauty, provides a timeless basis for every creation.",
    },
  ];

  return (
    <section className="bg-[#000000] pb-[60px] " id="assortments-section">
      <div className="text-30 md:text-40 lg:text-50 xl:text-56 font-bold text-[#fff] pt-[40px] md:pt-[90px] lg:pt-[119px] xl:pt-[119px]  text-center ">
        {" "}
        Our assortment
      </div>
      <div className="  text-[#fff] text-center pt-3 md:pt-5 lg:pt-7 xl:pt-7 text-18 ">
        {" "}
        Discover the world of wood through our extensive range.{" "}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px]s gap-x-6 pt-[30px] md:pt-[70px] lg:pt-[88px] xl:pt-[88px] max-w-[1240px] mx-auto">
        {WoodData.map((item, index) => {
          return (
            <div key={index} className="flex-col">
              <div>
                <img
                  src={item.image}
                  className="w-full object-cover max-w-[100%] h-full sm:h-[310px] lg:h-[350px] xl:h-[350px]"
                />
              </div>
              <div className="text-[#fff] text-center font-bold text-18 md:text-20 lg:text-24 xl:text-24 pt-[20px] ">
                {" "}
                {item.heading}
              </div>
              <div className="text-[#fff] text-center text-16 md:text-18 lg:text-18 xl:text-18  pb-[40px] md:pb-[40px] lg:pb-[70px] xl:pb-[70px] pt-[20px] ">
                {item.text}
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default OurAssortmentSection;
