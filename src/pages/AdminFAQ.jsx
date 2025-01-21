import React, { useState } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import TableBody2 from "../components/Common/TableBody2";


export const AdminFAQ = () => {


  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">Product options</h5>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-14 overflow-x-auto pl-[54px]">
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
        <Button
              loading={false}
              type="submit"
              btnText="Remove Group"
              paddingX="20px"
              textColor="#000000"
              breakpoint="w-auto text-[12px] ml-auto mr-[4%] mb-[15px]"
            />
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Main Subject
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold">
                Subtitle
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Description
                </th>
              </tr>
            </thead>
            <TableBody2 />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
        <Button
              loading={false}
              type="submit"
              btnText="Remove Group"
              paddingX="20px"
              textColor="#000000"
              breakpoint="w-auto text-[12px] ml-auto mr-[4%] mb-[15px]"
            />
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Main Subject
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold">
                Subtitle
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Description
                </th>
              </tr>
            </thead>
            <TableBody2 />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
        <Button
              loading={false}
              type="submit"
              btnText="Remove Group"
              paddingX="20px"
              textColor="#000000"
              breakpoint="w-auto text-[12px] ml-auto mr-[4%] mb-[15px]"
            />
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Main Subject
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold">
                Subtitle
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Description
                </th>
              </tr>
            </thead>
            <TableBody2 />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
        <Button
              loading={false}
              type="submit"
              btnText="Remove Group"
              paddingX="20px"
              textColor="#000000"
              breakpoint="w-auto text-[12px] ml-auto mr-[4%] mb-[15px]"
            />
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Main Subject
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold">
                Subtitle
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Description
                </th>
              </tr>
            </thead>
            <TableBody2 />
          </table>
        </div>
      </div>
      <Button
              loading={false}
              type="submit"
              btnText="Add Main Subject"
              paddingX="20px"
              textColor="#000000"
              breakpoint="w-auto text-[12px] ml-[40px]"
            />
    </div>
  );
};
