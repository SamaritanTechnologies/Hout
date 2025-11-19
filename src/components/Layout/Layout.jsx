import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderSection from "../Home/HeaderSection";
import FooterSection from "../Home/FooterSection";
import AdminSideNav from "../AdminLayout/AdminSideNav";
import AdminMainNav from "../AdminLayout/AdminMainNav";
import { WhatsappWidget } from "./WhatsappWidget";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
        <div className="flex relative">
          {/* Overlay for mobile when sidebar is open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className={`min-h-screen transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:static fixed z-50`}>
            <AdminSideNav 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
          <div className="flex-1 min-h-screen overflow-x-hidden w-full lg:w-auto">
            <AdminMainNav 
              setSidebarOpen={setSidebarOpen}
            />
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
