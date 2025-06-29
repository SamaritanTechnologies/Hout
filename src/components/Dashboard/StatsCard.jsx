import React from "react";
import trendUp from "../../assets/DashboardImages/trendUp.svg";
import trendDown from "../../assets/DashboardImages/trendDown.svg";

const StatsCard = ({ name, image, stats }) => {
  return (
    <div className="  inventCard xl:p-[21px] lg:p-[16px] p-[10px] rounded-lg bg-[#fff]">
      <div className="flex justify-between items-center xl:mb-[50px] lg:mb-[35px] mb-[20px] md:flex-col-reverse">
        <div>
          <h6 className="xl:text-20 lg:text-18 md:text-16 font-semibold text-gray3 opacity-[0.7] xl:mb-[25px] lg:mb-[20px] mb-[15px]">
            {name}
          </h6>
          <h5 className="xl:text-36 lg:text-32 text-28 font-bold">
            {stats?.value || 0}
          </h5>
        </div>
        <div className="md:mb-[7px]">
          <img
            src={image}
            alt=""
            className="xl:w-[79px] lg:w-[70px] w-[60px]"
          />
        </div>
      </div>
      {stats?.percentage_change !== undefined &&
      stats?.percentage_change !== null ? (
        <div className="flex items-center xl:gap-[10px] gap-[3px]">
          <img
            src={stats?.trend === "up" ? trendUp : trendDown}
            alt={stats?.trend}
          />
          <p className="text-xl font-semibold text-[#606060]">
            <span
              className={
                stats?.percentage_change < 0
                  ? "text-[#FF4B4B]"
                  : "text-[#00B69B]"
              }
            >
              {stats?.percentage_change}% {stats?.trend}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default StatsCard;
