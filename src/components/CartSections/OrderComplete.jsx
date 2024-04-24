import React from "react";
import smallVideo from "../../assets/addToCart/smallVideo.svg";
import Button from "../Common/Button";

const OrderComplete = () => {
  return (
    <>
      <section className="xl:mx-[351px] lg:mx-[280px] md:mx-[210px] mx-[160px]  shadow-2xl xl:mb-[130px] lg:mb-[100px]  mb-[100px]">
        <div className="xl:px-[95px] lg:px-[50px] md:px-[30px] px-[15px]">
          <div className="xl:pt-[80px] lg:pt-[60px] md:pt-[30px] pt-[20px] text-center xl:text-28 lg:text-26 md:text-24 text-22 text-[#6C7275] ">
            Thank you!
          </div>
          <div className="xl:text-40 lg:text-36 md:text-32 text-24 font-medium  text-center pt-4">
            Your order has been received
          </div>
          <div className="xl:pt-[40px] lg:pt-[30px] pt-[10px] flex justify-center">
            <img src={smallVideo} />{" "}
          </div>

          <div className="flex justify-between xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5 ">
            <div className="text-[#6C7275] text-14 font-semibold">
              Order code:
            </div>
            <div className="text-14 font-semibold">#0123_45678</div>
          </div>
          <div className="flex justify-between  xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">Date:</div>
            <div className="text-14 font-semibold">October 19, 2023</div>
          </div>
          <div className="flex justify-between  xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">Total:</div>
            <div className="text-14 font-semibold">$1,345.00</div>
          </div>
          <div className="flex justify-between xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px]  items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">
              Payment method:
            </div>
            <div className="text-14 font-semibold">Credit Card</div>
          </div>
          <div className="flex justify-between  xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px]  items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">
              Estimated Delivery Time:
            </div>
            <div className="text-14 font-semibold">5 days</div>
          </div>

          <div className="pt-[20px] flex justify-center pb-[80px]">
            <Button btnText="Back to Home " breakpoint="w-[323px]" />
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderComplete;
