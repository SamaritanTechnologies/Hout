import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import moment from "moment";
import { getOrderDetails } from "../redux/actions/orderActions";
import DropDown from "../components/Common/DropDown";
import sampleProductImg from "../assets/DashboardImages/sampleProductImg.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Pagination from "../components/Common/Pagination";
import { ORDER_PAGE_SIZE } from "../utils/const";
import { axiosWithCredentials } from "../providers";

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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = ORDER_PAGE_SIZE;
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState({
    orderList: [],
    selectedMonth: null,
    searchQuery: "",
    selectedDate: "",
  });

  const fetchOrderslist = async (month, date, page, size) => {
    try {
      const res = await getOrderDetails(month, date, page, size);
      setState((prev) => ({
        ...prev,
        orderList: res.results || [],
      }));
      setTotalPage(Number(res.total_pages) || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchOrderslist(
      state.selectedMonth,
      state.selectedDate,
      currentPage,
      pageSize
    );
  }, [state.selectedMonth, state.selectedDate, currentPage, pageSize]);

  const markAllAsRead = async () => {
    try {
      const res = await axiosWithCredentials.post(
        "/order-notifications/mark-all-read/"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    markAllAsRead();
  }, []);

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      selectedMonth: e.target.value,
    }));
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const handleDateChange = (e) => {
    setState((prev) => ({
      ...prev,
      selectedDate: e.target.value,
    }));
    setCurrentPage(1);
  };

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
    return [...orders].sort((a, b) => new Date(b.dates) - new Date(a.dates));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const filteredOrders = sortOrdersByDate(
    filterOrders(state.orderList, state.searchQuery)
  );

  return (
    <>
      <div className="xl:p-[30px] lg:p-[24px] p-[20px] bg-[#fafafa] h-full min-h-[86vh]">
        <div className="myCard bg-[#fff]">
          <div className="flex justify-between items-center xl:mb-[35px] lg:mb-[28px] mb-[20px]">
            <h5 className="xl:text-24 lg:text-22 text-20 font-bold">
              Order Details
            </h5>
            <div className="flex items-center gap-4">
              <div className="relative flex items-center w-full min-w-[250px] max-w-[388px] h-10 rounded-full bg-white overflow-hidden border-gray border-[0.5px]">
                <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#fefbeb] min-w-[50px]">
                  <MagnifyingGlassIcon className="h-6 w-6 text-[#00000080]" />
                </div>
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#fefbeb]"
                  type="text"
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
                value={state.selectedMonth}
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="w-full rounded-lg overflow-x-auto">
            <table className="w-full leading-normal">
              <thead>
                <tr className="bg-[#F1F4F9]">
                  {[
                    "Order ID",
                    "Order Data",
                    "Customer Name",
                    "Address",
                    "Date - Time",
                    // "Piece",
                    "Order Price",
                    "Status",
                  ].map((head, i) => (
                    <th
                      key={i}
                      className={`xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap ${
                        i === 0 ? "rounded-l-2xl" : ""
                      } ${i === 6 ? "text-center rounded-r-2xl" : ""}`}
                    >
                      {head === "Date - Time" ? (
                        <div className="flex flex-col justify-center items-start gap-1">
                          <span>{head}</span>
                          <input
                            type="date"
                            value={state.selectedDate}
                            onChange={handleDateChange}
                            className="border-[0.5px] border-gray text-sm text-gray-700 rounded-full px-3 py-2 bg-[#fefbeb]"
                          />
                        </div>
                      ) : (
                        head
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((item, index) => {
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
                    const formattedDate = moment(item?.dates).format(
                      "MMMM DD, YYYY"
                    );

                    return (
                      <tr key={index} className="border-b-[0.4px] border-gray">
                        <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap xl:text-15 text-12">
                            {item.id}
                          </p>
                        </td>
                        <td className="px-[12px] py-[12px] text-left font-semibold text-gray3">
                          <div className="flex gap-2 items-center">
                            <img
                              src={item?.image || sampleProductImg}
                              alt="product"
                              className="w-10 h-10 object-cover"
                            />
                            <span>{productNames}</span>
                          </div>
                        </td>
                        <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap ml-3">
                            {item?.user.first_name}
                          </p>
                        </td>
                        <td className="px-[12px] py-[12px] text-left font-semibold text-gray3">
                          {item?.delivery_address}
                        </td>
                        <td className="px-[12px] py-[12px] text-left font-semibold text-gray3">
                          {formattedDate}
                        </td>
                        {/* <td className="px-[12px] py-[12px] text-left font-semibold text-gray3">
                          {productQuantities}
                        </td> */}
                        <td className="px-[12px] py-[12px] text-left font-semibold text-gray3">
                          €{totalAmount.toFixed(2)}
                        </td>
                        <td className="px-[12px] py-[12px] text-center font-semibold text-gray3">
                          <p
                            className={`rounded-full px-[10px] py-[5px] text-white text-14 font-bold ${
                              item?.status === "Rejected"
                                ? "bg-[#FD5454]"
                                : item?.status === "Pending"
                                ? "bg-[#FCBE2D]"
                                : "bg-green1"
                            }`}
                          >
                            {item?.status}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-[16px] font-semibold text-gray3"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {totalPage > 1 && (
        <Pagination
          pageCount={totalPage}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
        />
      )}
    </>
  );
};
