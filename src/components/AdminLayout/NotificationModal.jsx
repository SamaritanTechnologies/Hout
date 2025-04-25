import {
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithCredentials } from "../../providers";

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? "" : "s"} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? "" : "s"} ago`;
  }

  return "Just now";
};

const NotificationModal = ({
  orders,
  fetchNotifications,
  setIsDropdownOpen,
}) => {
  const navigate = useNavigate();
  const markAsRead = (id) => {};

  // const markAllAsRead = () => {};

  const displayedOrders = orders.slice(0, 10);
  const hasUnreadOrders = orders.some((order) => order.is_read === false);

  const handleNavigate = () => {
    setIsDropdownOpen(false);
    navigate("/orders");
  };
  const markAllAsRead = async () => {
    try {
      const res = await axiosWithCredentials.post(
        "/order-notifications/mark-all-read/"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-[#abb0b8] z-50 overflow-hidden animate-fade-in-up">
      <div className="p-4 border-b border-[#abb0b8] flex justify-between items-center bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>

        {hasUnreadOrders && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {displayedOrders.length > 0 ? (
        <ul className="divide-y divide-gray max-h-96 overflow-y-auto">
          {displayedOrders.map((order) => (
            <li
              onClick={handleNavigate}
              key={order.id}
              className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      order.is_read === true
                        ? "bg-green-100 text-green-600"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.is_read ? (
                      <ClipboardDocumentListIcon className="w-5 h-5" />
                    ) : (
                      <CheckBadgeIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex gap-4">
                      <div className="flex  items-center gap-2">
                        <p className=" font-semibold">Order Id#</p>
                        <p className="text-sm font-medium text-gray-900">
                          {order?.order}
                        </p>
                      </div>
                      <div className="flex  items-center gap-2">
                        <p className="">Total Items :</p>
                        <p className="text-sm font-medium text-gray-900">
                          {order.total_items}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      $ {Number(order.total_price).toFixed(2)}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {formatTimeAgo(order.created_at)}
                    </div>
                  </div>
                </div>
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

      <div className="border-t border-[#abb0b8] p-3 text-center bg-gray-50">
        <button
          onClick={handleNavigate}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center cursor-pointer"
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
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
