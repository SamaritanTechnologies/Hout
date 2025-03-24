import React, { useEffect, useState } from "react";
import notfiIcon from "../../assets/DashboardImages/notfiIcon.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <div className="relative flex items-center w-full max-w-[388px] h-10 rounded-full focus-within:shadow-lg bg-white overflow-hidden border-gray	border-[0.5px]">
              <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#fefbeb]  min-w-[50px]">
                <MagnifyingGlassIcon className="h-6 w-6 text-[#00000080]" />
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

        <div className="dashHeadRight xl:w-[44%] w-[51%] flex justify-end gap-[15px] items-center">
          <a href="#">
            <img src={notfiIcon} alt="" />
          </a>
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
