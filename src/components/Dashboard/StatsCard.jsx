import React from "react";

const StatsCard = ({ name, amount, image }) => {
  return (
    <div className="  inventCard xl:p-[21px] lg:p-[16px] p-[10px] rounded-lg bg-[#fff]">
      <div className="flex justify-between items-center xl:mb-[50px] lg:mb-[35px] mb-[20px] md:flex-col-reverse">
        <div>
          <h6 className="xl:text-20 lg:text-18 md:text-16 font-semibold text-gray3 opacity-[0.7] xl:mb-[25px] lg:mb-[20px] mb-[15px]">
            {name}
          </h6>
          <h5 className="xl:text-36 lg:text-32 text-28 font-bold">{amount}</h5>
        </div>
        <div className="md:mb-[7px]">
          <img
            src={image}
            alt=""
            className="xl:w-[79px] lg:w-[70px] w-[60px]"
          />
        </div>
      </div>
      <div className="flex items-center xl:gap-[10px] gap-[3px]">
        {/* <img
          src={}
          alt=""
          className="xl:w-[32px] lg:w-[27px] w-[22px]"
        />{" "} */}
      </div>
    </div>
  );
};

export default StatsCard;
