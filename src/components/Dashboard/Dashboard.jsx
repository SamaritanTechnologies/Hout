import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="dashRightSide flex-1 ">
          <div className="dashHead px-[30px] py-[16px]">
            <div className="search">
              {/* <!-- component --> */}
              <div className="max-w-md">
                <div className="relative flex items-center w-[80%] h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden border-inherit	border-[0.5px]">
                  <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#fefbeb]  min-w-[50px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 searchSvg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                       
                      />
                    </svg>
                  </div>

                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#fefbeb]"
                    type="text"
                    id="search"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="dashContentSec"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
