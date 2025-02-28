import React, { useEffect, useState } from "react";
import HeaderSection from "../Home/HeaderSection";
import FooterSection from "../Home/FooterSection";
import AdminSideNav from "../AdminLayout/AdminSideNav";
import AdminMainNav from "../AdminLayout/AdminMainNav";
import { Outlet, useLocation } from "react-router-dom";
const Layout = () => {
  const authPaths = [
    "/sign-in",
    "/sign-up",
    "/forget-password",
    "/reset-password",
  ];
  const adminPaths = [
    "/dashboard",
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
  const hasSidnav = adminPaths.map((item, index) => {
    let splittedRoute = item.split("/")[1];
    if (currentPath === splittedRoute || currentPath.includes(splittedRoute)) {
      return true;
    } else {
      return false;
    }
  });
  const hasHeaderFooter = authPaths.includes(currentPath);

  return (
    <>
      {hasSidnav.includes(true) ? (
        <>
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
        </>
      ) : (
        <>
          {!hasHeaderFooter ? (
            <>
              <HeaderSection />
              <div className=" xl:!pt-20 lg:!pt-18 md:!pt-16 !pt-14 w-full flex-1 ">
                <Outlet />
              </div>
              <FooterSection />
            </>
          ) : (
            <>
              <div className="">
                <Outlet />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Layout;
