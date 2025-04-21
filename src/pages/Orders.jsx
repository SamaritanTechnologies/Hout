import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getOrderDetails } from "../redux/actions/orderActions";
import DropDown from "../components/Common/DropDown";
import sampleProductImg from "../assets/DashboardImages/sampleProductImg.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

export const Orders = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    orderList: [],
    selectedMonth: null,
    searchQuery: "",
  });

  const fetchOrderslist = async (month) => {
    try {
      const res = await getOrderDetails(month);
      setState((prev) => ({
        ...prev,
        orderList: res,
      }));
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

  const handleSearchChange = (e) => {
    setState((prev) => ({
      ...prev,
      searchQuery: e.target.value,
    }));
  };

  const filterOrders = (orders, query) => {
    if (!query) return orders;

    return orders.filter((order) => {
      const productInfo = Array.isArray(order?.sold_product_information)
        ? order.sold_product_information
        : Object.values(order?.sold_product_information || {});

      return productInfo.some((product) =>
        product?.name?.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const sortOrdersByDate = (orders) => {
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.dates);
      const dateB = new Date(b.dates);
      return dateB - dateA;
    });
  };

  return (
    <div className="xl:p-[30px] lg:p-[24px] p-[20px] bg-[#fafafa] h-full min-h-[86vh]">
      {/* order detail card table row  */}
      <div className="myCard bg-[#fff]">
        <div className="flex justify-between items-center xl:mb-[35px] lg:mb-[28px] mb-[20px]">
          <h5 className="xl:text-24 lg:text-22 text-20  font-bold">
            Order Details
          </h5>
          {/* dropdown  */}
          <div>
            <div className="relative inline-block text-left">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center w-full min-w-[250px] max-w-[388px] h-10 rounded-full focus-within:shadow-lg bg-white overflow-hidden border-gray	border-[0.5px]">
                  <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#fefbeb]  min-w-[50px]">
                    <MagnifyingGlassIcon className="h-6 w-6 text-[#00000080]" />
                  </div>
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#fefbeb]"
                    type="text"
                    id="search"
                    placeholder="Search by product name"
                    value={state.searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
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
                  Product Name
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

            {filterOrders(state.orderList, state.searchQuery).length > 0 ? (
              <tbody>
                {sortOrdersByDate(
                  filterOrders(state.orderList, state.searchQuery)
                ).map((item, index) => {
                  const productInfo = Array.isArray(
                    item?.sold_product_information
                  )
                    ? item.sold_product_information
                    : Object.values(item?.sold_product_information || {});

                  const productNames = productInfo
                    .map((p) => p?.name)
                    .filter(Boolean)
                    .join(", ");
                  const productQuantities = productInfo
                    .map((p) => p?.quantity)
                    .filter(Boolean)
                    .join(", ");
                  const totalAmount = parseFloat(item?.total) || 0;
                  const formattedDate = moment(item?.dates)?.format(
                    "MMMM DD, YYYY"
                  );

                  return (
                    <tr key={index} className="border-b-[0.4px] border-gray">
                      <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                        <div className="flex xl:gap-3 gap-1 items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              src={item?.image || sampleProductImg}
                              alt={item?.name || "Sample Product Name"}
                              className="xl:w-[36px] lg:w-[32px] w-[28px]"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {productNames}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                        <p className="text-gray-900 whitespace-no-wrap ml-3">
                          {item?.delivery_address}
                        </p>
                      </td>
                      <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                        <p className="text-gray-900 whitespace-no-wrap xl:text-15 text-12">
                          {formattedDate}
                        </p>
                      </td>
                      <td className="xl:px-[20px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {productQuantities}
                        </p>
                      </td>
                      <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                        <p className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto]">
                          €{totalAmount.toFixed(2)}
                        </p>
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
                  );
                })}
              </tbody>
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
      </div>
    </div>
  );
};