import React, { useEffect } from "react";
import { useState } from "react";
import rightArrow from "../assets/customWoodPage/rightArrow.svg";
import ShoppingCart from "../components/CartSections/ShoppingCart";
import CheckoutDetail from "../components/CartSections/CheckoutDetail";
import OrderComplete from "../components/CartSections/OrderComplete";
import check from "../assets/addToCart/check.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCart } from "../redux/actions/orderActions";
import { axiosWithCredentials } from "../providers";
import { useSelector } from "react-redux";

export const AddToCart = () => {
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState.isLoggedIn;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const orderCompleteData = {
    hasResponse: searchParams.has("response"),
    response: searchParams.get("response") === "True",
    orderId: searchParams.get("order_id"),
    orderDate: searchParams.get("date"),
    paymentMethod: searchParams.get("payment-method"),
    orderAmount: searchParams.get("amount"),
  };

  const [selectedDiv, setSelectedDiv] = useState({
    firstTab: !orderCompleteData.response,
    secondTab: false,
    thirdTab: orderCompleteData.hasResponse,
  });

  const [selectedTab, setSelectedTab] = useState(
    orderCompleteData.hasResponse ? "thirdTab" : "firstTab"
  );

  const [state, setState] = useState({
    cartData: [],
    tax: 0,
    deliveryFee: 0,
  });
  useEffect(() => {
    if (orderCompleteData.hasResponse) {
      setSelectedTab("thirdTab");
      setSelectedDiv({
        firstTab: true,
        secondTab: true,
        thirdTab: true,
      });
    } else if (selectedTab === "thirdTab") {
      // If somehow user got to third tab without response, redirect back
      setSelectedTab("firstTab");
      setSelectedDiv({
        firstTab: true,
        secondTab: false,
        thirdTab: false,
      });
    }
  }, [orderCompleteData.hasResponse, selectedTab]);

  useEffect(() => {
    if (orderCompleteData.hasResponse) {
      setSelectedTab("thirdTab");
      setSelectedDiv({
        firstTab: true,
        secondTab: true,
        thirdTab: true,
      });
    }
  }, [orderCompleteData.hasResponse]);

  const tabs = [
    {
      id: 1,
      image: check,
      name: "firstTab",
      label: "Shopping cart",
      bgColor: "primary",
      textColor: "white",
    },
    {
      id: 2,
      image: check,
      name: "secondTab",
      label: "Checkout details",
      bgColor: "primary",
      textColor: "secondary",
    },
    {
      id: 3,
      image: check,
      name: "thirdTab",
      label: "Order complete",
      bgColor: "primary",
      textColor: "secondary",
    },
  ];

  const handleDivClick = (tab) => {
    // if (orderCompleteData.response) return;
    // If we have a completed order response, block all tab changes
    if (orderCompleteData.hasResponse) return;

    // If trying to go to third tab without response, block it
    if (tab === "thirdTab" && !orderCompleteData.hasResponse) return;
    if (tab === "secondTab" && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setSelectedTab(tab);
    setSelectedDiv((prev) => {
      const newSelectedDiv = { ...prev };

      if (tab === "firstTab") {
        return {
          firstTab: true,
          secondTab: false,
          thirdTab: false,
        };
      } else if (tab === "secondTab") {
        return {
          firstTab: true,
          secondTab: true,
          thirdTab: false,
        };
      }
      return {
        firstTab: true,
        secondTab: true,
        thirdTab: true,
      };
    });
  };

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setState((prev) => ({
        ...prev,
        cartData: res,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getTaxDelivery = async () => {
    try {
      const response = await axiosWithCredentials.get(`/get-tax-delivery/`);
      setState((prev) => ({
        ...prev,
        tax: response.data?.vat,
        deliveryFee: response?.data?.delivery_fee,
      }));
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getTaxDelivery();
      fetchCart();
    }
  }, [isAuthenticated]);

  // if (!isAuthenticated) {
  //   return (
  //     <div className="flex justify-center items-center h-60 w-full">
  //       <div className="flex gap-1 items-center">
  //         <span> Please sign-in to view the items in your cart.</span>
  //         <button
  //           className="bg-[#FBC700] text-[#161922] p-2 rounded-md"
  //           onClick={() => navigate("/sign-in")}
  //         >
  //           Sign-in
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <section className="xl:px-[100px] lg:px-[60px] md:px-[40px] px-[20px] mt-2 bg-[#F4F5F7]">
        <div className="flex items-center gap-[24px] pt-3">
          <div className="gap-x-6 flex items-center xl:py-[20px] lg:py-[20px] md-[20px] py-[12px]">
            <h5 className="text-[#9F9F9F] xl:text-16 lg:text-15 md:text-14 text-[13px]">
              <a className="cursor-pointer" onClick={() => navigate("/")}>
                Home
              </a>
            </h5>
            <div>
              <img
                src={rightArrow}
                className="xl:w-[20px] lg:w-[18px] w-[15px]"
                alt="Right arrow"
              />
            </div>
          </div>
          <div className="gap-x-6 flex items-center xl:py-[20px] lg:py-[20px] md-[20px] py-[12px]">
            <h5 className="text-[#9F9F9F] xl:text-16 lg:text-15 md:text-14 text-[13px]">
              <a
                className="cursor-pointer"
                onClick={() => navigate("/shop-page")}
              >
                Shop
              </a>
            </h5>
            <div>
              <img
                src={rightArrow}
                className="xl:w-[20px] lg:w-[18px] w-[15px]"
                alt="Right arrow"
              />
            </div>
          </div>
          <div className="gap-x-6 flex items-center xl:py-[20px] lg:py-[20px] md-[20px] py-[12px]">
            <h5 className="bcCartLink flex items-center xl:text-16 lg:text-15 md:text-14 text-[13px]">
              Cart
            </h5>
          </div>
        </div>
      </section>
      <section className="xl:pt-[20px] lg:pt-[20px] md:pt-[20px] pt-[15px] flex justify-center">
        <div className="font-medium xl:text-54 lg:text-50 md:text-46 sm:text-44 text-40">
          Cart
        </div>
      </section>

      <section className="flex-center flex-col">
        <section className="flex-center xs:px-[10px] xs:w-full xs:gap-[10px] gap-x-4 sm:gap-x-2 xs:gap-x-2 xl:mt-[40px] lg:mt-[30px] md:mt-[20px] sm:mt-[20px] xs:mt-[10px] xl:mb-[80px] lg:mb-[60px] md:mb-[40px] mb-[20px]">
          {tabs.map((tab, idx) => (
            <div
              key={tab.name}
              className={`4xll:gap-x-16 4xl:gap-x-14 3xll:gap-x-12 3xl:gap-x-10 2xll:gap-x-8 2xl:gap-x-6 flex-center gap-x-4 xs:flex-col sm:flex-col md:flex-col xs:w-[33%] xs:items-center xs:justify-center md:gap-[12px] sm:gap-[12px] xs:gap-[12px] cursor-pointer ${
                orderCompleteData.hasResponse
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
              onClick={() => handleDivClick(tab.name)}
            >
              <div
                className={`${
                  selectedDiv[tab.name]
                    ? "bg-[#38CB89] border rounded-full text-white"
                    : "bg-[#B1B5C3] text-white"
                } border rounded-full h-[45px] w-[45px] px-4 text-center pt-2 text-22 sm:text-14 xs:text-14 cursor-pointer`}
              >
                {selectedDiv[tab.name] ? (
                  <img
                    src={tab.image}
                    className="w-[11px] h-[33px]"
                    style={{ objectFit: "none" }}
                    alt="Checkmark"
                  />
                ) : (
                  <div>{idx + 1}</div>
                )}
              </div>
              <div className="4xll:text-65 4xl:text-60 3xll:text-56 3xl:text-50 2xll:text-46 2xl:text-32 text-20 sm:text-[13px] xs:text-[13px] xs:text-center font-bold">
                {tab.label}
              </div>

              {idx !== tabs.length - 1 && (
                <div className="border-b w-[40px] sm:w-[40px] xs:hidden sm:hidden md:hidden"></div>
              )}
            </div>
          ))}
        </section>

        {selectedTab === "firstTab" ? (
          <ShoppingCart
            cartData={state?.cartData}
            fetchCart={fetchCart}
            taxData={state?.tax}
            delivery={state?.deliveryFee}
            handleDivClick={handleDivClick}
          />
        ) : selectedTab === "secondTab" ? (
          <CheckoutDetail
            handleDivClick={handleDivClick}
            cartData={state?.cartData}
            fetchCart={fetchCart}
            taxData={state?.tax}
            delivery={state?.deliveryFee}
          />
        ) : (
          <OrderComplete
            response={orderCompleteData.response}
            orderId={orderCompleteData.orderId}
            orderDate={orderCompleteData.orderDate}
            paymentMethod={orderCompleteData.paymentMethod}
            orderAmount={orderCompleteData.orderAmount}
            handleClick={() => navigate("/")}
          />
        )}
      </section>
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Login Required</h2>
            <p className="mb-4">You need to sign in to proceed to checkout.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#FBC700] text-[#161922] py-2 px-4 rounded"
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/sign-in");
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
