import React, { useEffect, useState } from "react";
import cart from "../../assets/HeaderAndFooter/cart.svg";
import heart from "../../assets/HeaderAndFooter/heart.svg";
import persons from "../../assets/HeaderAndFooter/persons.svg";
import headerImage from "../../assets/new-logo.png";
import search from "../../assets/HeaderAndFooter/searchh.svg";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../providers";
import { scrollToTop } from "../../utils/helper";

const HeaderSection = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  console.log(isActive, "isActive");
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

  let role = "user";

  return (
    <section
      className={`px-6 fixed top-0 w-full z-50 lg:px-[55px] py-4 md:py-2 justify-between flex items-center  ${
        isScrolled
          ? " bg-[#b0ada8ab] scrollNav h-[90px] lg:h-[90px] md:h-[70px]"
          : "bg-[#E9E6D6] h-[90px] lg:h-[90px] md:h-[70px]"
      }`}
    >
      <div className="menu-cons xl:hidden lg:hidden" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </div>

      <section
        className={`navbar ${
          isActive ? "active" : null
        }    flex-wrap flex flex-col lg:flex-row xl:flex-row gap-[20px] xl:gap-[20px]  items-start lg:items-center xl:items-center px-6 lg:px-0 xl:px-0`}
      >
        <div
          className="close-menu xl:hidden lg:hidden ml-auto p-4"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
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
          Product Menu
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
      </section>
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
        <div
          className="cursor-pointer xs:hidden sm:hidden md:hidden "
          onClick={() => {
            scrollToTop();
            setIsActive(false);
            navigate("/shop-page");
          }}
        >
          Shop
        </div>
        <div>
          {" "}
          <img
            src={persons}
            className="cursor-pointer h-[18px]"
            onClick={() => {
              if (token) {
                navigate("/myaccount");
              } else {
                navigate("/sign-in");
              }
            }}
          />
        </div>
        <div>
          <img src={search} className="cursor-pointer h-[20px] " />
        </div>
        <div>
          <img
            src={heart}
            className="cursor-pointer h-[20px]"
            // onClick={() => navigate("/myaccount", { state: { key: "wish" } })}
            onClick={() => {
              scrollToTop();
              setIsActive(false);
              navigate("/wishlist");
            }}
          />
        </div>
        <div
          onClick={() => {
            scrollToTop();
            setIsActive(false);
            navigate("/cart");
          }}
        >
          <img src={cart} className="cursor-pointer h-[20px] " />
        </div>
      </section>
    </section>
  );
};

export default HeaderSection;
