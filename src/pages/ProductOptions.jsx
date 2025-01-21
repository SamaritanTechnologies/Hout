import React, { useState } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import TableBody from "../components/Common/TableBody";


export const ProductOptions = () => {


  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">Products</h5>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-14 overflow-x-auto pl-[54px]">
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                  Groep
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                  Group
                </th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Soort
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Type
                </th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Materiaal
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Material
                </th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Profiel
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Profiel
                </th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Duurzaamheidsklasse
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Durability
                </th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Kwaliteit
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Quality
                </th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
        <div className="inline-block min-w-full rounded-lg overflow-hidden ">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                Toepassing
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl">
                Application
                </th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
      </div>
    </div>
  );
};
