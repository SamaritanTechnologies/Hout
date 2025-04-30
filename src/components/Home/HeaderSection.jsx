import React, { useEffect, useRef, useState } from "react";
import cart from "../../assets/HeaderAndFooter/cart.svg";
import heart from "../../assets/HeaderAndFooter/heart.svg";
import persons from "../../assets/HeaderAndFooter/persons.svg";
import headerImage from "../../assets/new-logo.png";
import search from "../../assets/HeaderAndFooter/searchh.svg";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/helper";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/orderActions";
import { setCartItems } from "../../redux/slices/cartSlice";

import countryflag1 from "../../assets/DashboardImages/flag-netherlands.svg";
import countryflag2 from "../../assets/DashboardImages/USA-flag.svg";
import { axiosWithCredentials } from "../../providers";
const HeaderSection = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState.isLoggedIn;
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [localCart, setLocalCart] = useState([]);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "nl",
    name: "Dutch",
    flag: countryflag1,
  });
  const dropdownRef = useRef(null);
  const languages = [
    { code: "uk", name: "English", flag: countryflag2 },
    { code: "nl", name: "Dutch", flag: countryflag1 },
  ];
  const cartItems = useSelector((state) => state.cart?.data);
  const totalQuantity = cartItems?.length || 0;
  const cartQuantity = localCart?.length || 0;

  const toggleMenu = () => {
    setIsActive(!isActive);
  };
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

  const fetchCart = async () => {
    try {
      const res = await getCart();
      dispatch(setCartItems(res.cart_items));
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const loadLocalCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCart(storedCart);
  };

  const handleAddtoCartItems = async (payload) => {
    console.log("payload", payload);
    const res = await axiosWithCredentials.post(`/add-to-cart/`, payload);

    if (res) {
      localStorage.removeItem("cart");
    }
    fetchCart();
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLocalCart();
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const formattedCart = storedCart.map((item) => ({
        product_length: item?.lengths[0]?.id,
        quantity: item.quantity,
      }));
      handleAddtoCartItems(formattedCart);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      loadLocalCart();
      window.addEventListener("localCartUpdated", loadLocalCart);
    }

    return () => {
      window.removeEventListener("localCartUpdated", loadLocalCart);
    };
  }, [dispatch, isAuthenticated]);

  let role = "user";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const availableLanguages = languages.filter(
    (lang) => lang.code !== selectedLanguage.code
  );

  return (
    <header
      className={`min-h-[100px] px-4 fixed top-0 w-full z-10 flex items-center ${
        isScrolled ? " bg-[#b0ada8ab] scrollNav" : "bg-[#E9E6D6]"
      }`}
    >
      <div className="justify-between flex items-center w-full max-w-[1240px] mx-auto">
        <div className="menu-cons xl:hidden lg:hidden" onClick={toggleMenu}>
          <Bars3Icon className="h-6 w-6 text-gray-500" />
        </div>

        <div
          className={`navbar ${
            isActive ? "active " : ""
          }flex flex-col lg:flex-row xl:flex-row gap-5 items-start`}
        >
          <div
            className="close-menu xl:hidden lg:hidden ml-auto p-4"
            onClick={toggleMenu}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </div>
          {role === "admin" && (
            <span
              className="cursor-pointer ml-4"
              onClick={() => {
                navigate("/dashboard");
                setIsActive(false);
              }}
            >
              Dashboard
            </span>
          )}

          <span
            className=" cursor-pointer ml-4"
            onClick={() => {
              setIsActive(false);
              navigate("/");
              setTimeout(() => {
                document.getElementById("products-section")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Products
          </span>
          <span
            className=" cursor-pointer ml-4"
            onClick={() => {
              setIsActive(false);
              navigate("/");
              setTimeout(() => {
                document.getElementById("why-hout")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Why Hout Totaal
          </span>
          <span
            className=" cursor-pointer ml-4"
            onClick={() => {
              setIsActive(false);
              navigate("/");
              setTimeout(() => {
                document.getElementById("contact-us")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Contact
          </span>
          <div
            className="cursor-pointer ml-4  xs:block sm:block md:block hidden"
            onClick={() => {
              setIsActive(false);
              navigate("/shop-page");
            }}
          >
            Shop
          </div>
        </div>
        <div className="header-logo flex flex-1 items-center justify-center w-full mt-2 lg:w-auto xl:w-auto pl-6 pr-6 md:pr-0">
          <img
            src={headerImage}
            className="cursor-pointer w-[160px] h-[43px] "
            onClick={() => {
              scrollToTop();
              setIsActive(false);
              navigate("/");
            }}
          />
        </div>

        <section className="flex  gap-x-[24px] items-center xl:gap-x-[40px] ">
          {isAuthenticated ? (
            ""
          ) : (
            <div>
              <button
                className="bg-[#FBC700] text-[#161922] px-2 py-1 rounded-md "
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Login
              </button>
            </div>
          )}

          <div
            className="cursor-pointer xs:hidden sm:hidden md:hidden "
            onClick={() => {
              scrollToTop();
              setIsActive(false);
              navigate("/shop-page");
            }}
          >
            Webshop
          </div>

          {isAuthenticated ? (
            <div>
              <img
                src={persons}
                className="cursor-pointer h-[18px]"
                onClick={() => navigate("/myaccount")}
              />
            </div>
          ) : (
            ""
          )}

          <div>
            <img src={search} className="cursor-pointer h-[20px] " />
          </div>
          <div>
            <img
              src={heart}
              className="cursor-pointer h-[20px]"
              onClick={() => {
                scrollToTop();
                setIsActive(false);
                navigate("/wishlist");
              }}
            />
          </div>
          <div
            className="relative"
            onClick={() => {
              scrollToTop();
              setIsActive(false);
              navigate("/cart");
            }}
          >
            <img src={cart} className="cursor-pointer h-[20px] " />
            {isAuthenticated
              ? totalQuantity > 0 && (
                  <span
                    className="absolute text-white text-[12px] w-5 h-5 
            bg-[#FFDD00] rounded-full flex items-center justify-center 
            -top-4 -right-2 font-medium"
                  >
                    {totalQuantity}
                  </span>
                )
              : cartQuantity > 0 && (
                  <span
                    className="absolute text-white text-[12px] w-5 h-5 
            bg-[#FFDD00] rounded-full flex items-center justify-center 
            -top-4 -right-2 font-medium"
                  >
                    {cartQuantity}
                  </span>
                )}
          </div>
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              className="flex items-center justify-center "
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Change language"
              aria-expanded={isOpen}
            >
              <img
                src={selectedLanguage.flag}
                alt={selectedLanguage.name}
                className="w-6 h-4 object-cover"
              />
            </button>

            {isOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 w-28">
                {availableLanguages.map((language) => (
                  <button
                    key={language.code}
                    className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors"
                    onClick={() => handleLanguageSelect(language)}
                    aria-label={`Select ${language.name}`}
                  >
                    <img
                      src={language.flag}
                      alt={language.name}
                      className="w-6 h-4 object-cover mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      {language.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </header>
  );
};

export default HeaderSection;
