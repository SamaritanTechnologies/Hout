import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderSection from "../Home/HeaderSection";
import FooterSection from "../Home/FooterSection";
import AdminSideNav from "../AdminLayout/AdminSideNav";
import AdminMainNav from "../AdminLayout/AdminMainNav";
import { WhatsappWidget } from "./WhatsappWidget";

const Layout = () => {
  const authPaths = [
    // "/sign-in",
    // "/sign-up",
    // "/forget-password",
    // "/reset-password",
    "/oauth-callback",
  ];

  const adminPaths = [
    "/dashboard",
    "/vat-value",
    "/add-coupon",
    "/products",
    "/orders",
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
    "/delivery",
    // "/inbox",
    "/order-list",
    "/product",
    "/user-profile",
    "/customized-product",
    "/admin-webshop",
    "/admin-signin",
    "/admin-signup",
    "/admin-forgot",
    "/admin-reset",
    "/admin-payment",
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

      <WhatsappWidget />
    </>
  );
};
export default Layout;
