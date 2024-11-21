import React from "react";

import cup from "../../assets/shopPage/cup.svg";
import guarantee from "../../assets/shopPage/guarantee.svg";
import shipping from "../../assets/shopPage/shipping.svg";
import supports from "../../assets/shopPage/supports.svg";
const QualitySection = () => {
  const data = [
    { image: cup, head: "High Quality", subHead: "crafted from top materials" },
    {
      image: guarantee,
      head: "High Quality",
      subHead: "crafted from top materials",
    },

    {
      image: shipping,
      head: "High Quality",
      subHead: "crafted from top materials",
    },

    {
      image: supports,
      head: "High Quality",
      subHead: "crafted from top materials",
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
              {" "}
              <div className="text-primary">{item.head}</div>
              <div className="text-primary">{item.subHead}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default QualitySection;
