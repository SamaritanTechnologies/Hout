import React, { useEffect, useState } from "react";
import smallVideo from "../../assets/addToCart/smallVideo.svg";
import Button from "../Common/Button";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDeliveryFee } from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCart, setCartItems } from "../../redux/slices/cartSlice";
import { useTranslation } from "react-i18next";
import { getCart } from "../../redux/actions/orderActions";

const OrderComplete = ({
  response,
  orderId,
  orderDate,
  paymentMethod,
  orderAmount,
  handleClick,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);

  const urlDate = searchParams.get("date");
  const formattedEstimateDate =
    urlDate && moment(urlDate.split("T")[0]).isValid()
      ? moment(urlDate.split("T")[0]).format("MMMM DD, YYYY")
      : null;

  useEffect(() => {
    const fetchEstimateDay = async () => {
      try {
        const response = await getDeliveryFee();
        if (response) {
          setData(response);
        }
      } catch (error) {
        toast.error("Failed to fetch estimate days.");
      }
    };
    fetchEstimateDay();
  }, []);

  useEffect(() => {
    if (response) {
      const timeoutId = setTimeout(() => {
        const fetchCart = async () => {
          const res = await getCart();
          dispatch(setCartItems(res.cart_items));
        };
        fetchCart();
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [response]);

  // Use url date if present, otherwise fallback to API/default
  const estimatedDelivery = data?.time_estimate || "5 days";
  const isEstimateDateFromUrl = Boolean(formattedEstimateDate);

  return (
    <section className="rounded-md xl:mx-[351px] lg:mx-[280px] md:mx-[210px] mx-[160px] shadow-2xl xl:mb-[130px] lg:mb-[100px] mb-[100px]">
      {response ? (
        <div className="xl:px-[95px] lg:px-[50px] md:px-[30px] px-[15px]">
          <div className="xl:pt-[80px] lg:pt-[60px] md:pt-[30px] pt-[20px] text-center xl:text-28 lg:text-26 md:text-24 text-22 text-[#6C7275]">
            {t("c_thank_you_message")}
          </div>
          <div className="xl:text-40 lg:text-36 md:text-32 text-24 font-medium text-center pt-4">
            {t("c_order_confirmed_message")}
          </div>
          <div className="xl:pt-[40px] lg:pt-[30px] pt-[10px] flex justify-center">
            <img src={smallVideo} alt={t("c_order_complete_image_alt")} />
          </div>

          <div className="flex justify-between xl:px-[40px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">
              {t("c_order_code_label")}
            </div>
            <div className="text-14 font-semibold text-left w-32">
              {orderId}
            </div>
          </div>

          <div className="flex  justify-between xl:px-[40px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">
              {t("c_order_date_label")}
            </div>
            <div className="text-14 font-semibold text-left w-32">
              {formattedEstimateDate}
            </div>
          </div>

          <div className="flex justify-between xl:px-[40px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">
              {t("c_order_total_label")}
            </div>
            <div className="text-14 font-semibold text-left w-32">
              €{orderAmount}
            </div>
          </div>

          <div className="flex justify-between xl:px-[40px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">
              {t("c_payment_method_label")}
            </div>
            <div className="text-14 font-semibold text-left w-32">
              {paymentMethod}
            </div>
          </div>

          <div className="flex justify-between xl:px-[40px] lg:px-[50px] md:px-[30px] px-[15px] items-center pt-5">
            <div className="text-[#6C7275] text-14 font-semibold">
              {t("c_estimated_delivery_label")}
            </div>
            <div className="text-14 font-semibold text-left w-32">
              {estimatedDelivery}
            </div>
          </div>

          <div className="pt-[20px] flex justify-center pb-[80px]">
            <Button
              btnText={t("c_back_to_home_button")}
              breakpoint="w-[323px]"
              onClick={handleClick}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md rounded-2xl border-4 border-[#FBD232] p-8 flex flex-col items-center text-center">
            <div className="mb-6">
              {/* SVG for error */}
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
              {t("c_transaction_failed_title")}
            </h2>

            <p className="text-gray-600 mb-8">
              {t("c_transaction_failed_description")}{" "}
              <span className="text-[#E9B800] font-medium">
                {t("c_transaction_failed_support_team")}
              </span>
              .
            </p>

            <button
              className="w-full py-3 px-4 bg-[#FBD232] hover:bg-[#E9B800] text-white font-medium rounded-md transition-opacity"
              onClick={() => navigate("/")}
            >
              {t("c_transaction_failed_button")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderComplete;
