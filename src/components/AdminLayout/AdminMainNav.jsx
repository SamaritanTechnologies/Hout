import React, { useEffect, useState } from "react";
import notfiIcon from "../../assets/DashboardImages/notfiIcon.svg";
import {   MagnifyingGlassIcon,
  XMarkIcon, 
  CheckBadgeIcon,
  BellIcon,
  ClockIcon,
  ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import HeadLessDropDown from "../Common/HeadLessDropDown";

const AdminMainNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: 1,
      item: "Order #1001 - 3 items",
      time: "2 mins ago",
      status: "pending",
      amount: "$125.99",
    },
    {
      id: 2,
      item: "Order #1002 - 1 item",
      time: "10 mins ago",
      status: "processing",
      amount: "$49.99",
    },
    {
      id: 3,
      item: "Order #1003 - 5 items",
      time: "1 hour ago",
      status: "completed",
      amount: "$234.50",
    },
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const markAsRead = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const markAllAsRead = () => {
    setOrders([]);
  };

  return (
    <div
      className={`dashRightSide w-full  flex-1 ${
        isScrolled
          ? " scrollNav h-[90px] lg:h-[90px] md:h-[70px]"
          : " h-[90px] lg:h-[90px] md:h-[70px]"
      }`}
    >
      <div className="dashHead xl:px-[30px] lg:px-[26px] px-[20px] xl:py-[16px] py-[10px] flex justify-between items-center">
        <div className="search w-[40%]">
          <div className="">
            {/* <div className="relative flex items-center w-full max-w-[388px] h-10 rounded-full focus-within:shadow-lg bg-white overflow-hidden border-gray	border-[0.5px]">
              <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#fefbeb]  min-w-[50px]">
                <MagnifyingGlassIcon className="h-6 w-6 text-[#00000080]" />
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#fefbeb]"
                type="text"
                id="search"
                placeholder="Search"
              />
            </div> */}
          </div>
        </div>

        <div className="dashHeadRight xl:w-[44%] w-[51%] flex justify-end gap-[15px] items-center">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Notifications"
          >
            <BellIcon className="w-6 h-6 text-gray-600" />
            {orders.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full font-semibold shadow-sm">
                {orders.length}
              </span>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden animate-fade-in-up">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-base font-semibold text-gray-900">
                  Recent Orders
                  {orders.length > 0 && (
                    <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {orders.length} new
                    </span>
                  )}
                </h3>
                {orders.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {orders.length > 0 ? (
                <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {order.status === "completed" ? (
                              <CheckBadgeIcon className="w-5 h-5" />
                            ) : (
                              <ClipboardDocumentListIcon className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {order.item}
                            </p>
                            <p className="text-xs font-medium text-gray-500 mt-1">
                              {order.amount}
                            </p>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {order.time}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => markAsRead(order.id)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          aria-label="Mark as read"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center">
                  <ClipboardDocumentListIcon className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">No new orders</p>
                </div>
              )}

              <div className="border-t border-gray-200 p-3 text-center bg-gray-50">
                <a
                  href="/orders"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
                >
                  View all orders
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
          {/* <div className="flagSelMain flex items-center">
            <CountrySelector />
            <div id="google_translate_element"></div>
          </div> */}
          {/* <div>
            <a href="#">
              <img src={ProfileDD} alt="" />
            </a>
          </div> */}
          <div className="">
            <HeadLessDropDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainNav;