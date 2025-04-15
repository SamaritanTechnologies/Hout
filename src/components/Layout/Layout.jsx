import React, { useEffect, useState } from "react";
import HeaderSection from "../Home/HeaderSection";
import FooterSection from "../Home/FooterSection";
import whatsappIcon from "../../assets/whatsapp-icon.svg";
import AdminSideNav from "../AdminLayout/AdminSideNav";
import AdminMainNav from "../AdminLayout/AdminMainNav";
import { Outlet, useLocation } from "react-router-dom";
const phoneNumber = "31633966002";
const message = encodeURIComponent("Hello Hout!!!");
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
const Layout = () => {
  const authPaths = [
    "/sign-in",
    "/sign-up",
    "/forget-password",
    "/reset-password",
    "/oauth-callback",
  ];
  const adminPaths = [
    "/dashboard",
    "/vat-value",
    "/products",
    "/new-product",
    "/product-options",
    "/homepage-image",
    "/homepage-products",
    "/our-values",
    "/our-assortment",
    "/why-hout-totaal",
    "/terms-and-conditions",
    "/admin-privacy-policy",
    "/admin-about-us",
    "/admin-FAQ",
    // "/inbox",
    "/order-list",
    "/product",
    "/user-profile",
    "/customized-product",
  ];

  const currentPath = useLocation().pathname;
  const hasSidnav = adminPaths.some((adminPath) => {
    return currentPath === adminPath || currentPath.startsWith(adminPath + "/");
  });

  const hasHeaderFooter = authPaths.includes(currentPath);

  return (
    <>
      {hasSidnav ? (
        <div className="flex">
          <div className="min-h-screen">
            <AdminSideNav />
          </div>
          <div className="flex-1 min-h-screen overflow-x-hidden">
            <AdminMainNav />
            <div className="dashboard-content overflow-y-auto bg-[#fafafa] px-5 py-8">
              <Outlet />
            </div>
          </div>
        </div>
      ) : !hasHeaderFooter ? (
        <>
          <HeaderSection />
          <div className="xl:!pt-20 lg:!pt-18 md:!pt-16 !pt-14 w-full flex-1">
            <Outlet />
          </div>
          <FooterSection />
        </>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
      <div className="  fixed z-50 right-5 bottom-5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="  "
        >
          <img src={whatsappIcon} alt="WhatsApp" className="h-16 w-16 " />
        </a>
      </div>
    </>
  );
};
export default Layout;
