import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notfiIcon from "../../assets/DashboardImages/notfiIcon.svg";
import country from "../../assets/DashboardImages/country.svg";
import ProfileDD from "../../assets/DashboardImages/ProfileDD.svg";
import CountrySelector from "../Common/CountrySelector";
import HeadLessDropDown from "../Common/HeadLessDropDown";
import { getAccessToken } from "../../providers";
import {
  getProductCategories,
  getProductStaticValuesByName,
} from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import { setProductCategories } from "../../redux";

const AdminMainNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;
  const [isScrolled, setIsScrolled] = useState(false);
  const isAdmin = false;

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

  const fetchCategories = async () => {
    try {
      // fetch dynamic categories
      const dynamicCategories = await getProductCategories();

      // fetch unqiue values for thickness, width, and weight from all products list
      const staticValuesPromises = [
        getProductStaticValuesByName("thickness"),
        getProductStaticValuesByName("width"),
        // getProductStaticValuesByName("weight"),
      ];
      // backend not sending weight unique values :) need to add from backend
      const [thicknessRes, widthRes, weightRes] = await Promise.all(
        staticValuesPromises
      );

      // transform unqiue values into the same format as categories
      const transformUniqiueValues = (name, values) => ({
        id: Math.floor(Math.random() * 1000),
        name,
        choices: values?.map((value) => ({
          id: Number(value),
          category: name,
          name_en: value,
          name_nl: value,
        })),
      });

      const uniqueCategories = [
        transformUniqiueValues("thickness", thicknessRes.values),
        transformUniqiueValues("width", widthRes.values),
        // transformUniqiueValues("weight", weightRes.values),
      ];


      // combine dynamic and unique static categories
      const combinedCategories = [...dynamicCategories, ...uniqueCategories];
      dispatch(setProductCategories(combinedCategories));
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setProductCategories([]));
    }
  };

  useEffect(() => {
    fetchCategories();
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
            <HeadLessDropDown token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainNav;
