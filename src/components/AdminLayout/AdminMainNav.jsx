import React, { useCallback, useEffect, useState } from "react";
import notfiIcon from "../../assets/DashboardImages/notfiIcon.svg";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckBadgeIcon,
  BellIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import HeadLessDropDown from "../Common/HeadLessDropDown";
import NotificationModal from "./NotificationModal";
import { axiosWithCredentials } from "../../providers";

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
    // {
    //   id: 1,
    //   item: "Order #1001 - 3 items",
    //   time: "2 mins ago",
    //   status: "pending",
    //   amount: "$125.99",
    // },
    // {
    //   id: 2,
    //   item: "Order #1002 - 1 item",
    //   time: "10 mins ago",
    //   status: "processing",
    //   amount: "$49.99",
    // },
    // {
    //   id: 3,
    //   item: "Order #1003 - 5 items",
    //   time: "1 hour ago",
    //   status: "completed",
    //   amount: "$234.50",
    // },
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axiosWithCredentials.get("/order-notifications/");
      setOrders(res?.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 5000);
    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  const unreadCount = orders.filter((order) => order.is_read === false).length;

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
              className="relative  rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Notifications"
            >
              <BellIcon className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span
                  className="absolute text-white text-[12px] w-5 h-5 
            bg-[#FFDD00] rounded-full flex items-center justify-center 
            -top-4 -right-2 font-medium"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {isDropdownOpen && (
              <NotificationModal
                orders={orders}
                fetchNotifications={fetchNotifications}
                setIsDropdownOpen={setIsDropdownOpen}
              />
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
