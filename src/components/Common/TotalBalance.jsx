import React from "react";
import Button from "./Button";

const TotalBalance = ({ subtotal, deliveryFee, tax, total }) => {
  return (
    <>
      <section className="xl:pt-[50px] lg:pt-[30px] md:pt-[20px] pt-[8px]">
        <section className="bg-[#F8F8F8] xl:px-[32px] lg:px-[25px] md:px-[18px] px-[10px] xl:pt-[44px] lg:pt-[34px] md:pt-[20px] pt-[10px] rounded-lg">
          <section className="">
            <section className="flex justify-between">
              <div className="text-[#111727] xl:text-16 lg:text-15 text-14">
                Subtotal
              </div>
              <div className="text-[#111727]">€{subtotal.toFixed(2)}</div>
            </section>

            <section className="flex justify-between xl:pt-[25px] lg:pt-[20px] pt-[10px]">
              <div className="text-[#111727] xl:text-16 lg:text-15 text-14">
                Delivery Fee
              </div>
              <div className="text-[#111727]">€{deliveryFee.toFixed(2)}</div>
            </section>
            <section className="flex justify-between xl:pt-[25px] lg:pt-[20px] pt-[10px] border-b border-[#D9D9D9] pb-3">
              <div className="text-[#111727] xl:text-16 lg:text-15 text-14">
                Tax
              </div>
              <div className="text-[#111727]">€{tax.toFixed(2)}</div>
            </section>

            <section className="flex justify-between xl:pt-[25px] lg:pt-[20px] pt-[10px] pb-5">
              <div className="text-16 font-medium text-[#111727]">Total</div>
              <div className="text-yellow font-medium xl:text-18 lg:text-16 text-14">
                USD €{total.toFixed(2)}
              </div>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default TotalBalance;
