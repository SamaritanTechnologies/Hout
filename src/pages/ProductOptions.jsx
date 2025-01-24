import React, { useState } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import TableBody from "../components/Common/TableBody";
import countryflag from "../assets/DashboardImages/UK-Flag.svg"
import countryflag2 from "../assets/DashboardImages/USA-flag.svg"


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
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                  Groep
                  <img
                                  src={countryflag}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                  Group
                  <img
                                  src={countryflag2}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
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
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                Soort
                <img
                                  src={countryflag}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                Type
                <img
                                  src={countryflag2}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
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
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                Materiaal
                <img
                                  src={countryflag}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                Material
                <img
                                  src={countryflag2}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
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
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                Profiel
                <img
                                  src={countryflag}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                Profiel
                <img
                                  src={countryflag2}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
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
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                Duurzaamheidsklasse
                <img
                                  src={countryflag}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                Durability
                <img
                                  src={countryflag2}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
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
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                Kwaliteit
                <img
                                  src={countryflag}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                Quality
                <img
                                  src={countryflag2}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
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
                <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                Toepassing
                <img
                                  src={countryflag}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
                </th>
                <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                Application
                <img
                                  src={countryflag2}
                                  alt="Flag"
                                  className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                                />
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
