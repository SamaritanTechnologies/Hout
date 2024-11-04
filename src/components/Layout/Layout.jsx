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
    "/dashboard/",
    // "/inbox/",
    "/order-list/",
    "/products/",
    "/user-profile/",
    "/new-product/",
    "/customized-product/",
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
      <div>
        <div>
          {hasSidnav.includes(true) ? (
            <>
              <div className="flex">
                <div className="min-h-screen">
                  <AdminSideNav />
                </div>
                <div className="flex-1 min-h-screen ">
                  <AdminMainNav />
                  <div className="!pt-2">
                    <Outlet />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {!hasHeaderFooter ? (
                <div className="">
                  <div className="">
                    <HeaderSection />
                    <div className=" xl:!pt-20 lg:!pt-18 md:!pt-16 !pt-14 w-full flex-1 ">
                      <Outlet />
                    </div>
                    <FooterSection />
                  </div>
                </div>
              ) : (
                <>
                  <div className="">
                    <Outlet />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Layout;
