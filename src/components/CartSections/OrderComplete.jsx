import React from "react";
import smallVideo from "../../assets/addToCart/smallVideo.svg";
import Button from "../Common/Button";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const OrderComplete = ({
  response,
  orderId,
  orderDate,
  paymentMethod,
  orderAmount,
  handleClick,
}) => {
  const navigate = useNavigate();
  const formattedOrderDate = moment(
    orderDate,
    "YYYY-MM-DDTHH:mm:ss ZZ"
  ).isValid()
    ? moment(orderDate, "YYYY-MM-DDTHH:mm:ss ZZ").format("MMMM DD, YYYY")
    : "Invalid Date";

  console.log("response", response);
  console.log("paymentMethod", paymentMethod);
  console.log("orderAmount", orderAmount);
  return (
    <>
      <section className="rounded-md xl:mx-[351px] lg:mx-[280px] md:mx-[210px] mx-[160px] shadow-2xl xl:mb-[130px] lg:mb-[100px] mb-[100px]">
        {response ? (
          <div className="xl:px-[95px] lg:px-[50px] md:px-[30px] px-[15px]">
            <div className="xl:pt-[80px] lg:pt-[60px] md:pt-[30px] pt-[20px] text-center xl:text-28 lg:text-26 md:text-24 text-22 text-[#6C7275]">
              Thank you! &#127881;
            </div>
            <div className="xl:text-40 lg:text-36 md:text-32 text-24 font-medium text-center pt-4">
              Your order has been received
            </div>
            <div className="xl:pt-[40px] lg:pt-[30px] pt-[10px] flex justify-center">
              <img src={smallVideo} alt="Order complete" />
            </div>

            <div className="flex space-x-[148px] xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
              <div className="text-[#6C7275] text-14 font-semibold">
                Order code:
              </div>
              <div className="text-14 font-semibold text-left">{orderId}</div>
            </div>
            <div className="flex space-x-48 xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
              <div className="text-[#6C7275] text-14 font-semibold">Date:</div>
              <div className="text-14 font-semibold text-left">
                {formattedOrderDate}
              </div>
            </div>
            <div className="flex space-x-48 xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
              <div className="text-[#6C7275] text-14 font-semibold">Total:</div>
              <div className="text-14 font-semibold text-left">
                €{orderAmount}
              </div>
            </div>
            <div className="flex space-x-28 xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
              <div className="text-[#6C7275] text-14 font-semibold">
                Payment method:
              </div>
              <div className="text-14 font-semibold text-left">
                {paymentMethod}
              </div>
            </div>
            <div className="flex space-x-16 xl:px-[80px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
              <div className="text-[#6C7275] text-14 font-semibold">
                Estimated Delivery Time:
              </div>
              <div className="text-14 font-semibold text-left">5 days</div>
            </div>

            <div className="pt-[20px] flex justify-center pb-[80px]">
              <Button
                btnText="Back to Home"
                breakpoint="w-[323px]"
                onClick={handleClick}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center  bg-white p-4">
              <div className="w-full max-w-md rounded-2xl border-4 border-[#FBD232] p-8 flex flex-col items-center text-center">
                <div className="mb-6">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42 32C42 37.52 37.52 42 32 42C26.48 42 22 37.52 22 32C22 26.48 26.48 22 32 22C37.52 22 42 26.48 42 32Z"
                      fill="url(#gradient1)"
                    />
                    <path
                      d="M54 18L42 18M42 18V30M42 18L54 6"
                      stroke="url(#gradient2)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 42H42V54C42 56.2091 40.2091 58 38 58H26C23.7909 58 22 56.2091 22 54V42Z"
                      stroke="url(#gradient2)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient1"
                        x1="22"
                        y1="22"
                        x2="42"
                        y2="42"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FBD232" />
                        <stop offset="1" stopColor="#E9B800" />
                      </linearGradient>
                      <linearGradient
                        id="gradient2"
                        x1="22"
                        y1="6"
                        x2="54"
                        y2="58"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FBD232" />
                        <stop offset="1" stopColor="#E9B800" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Transaction Failed
                </h2>

                <p className="text-gray-600 mb-8">
                  Something went wrong. Please try again. If the problem
                  persists, contact our{" "}
                  <Link href="#" className="text-[#E9B800] hover:underline">
                    Support Team
                  </Link>
                  .
                </p>

                <button
                  className="w-full py-3 px-4 bg-[#FBD232] hover:bg-[#E9B800] text-white font-medium rounded-md transition-opacity"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default OrderComplete;
