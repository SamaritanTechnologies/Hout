import React, { useEffect, useState } from "react";
import inventory from "../assets/DashboardImages/inventory.svg";
import skuImg from "../assets/DashboardImages/skuImg.svg";
import salesImg from "../assets/DashboardImages/salesImg.svg";
import sampleProductImg from "../assets/DashboardImages/sampleProductImg.svg";
import DropDown from "../components/Common/DropDown";
import { getOrderDetails } from "../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getStats } from "../redux/actions/dashboardActions";
import StatsCard from "../components/Dashboard/StatsCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ORDER_PAGE_SIZE } from "../utils/const";
import Pagination from "../components/Common/Pagination";

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
  const navigate = useNavigate();
  const pageSize = ORDER_PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState({
    orderList: [],
    stats: null,
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

  const fetchDashboardStats = async () => {
    try {
      const res = await getStats();
      if (res) {
        const transformedData = Object.entries(res).map(([key, details]) => ({
          key,
          ...details,
        }));
        setState((prev) => ({
          ...prev,
          stats: transformedData,
        }));
      }
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

  // useEffect(() => {
  //   fetchOrderslist(state?.selectedMonth, state?.selectedDate);
  // }, [state?.selectedMonth, state?.selectedDate]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const inventoryStats = state?.stats?.find(
    (stat) => stat.key === "total_inventory"
  );

  const skuStats = state?.stats?.find((stat) => stat.key === "total_sku");
  const salesStats = state?.stats?.find((stat) => stat.key === "total_sales");

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

  const handleDateChange = (e) => {
    setState((prev) => ({
      ...prev,
      selectedDate: e.target.value,
    }));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

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
            image={inventory}
            stats={inventoryStats}
          />
          <StatsCard name="Total SKU" image={skuImg} stats={skuStats} />
          <StatsCard name="Total Sales" image={salesImg} stats={salesStats} />
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
                    Order ID
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Order Data
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Customer Name
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Address
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    <div className="flex flex-col">
                      <span>Date - Time</span>
                      <input
                        type="date"
                        value={state.selectedDate}
                        onChange={handleDateChange}
                        className="border-[0.5px] border-gray text-sm text-gray-700 rounded-full px-3 py-2 bg-[#fefbeb]"
                      />
                    </div>
                  </th>
                  {/* <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Piece
                  </th> */}
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Order Price
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
                        <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap xl:text-15 text-12">
                            {item.id}
                          </p>
                        </td>
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
                            {item?.user.first_name}
                          </p>
                        </td>
                        <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap ml-3">

                          <p className="text-gray-900 whitespace-no-wrap">

                            {item?.delivery_address}
                          </p>
                        </td>
                        <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap xl:text-15 text-12">
                            {formattedDate}
                          </p>
                        </td>
                        {/* <td className="xl:px-[20px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {productQuantities}
                          </p>
                        </td> */}
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
        {totalPage > 1 && (
          <Pagination
            pageCount={totalPage}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1}
          />
        )}

        <div className="w-full xl:mt-[106px] lg:mt-[80px] mt-[50px] flex justify-end">
          <button
            onClick={() => navigate("/new-product")}
            className="bg-[#FBC700] block text-black text-center py-[14px] px-[18px] w-2/6 font-semibold xl:mb-[23px] mb-[15px] xl:text-18 lg:text-18 md:text-16 max-w-[280px]
"
          >
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};
