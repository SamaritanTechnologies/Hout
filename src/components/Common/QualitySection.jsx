import React from "react";
import { useTranslation } from "react-i18next";

import cup from "../../assets/shopPage/cup.svg";
import guarantee from "../../assets/shopPage/guarantee.svg";
import shipping from "../../assets/shopPage/shipping.svg";
import supports from "../../assets/shopPage/supports.svg";

const QualitySection = () => {
  const { t } = useTranslation();
  
  const data = [
    { image: cup, head: t("qs_stock"), subHead: t("qs_stock_sub") },
    {
      image: guarantee,
      head: t("qs_prices"),
      subHead: t("qs_prices_sub"),
    },

    {
      image: shipping,
      head: t("qs_delivery"),
      subHead: t("qs_delivery_sub"),
    },

    {
      image: supports,
      head: t("qs_custom"),
      subHead: t("qs_custom_sub"),
    },
  ];
  return (
    <section className="bg-[#111727] flex flex-wrap justify-center items-center px-[50px] gap-[50px] md:gap-[50px] lg:gap-[40px] xl:gap-[60px] g pt-[100px] pb-[130px]">
      {data.map((item, index) => {
        return (
          <div key={index} className="flex gap-x-3">
            <div>
              {" "}
              <img src={item.image} />{" "}
            </div>
            <div className="flex-col">
              <div className="text-primary pops ">{item.head}</div>
              {item.subHead && <div className="text-primary pops ">{item.subHead}</div>}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default QualitySection;
