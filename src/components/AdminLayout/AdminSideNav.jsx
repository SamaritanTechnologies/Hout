import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import houtLogo from "../../assets/new-logo.png";

const AdminSidenav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [navs, setNavs] = useState([
    { name: "Dashboard", link: "/dashboard", active: false },
    { name: "Coupon", link: "/add-coupon", active: false },
    { name: "VAT", link: "/vat-value", active: false },
    { name: "Delivery", link: "/delivery", active: false },
    { name: "Products", link: "/products", active: false },
    { name: "Orders", link: "/orders", active: false },
    { name: "Product Options", link: "/product-options", active: false },
    { name: "Homepage Image", link: "/homepage-image", active: false },
    { name: "Homepage Products", link: "/homepage-products", active: false },
    { name: "Our Values", link: "/our-values", active: false },
    { name: "Our Assortment", link: "/our-assortment", active: false },
    { name: "Why Hout Totaal", link: "/why-hout-totaal", active: false },
    {
      name: "Terms and Conditions",
      link: "/terms-and-conditions",
      active: false,
    },
    { name: "Privacy Policy", link: "/admin-privacy-policy", active: false },
    { name: "About Us", link: "/admin-about-us", active: false },
    { name: "FAQ", link: "/admin-FAQ", active: false },
    { name: "Webshop", link: "/admin-webshop", active: false },
    { name: "SignIn  Image", link: "/admin-signin", active: false },
    { name: "Signup Image", link: "/admin-signup", active: false },
    { name: "Forgot Image", link: "/admin-forgot", active: false },
    { name: "Reset Image", link: "/admin-reset", active: false },
    { name: "Payment Option", link: "/admin-payment", active: false },
  ]);

  // useEffect(() => {
  //   setNavs((prevNavs) =>
  //     prevNavs.map((item) => {
  //       // Special case for dashboard
  //       if (item.link === "/dashboard") {
  //         return {
  //           ...item,
  //           active:
  //             location.pathname === "/" ||
  //             location.pathname.startsWith("/dashboard"),
  //         };
  //       }

  //       const firstPathSegment = item.link.split("/")[1];
  //       const currentFirstSegment = location.pathname.split("/")[1];

  //       return {
  //         ...item,
  //         active:
  //           location.pathname.startsWith(item.link) ||
  //           (item.link !== "/" && currentFirstSegment === firstPathSegment),
  //       };
  //     })
  //   );
  // }, [location.pathname]);

  useEffect(() => {
    let bestMatchIndex = -1;
    let bestMatchLength = -1;

    navs.forEach((item, index) => {
      if (
        location.pathname === item.link ||
        location.pathname.startsWith(item.link + "/")
      ) {
        if (item.link.length > bestMatchLength) {
          bestMatchIndex = index;
          bestMatchLength = item.link.length;
        }
      }
    });

    setNavs((prevNavs) =>
      prevNavs.map((item, index) => ({
        ...item,
        active: index === bestMatchIndex,
      }))
    );
  }, [location.pathname]);
  const handleNavigation = (item) => {
    navigate(item.link);
  };

  return (
    <section className="">
      <div className="xl:w-[240px] lg:w-[220px] w-[200px] min-h-screen bg-white shadow-md">
        <div className="mb-[22px] block px-[24px] pt-[10px]">
          <img
            src={houtLogo}
            alt="Hout Totaal Logo"
            onClick={() => navigate("/dashboard")}
            className="w-[160px] lg:w-[135px] h-[70px] mx-auto object-cover cursor-pointer"
          />
        </div>
        <nav className="flex flex-col items-start xl:px-[24px] lg:px-[20px] px-[16px] overflow-y-auto h-[calc(100vh-110px)]">
          {navs.map((item) => (
            <button
              key={item.link}
              className={`w-full text-left h-[43px] text-14 font-medium cursor-pointer px-4 shrink-0
                transition-colors ${
                  item.active
                    ? "bg-[#FACE25] text-white font-semibold border-r-4 border-[#FACE25]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => handleNavigation(item)}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default AdminSidenav;
