import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
import inventory from "../assets/DashboardImages/inventory.svg";
import skuImg from "../assets/DashboardImages/skuImg.svg";
import salesImg from "../assets/DashboardImages/salesImg.svg";
import trendUp from "../assets/DashboardImages/trendUp.svg";
import trendDown from "../assets/DashboardImages/trendDown.svg";
import sampleProductImg from "../assets/DashboardImages/sampleProductImg.svg";
import DropDown from "../components/Common/DropDown";
import { toast } from "react-toastify";
import { getOrderDetails } from "../redux/actions/orderActions";
import Button from "../components/Common/Button";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getStats } from "../redux/actions/dashboardActions";
import StatsCard from "../components/Dashboard/StatsCard";

const months = [
  { value: 1, name: "JANUARY" },
  { value: 2, name: "FEBRUARY" },
  { value: 3, name: "MARCH" },
  { value: 4, name: "APRIL" },
  { value: 5, name: "MAY" },
  { value: 6, name: "JUNE" },
  { value: 7, name: "JULY" },
  { value: 8, name: "AUGUST" },
  { value: 9, name: "SEPTEMBER" },
  { value: 10, name: "OCTOBER" },
  { value: 11, name: "NOVEMBER" },
  { value: 12, name: "DECEMBER" },
];

export const Dashboard = () => {
  const [state, setState] = useState({
    orderList: [],
    stats: null,
    selectedMonth: null,
  });

  const fetchOrderslist = async (month) => {
    try {
      const res = await getOrderDetails(month);
      setState((prev) => ({
        ...prev,
        orderList: res,
      }));
      console.log(res, "fetchUser44334");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await getStats();
      setState((prev) => ({
        ...prev,
        stats: res,
      }));
      console.log(res, "fetchUser44334");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      selectedMonth: e.target.value,
    }));
  };

  useEffect(() => {
    fetchOrderslist(state?.selectedMonth);
  }, [state?.selectedMonth]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="xl:p-[30px] lg:p-[24px] p-[20px] bg-[#fafafa] h-full min-h-[86vh]">
        <h1 className="xl:text-32 lg:text-28 text-26 font-bold xl:mb-[39px] lg:mb-[30px] mb-[25px] ">
          Dashboard
        </h1>
        {/* analytics row  */}
        <div className="dashCardRow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 lg:gap-4 xl:gap-8 xl:mb-[15.76px] mb-[10px]">
          <StatsCard
            name="Total Inventory"
            amount={
              state?.stats?.total_inventory ? state?.stats?.total_inventory : 0
            }
            image={inventory}
          />
          <StatsCard
            name="Total Sales"
            image={salesImg}
            amount={`€${
              state?.stats?.total_sales ? state?.stats?.total_sales : 0
            }`}
          />
        </div>

        {/* analytics row end  */}

        {/* order detail card table row  */}
        <div className="myCard bg-[#fff]">
          <div className="flex justify-between items-center xl:mb-[35px] lg:mb-[28px] mb-[20px]">
            <h5 className="xl:text-24 lg:text-22 text-20  font-bold">
              Order Details
            </h5>
            {/* dropdown  */}
            <div>
              <div class="relative inline-block text-left">
                <div>
                  <DropDown
                    firstOptionText="October"
                    width="100%"
                    color="bg-#111727"
                    headerTextColor="#ABABAD"
                    useGrayColor
                    options={months}
                    onChange={handleChange}
                  />
                </div>

                {/* <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Account settings
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      Support
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-2"
                    >
                      License
                    </a>
                   
                  </div>
                </div> */}
              </div>
            </div>
            {/* dropdown end  */}
          </div>
          {/* order details table  */}
          <div className="w-full rounded-lg overflow-x-auto">
            <table className="w-full leading-normal">
              <thead>
                <tr className="bg-[#F1F4F9]">
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold  rounded-l-2xl text-nowrap">
                    Product Name Product Name Product Name Product Name
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Location
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    Date - Time
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Piece
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Amount
                  </th>

                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-center xl:text-15 text-14font-bold rounded-r-2xl text-nowrap">
                    Status
                  </th>
                </tr>
              </thead>

              {state?.orderList?.length > 0 ? (
                state?.orderList?.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr className="border-b-[0.4px] border-gray">
                        <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                          <div className="flex xl:gap-3 gap-1 items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                src={item?.image || sampleProductImg} // Use item.image or fallback to sampleProductImg
                                alt={item?.name || "Sample Product Name"} // Use item.name or fallback to "Sample Product Name"
                                className="xl:w-[36px] lg:w-[32px] w-[28px]"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item?.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item?.address}
                            </p>
                          </div>
                        </td>
                        <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap xl:text-15 text-12">
                            {moment(item?.dates)?.format("MMMM DD, YYYY")}
                          </p>
                        </td>
                        <td className="xl:px-[20px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.quantity}
                          </p>
                        </td>
                        <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <div className="flex gap-3 items-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              €{item?.gross_total}
                            </p>
                          </div>
                        </td>
                        <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <p
                            className={`rounded-full ${
                              item?.status === "Rejected"
                                ? "bg-[#FD5454]"
                                : item?.status === "Pending"
                                ? "bg-[#FCBE2D]"
                                : "bg-green1"
                            } text-white px-[4px] py-[7px] text-14 font-bold text-center`}
                          >
                            {item?.status}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-[16px] font-semibold text-gray3"
                    >
                      No data found
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          {/* order details table end */}
        </div>
        {/* order detail card table row end */}

        <div className="w-full xl:mt-[106px] lg:mt-[80px] mt-[50px] flex justify-end">
          <button
            onClick={() => navigate("/new-product")}
            className="bg-[#FBC700] block text-black text-center py-[14px] px-[20px] w-2/6 font-semibold xl:mb-[23px] mb-[15px] xl:text-20 lg:text-18 md:text-16
"
          >
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};
