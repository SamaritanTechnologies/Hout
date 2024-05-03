import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import houtLogo from "../../assets/authImages/houtLogo.svg";

const AdminSidenav = () => {
  
  const navigate = useNavigate();
  const location = useLocation()

  const [navs, setNavs] = useState([
    { name: "Dashboard", link: "/dashboard/", active: true },
    { name: "Products", link: "/products/", active: false },
    { name: "Inbox", link: "/inbox/", active: false },
    { name: "Order List", link: "/order-list/", active: false },
  ]);

  useEffect(() => {
    setNavs(prevNavs => (
      prevNavs.map(subItem => ({
        ...subItem,
        active: location.pathname.includes(subItem.link.split('/')[1])
      }))
    ));
  },[])

  const handleClick = (item) => {
    setNavs(prevNavs => (
      prevNavs.map(subItem => ({
        ...subItem,
        active: subItem.name === item.name
      }))
    ));
  };

  return (
    <section className="">
      <div className="xl:w-[240px] lg:w-[220px] w-[200px] min-h-screen xl:py-[13px] py-[10px]">
        <a href="#" className="mb-[22px] block px-[24px]">
          <img
            src={houtLogo}
            alt=""
            className="xl:w-[160px] xl:h-[46px] lg:w-[135px] lg:h-[40px] w-[120px] h-[36px] mx-auto object-cover	"
          />
        </a>
        <div className="flex flex-col items-start sideBarMain xl:px-[24px] lg:px-[20px] px-[16px]">
          {navs.map((item) => {
            return (
              <a
                key={item.link}
                className={`h-[43px] text-14 font-medium cursor-pointer ${item.active ? 'sideActive' : ''}`}
                onClick={() => {
                  handleClick(item)
                  navigate(item.link);
                }}
              >
                {item.name}
              </a>
            );
          })}

          {/* <a
            className="h-[43px] text-14 font-medium"
            onClick={handleProductsClick}
          >
            Products
          </a>
          <a
            className="h-[43px] text-14 font-medium"
            onClick={handleInboxClick}
          >
            Inbox
          </a>
          <a
            className="h-[43px] text-14 font-medium"
            onClick={handleOrderListClick}
          >
            Order Lists
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default AdminSidenav;
