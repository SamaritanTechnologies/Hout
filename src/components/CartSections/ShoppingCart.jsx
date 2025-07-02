import React, { useCallback, useEffect, useRef, useState } from "react";
import cross from "../../assets/addToCart/cross.svg";
import coupon from "../../assets/addToCart/coupon.svg";
import plus from "../../assets/addToCart/plus.svg";
import minus from "../../assets/addToCart/minus.svg";
import { debounce } from "lodash";
import { deleteCartItem, getCart } from "../../redux/actions/orderActions";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import { getLoggedInUser } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { setCartSummaryData } from "../../redux/slices/totalSummarySlice";
import { useTranslation } from "react-i18next";

const ShoppingCart = ({
  cartData,
  fetchCart,
  taxData = 0.0,
  delivery = 0,
  handleDivClick,
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState.isLoggedIn;
  const userId = authState?.user?.id;
  const [localCart, setLocalCart] = useState([]);
  const [paymentOption, setPaymentOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [error, setError] = useState(null);
  const user = getLoggedInUser();
  const [cartItem, setCartItem] = useState(cartData?.cart_items || []);
  const [updatedItem, setUpdatedItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("delivery");

  useEffect(() => {
    setCartItem(cartData?.cart_items || []);
  }, [cartData]);

  const loadLocalCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCart(storedCart);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loadLocalCart();
      window.addEventListener("localCartUpdated", loadLocalCart);
      return () => {
        window.removeEventListener("localCartUpdated", loadLocalCart);
      };
    }
  }, [dispatch, isAuthenticated]);

  const updateQuantity = async ({ id, productId, price, newQuantity }) => {
    try {
      const payload = {
        cart: user?.card_id,
        user: user?.user_id,
        product: productId,
        quantity: newQuantity,
        product_price: price,
      };
      await axiosWithCredentials.put(`/change-quantity/${id}/`, payload);
      fetchCart();
      const res = await getCart();
      dispatch(setCartItems(res.cart_items));
    } catch (error) {
      let errorMessage = "Something went wrong!";

      if (error.response?.data?.product?.length) {
        errorMessage = error.response.data.product[0];
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      fetchCart();
      toast.error(errorMessage);
    }
  };

  const debouncedUpdateQuantity = useCallback(
    debounce((item) => updateQuantity(item), 500),
    []
  );

  useEffect(() => {
    if (updatedItem) {
      debouncedUpdateQuantity(updatedItem);
    }
  }, [updatedItem]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const res = await axiosWithCredentials.get(
          `/accounts/payment-options/${userId}/`
        );
        setPaymentOption(res.data);
        // Auto-select if only one payment method is available
        if (res.data.cash_payment && !res.data.credit_card) {
          setSelectedOption("cash");
        } else if (!res.data.cash_payment && res.data.credit_card) {
          setSelectedOption("credit");
        }
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };

    fetchPaymentOptions();
  }, []);
  const handleIncrement = (id) => {
    const item = cartItem?.find((item) => item.id === id);
    if (item) {
      const newQuantity = item.quantity + 1;
      setCartItem((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      setUpdatedItem({
        id,
        productId: item.product?.id,
        price: item.product_price,
        newQuantity,
      });
    }
  };

  const handleDecrement = (id) => {
    const item = cartItem?.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      setCartItem((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      setUpdatedItem({
        id,
        productId: item.product?.id,
        price: item.product_price,
        newQuantity,
      });
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id);
      fetchCart();
      const res = await getCart();
      dispatch(setCartItems(res.cart_items));
    } catch (error) {
      toast.error(t("sc_remove_fail"));
    }
  };

  const totalPrice = cartItem.reduce(
    (sum, item) => sum + parseFloat(item.product_price),
    0
  );

  const calculateTotal = (
    totalPrice,
    delivery,
    taxPercentage,
    coupon = null
  ) => {
    console.log("taxPercentage", taxPercentage);
    let deliveryCharge = 0;
    const numericTotalPrice = Number(totalPrice || 0);

    if (selectedMethod !== "pickup") {
      if (numericTotalPrice < 750) {
        deliveryCharge = Number(delivery?.upto_750 || 0);
      } else if (numericTotalPrice >= 750 && numericTotalPrice <= 1500) {
        deliveryCharge = Number(delivery?.from_750_to_1500 || 0);
      } else {
        deliveryCharge = Number(delivery?.above_1500 || 0);
      }
    } else {
      deliveryCharge = 0;
    }

    const subtotal = numericTotalPrice + deliveryCharge;
    let discountAmount = 0;
    let isMinimumOrderMet = true;

    if (coupon && subtotal >= Number(coupon.minimum_order_amount)) {
      if (coupon.discount_type === "percentage") {
        discountAmount = subtotal * (Number(coupon.discount_value) / 100);
      } else if (coupon.discount_type === "fixed") {
        discountAmount = Number(coupon.discount_value);
      }
    } else if (coupon) {
      isMinimumOrderMet = false;
    }

    const amountAfterDiscount = subtotal - discountAmount;
    const taxRate = Number(taxPercentage || 0);
    let taxAmount = 0;
    let totalWithTax = amountAfterDiscount;
    if (taxRate > 0) {
      taxAmount = amountAfterDiscount * (taxRate / 100);
      totalWithTax = amountAfterDiscount + taxAmount;
    }

    return {
      total: totalWithTax,
      discount: discountAmount,
      subtotal: subtotal,
      isMinimumOrderMet,
      deliveryCharge,
      taxAmount,
    };
  };

  const {
    total,
    discount,
    deliveryCharge,
    subtotal,
    isMinimumOrderMet,
    taxAmount,
  } = calculateTotal(totalPrice, delivery, taxData, couponData);

  useEffect(() => {
    dispatch(
      setCartSummaryData({
        subtotal: Number(totalPrice || 0).toFixed(2),
        deliveryFee: deliveryCharge,
        tax: Number(taxData || 0).toFixed(2),
        youSaved: discount.toFixed(2),
        total: total?.toFixed(2),
        order_status: selectedMethod,
        payment_option: selectedOption,
      })
    );
  }, [
    selectedMethod,
    selectedOption,
    totalPrice,
    deliveryCharge,
    taxData,
    discount,
    total,
    dispatch,
  ]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosWithCredentials.get(
        `coupons/by-code/?code=${encodeURIComponent(couponCode)}`
      );
      if (response?.data?.is_active) {
        setCouponData(response?.data);
        toast.success(t("sc_coupon_applied_success"));
      } else {
        setCouponData(null);
        setError(t("sc_coupon_not_active"));
        toast.error(t("sc_coupon_not_active"));
      }
    } catch (err) {
      setCouponData(null);
      setError(err.response?.data?.message || t("sc_coupon_invalid"));
      toast.error(err.response?.data?.message || t("sc_coupon_invalid"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponData(null);
    setCouponCode("");
    setError(null);
  };

  const handleLocalIncrement = (id) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = storedCart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: (item.quantity || 0) + 1,
        };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localCartUpdated"));
  };

  const handleLocalDecrement = (id) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = storedCart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: (item.quantity || 0) - 1,
        };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localCartUpdated"));
  };

  const handleLocalRemove = (id) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = storedCart.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localCartUpdated"));
  };

  const cartTotal = localCart?.reduce((acc, item) => {
    const price = Number(item?.discounted_price_ex_vat || 0);
    const quantity = Number(item?.quantity || 0);
    return acc + price * quantity;
  }, 0);

  const handleMethod = (e) => {
    const { value, checked } = e.target;
    setSelectedMethod(checked ? value : "");
  };

  const handleOption = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
  };

  const handleCheckout = () => {
    // Check if at least one payment method is available
    if (!paymentOption?.cash_payment && !paymentOption?.credit_card) {
      toast.warn(t("sc_payment_admin_required"));
      return;
    }

    if (!selectedOption) {
      toast.warn(t("sc_payment_option_required"));
      return;
    }
    handleDivClick("secondTab");
  };

  return (
    <>
      <section className="w-full flex xl:gap-[40px] lg:gap-[30px] md:gap-[20px] gap-[10px] justify-between xl:px-[135px] lg:px-[80px] px-[20px]  xl:pb-[100px] lg:pb-[70px] md:pb-[80px] pb-[70px] md:flex-col sm:flex-col xs:flex-col">
        {isAuthenticated ? (
          cartItem?.length > 0 ? (
            <>
              <section className="flex-1">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-[1px] border-[#979797]">
                        <th className="text-left xl:text-18 lg:text-16 text-14 xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                          {t("s_table_header_product")}
                        </th>
                        <th className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                          {t("s_table_header_quantity")}
                        </th>
                        <th className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                          {t("s_table_header_price")}
                        </th>
                        <th className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                          {t("s_table_header_subtotal")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItem?.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                              <section className="flex items-center gap-x-2 pt-5 xs:min-w-[300px]">
                                <a
                                  href="#"
                                  className="shrink-0"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemove(item?.id);
                                  }}
                                >
                                  <img src={cross} alt="remove" />
                                </a>
                                <div>
                                  <img
                                    onClick={() =>
                                      navigate(
                                        `/product-detail/${item?.product_length?.product.id}`
                                      )
                                    }
                                    src={item?.product_length?.product.image}
                                    className="cursor-pointer xl:w-[80px] xl:h-[96px] lg:w-[70px] lg:h-[80px] min-w-[60px] min-h-[60px] xs:w-[60px] xs:h-[60px]"
                                    alt={item.name}
                                  />
                                </div>
                                <div className="flex flex-col xl:min-w-[220px]">
                                  <div
                                    className="cursor-pointer xl:text-18 lg:text-16 text-14"
                                    onClick={() =>
                                      navigate(
                                        `/product-detail/${item?.product_length?.product.id}`
                                      )
                                    }
                                  >
                                    {currentLang === "en"
                                      ? item?.product_length?.product.name_en
                                      : item?.product_length?.product.name_nl}
                                  </div>
                                  <div className="flex gap-[15px] items-center">
                                    <div>
                                      <div className="text-12 text-[#24242480] font-medium">
                                        {t("s_thickness_label")}
                                      </div>
                                      <div className="xl:text-14 text-[13px]">
                                        {
                                          item?.product_length?.product
                                            .thickness
                                        }
                                        mm
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-12 text-[#24242480] font-medium">
                                        {t("s_width_label")}
                                      </div>
                                      <div className="xl:text-14 text-[13px]">
                                        {item?.product_length?.product.width} mm
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-12 text-[#24242480] font-medium">
                                        {t("s_length_label")}
                                      </div>
                                      <div className="xl:text-14 text-[13px]">
                                        {item?.product_length?.length} mm
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </td>
                            <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                              <div className="flex justify-between border items-center px-[10px] py-[6px] rounded-md xs:min-w-[80px]">
                                <div>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDecrement(item?.id);
                                    }}
                                  >
                                    <img src={minus} alt="decrement" />
                                  </a>
                                </div>
                                <h6>{item?.quantity}</h6>
                                <div>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleIncrement(item?.id);
                                    }}
                                  >
                                    <img src={plus} alt="increment" />
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                              € {item?.product_length?.discounted_price_ex_vat}
                            </td>
                            <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                              € {item?.product_price}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <section>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Select a delivery method
                    </h2>
                    <div className="flex gap-7">
                      <label className="block">
                        <input
                          className="h-4 w-4 cursor-pointer"
                          type="checkbox"
                          value="delivery"
                          checked={selectedMethod === "delivery"}
                          onChange={handleMethod}
                        />
                        <span className="ml-2 text">Delivery</span>
                      </label>
                      <label className="block">
                        <input
                          className="h-4 w-4 cursor-pointer"
                          type="checkbox"
                          value="pickup"
                          checked={selectedMethod === "pickup"}
                          onChange={handleMethod}
                        />
                        <span className="ml-2">Pick Up</span>
                      </label>
                    </div>
                  </div>
                </section>

                {(paymentOption?.cash_payment ||
                  paymentOption?.credit_card) && (
                  <section>
                    <div className="py-8">
                      <h2 className="text-2xl font-semibold mb-2">
                        Select a Payment options
                      </h2>
                      <div className="flex gap-7">
                        {paymentOption?.credit_card && (
                          <label className="block">
                            <input
                              className="h-4 w-4 cursor-pointer"
                              type="checkbox"
                              value="credit"
                              checked={selectedOption === "credit"}
                              onChange={handleOption}
                            />
                            <span className="ml-2">Credit</span>
                          </label>
                        )}
                        {paymentOption?.cash_payment && (
                          <label className="block">
                            <input
                              className="h-4 w-4 cursor-pointer"
                              type="checkbox"
                              value="cash"
                              checked={selectedOption === "cash"}
                              onChange={handleOption}
                            />
                            <span className="ml-2">Cash</span>
                          </label>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                <section className="pt-[30px]">
                  <div>
                    <h6 className="xl:text-16 lg:text-14 text-[13px]">
                      {t("s_have_coupon_text")}
                    </h6>
                  </div>
                  <div className="pt-2">
                    <p className="xl:text-16 lg:text-14 text-[13px] text-[#6C7275]">
                      {t("s_add_code_text")}
                    </p>
                  </div>

                  {couponData ? (
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-md mt-3">
                      <div className="flex items-center">
                        <span className="text-green-700 font-medium">
                          {/* {couponData.code} applied ({couponData.discount_value}
                          {couponData.discount_type === "percentage"
                            ? "%"
                            : "€"}{" "}
                          off) */}
                          {t("s_coupon_applied_text", {
                            code: couponData.code,
                            discount_value: couponData.discount_value,
                            discount_type:
                              couponData.discount_type === "percentage"
                                ? "%"
                                : "€",
                          })}
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="cursor-pointer p-4 bg-[#FBC700] rounded-md rounded-l-none hover:bg-[#e6b800] transition-colors"
                      >
                        {t("s_remove_button")}
                      </button>
                    </div>
                  ) : (
                    <div className="flex border border-[#6C727580] justify-between items-center rounded-[10px] flex-1 xl:w-[442px] w-[100%] pl-3 mt-3">
                      <div className="flex gap-x-2 xl:py-[14px] lg:py-[12px] py-[8px] items-center">
                        <img src={coupon} alt="Coupon icon" />
                        <input
                          type="text"
                          className="outline-none border-none bg-transparent w-full text-[#6C7275] placeholder-[#6C7275]"
                          placeholder={t("s_enter_coupon_placeholder")}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                      </div>
                      <button
                        className="cursor-pointer p-4 bg-[#FBC700] rounded-md rounded-l-none hover:bg-[#e6b800] transition-colors"
                        onClick={handleApplyCoupon}
                        disabled={isLoading}
                      >
                        {isLoading
                          ? t("s_applying_button")
                          : t("s_apply_button")}
                      </button>
                    </div>
                  )}
                  {error && !couponData && (
                    <div className="text-rose-500 mt-2">{error}</div>
                  )}
                  {couponData && !isMinimumOrderMet && (
                    <div className="text-amber-600 mt-2">
                      {t("s_add_more_for_coupon", {
                        amount: (
                          couponData.minimum_order_amount - subtotal
                        ).toFixed(2),
                      })}
                    </div>
                  )}
                </section>
              </section>

              {/* Right side of grid  */}
              <section className="xl:w-[38.2%] lg:w-[38.2%] bg-[#F8F8F8] xl:px-[32px] lg:px-[25px] md:px-[20px] px-[12px] xl:pt-[44px] lg:pt-[30px] pt-[15px] rounded-lg">
                <section>
                  <section className="flex justify-between">
                    <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                      {t("s_subtotal_excl_vat")}
                    </div>
                    <div>€ {Number(totalPrice || 0).toFixed(2)}</div>
                  </section>

                  <section className="flex justify-between pt-[25px]">
                    <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                      {t("s_delivery_fee")}
                    </div>
                    <div>
                      € {deliveryCharge}
                      {/* {Number(delivery || 0).toFixed(2)} */}
                    </div>
                  </section>
                  <section className="flex justify-between pt-[25px] border-b border-[#D9D9D9] pb-3">
                    <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                      {t("s_tax")}
                    </div>
                    <div> € {Number(taxAmount || 0).toFixed(2)} </div>
                  </section>
                  {couponData && isMinimumOrderMet && discount > 0 && (
                    <section className="flex justify-between pt-[25px]">
                      <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                        {t("s_you_saved")}
                      </div>
                      <div className="text-green-600">
                        € {discount.toFixed(2)}
                      </div>
                    </section>
                  )}
                  <section className="flex justify-between pt-[25px] pb-5">
                    <div className="xl:text-16 lg:text-15 md:text-14 text-[13px] font-medium">
                      {t("s_total")}
                    </div>
                    <div className="text-customYellow font-medium xl:text-18 lg:text-16 text-14">
                      € {total?.toFixed(2)}
                    </div>
                  </section>
                </section>

                <div className="xl:py-[30px] py-[15px] flex justify-center">
                  <button
                    onClick={handleCheckout}
                    className="xl:w-[93.5%] lg:w-[93.5%] w-[100%] bg-[#FBC700] text-white py-2 rounded-lg"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </>
          ) : (
            <section className="w-full flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <h3 className="xl:text-24 lg:text-22 text-20 font-medium mb-4">
                  {t("s_cart_empty_heading")}
                </h3>
                <p className="text-[#6C7275] xl:text-16 lg:text-14 text-13 mb-6">
                  {t("s_cart_empty_subtext")}
                </p>
                <button
                  className="bg-[#FBC700] text-white py-2 px-6 rounded-lg"
                  onClick={() => {
                    navigate("/shop-page");
                  }}
                >
                  {t("s_continue_shopping_button")}
                </button>
              </div>
            </section>
          )
        ) : localCart?.length > 0 ? (
          <>
            <section className="flex-1">
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-[1px] border-[#979797]">
                      <th className="text-left xl:text-18 lg:text-16 text-14 xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        {t("s_table_header_product")}
                      </th>
                      <th className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        {t("s_table_header_quantity")}
                      </th>
                      <th className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        {t("s_table_header_price")}
                      </th>
                      <th className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        {t("s_table_header_subtotal")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {localCart?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                            <section className="flex items-center gap-x-2 pt-5 xs:min-w-[300px]">
                              <a
                                href="#"
                                className="shrink-0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLocalRemove(item?.id);
                                }}
                              >
                                <img src={cross} alt="remove" />
                              </a>
                              <div>
                                <img
                                  onClick={() =>
                                    navigate(
                                      `/product-detail/${item?.product.id}`
                                    )
                                  }
                                  src={item?.product.image}
                                  className="cursor-pointer xl:w-[80px] xl:h-[96px] lg:w-[70px] lg:h-[80px] min-w-[60px] min-h-[60px] xs:w-[60px] xs:h-[60px]"
                                  alt={item.name}
                                />
                              </div>
                              <div className="flex flex-col xl:min-w-[220px]">
                                <div
                                  className="cursor-pointer xl:text-18 lg:text-16 text-14"
                                  onClick={() =>
                                    navigate(
                                      `/product-detail/${item?.product.id}`
                                    )
                                  }
                                >
                                  {currentLang == "en"
                                    ? item?.product.name_en
                                    : item?.product.name_nl}
                                </div>
                                <div className="flex gap-[15px] items-center">
                                  <div>
                                    <div className="text-12 text-[#24242480] font-medium">
                                      {t("s_thickness_label")}
                                    </div>
                                    <div className="xl:text-14 text-[13px]">
                                      {item?.product.thickness} mm
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-12 text-[#24242480] font-medium">
                                      {t("s_width_label")}
                                    </div>
                                    <div className="xl:text-14 text-[13px]">
                                      {item?.product.width} mm
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-12 text-[#24242480] font-medium">
                                      {t("s_length_label")}
                                    </div>
                                    <div className="xl:text-14 text-[13px]">
                                      {item?.length} mm
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </td>
                          <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                            <div className="flex justify-between border items-center px-[10px] py-[6px] rounded-md xs:min-w-[80px]">
                              <div>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleLocalDecrement(item?.id);
                                  }}
                                >
                                  <img src={minus} alt="decrement" />
                                </a>
                              </div>
                              <h6>{item?.quantity}</h6>
                              <div>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleLocalIncrement(item?.id);
                                  }}
                                >
                                  <img src={plus} alt="increment" />
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                            € {item?.discounted_price_ex_vat}
                          </td>
                          <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                            €{" "}
                            {(
                              (item?.quantity || 1) *
                              parseFloat(item?.discounted_price_ex_vat || 0)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* <section className="pt-[30px]">
                <div>
                  <h6 className="xl:text-16 lg:text-14 text-[13px]">
                    Have a coupon?
                  </h6>
                </div>
                <div className="pt-2">
                  <p className="xl:text-16 lg:text-14 text-[13px] text-[#6C7275]">
                    Add your code for an instant cart discount
                  </p>
                </div>
                {couponData ? (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-md mt-3">
                    <div className="flex items-center">
                      <span className="text-green-700 font-medium">
                        {couponData.code} applied ({couponData.discount_value}
                        {couponData.discount_type === "percentage"
                          ? "%"
                          : "€"}{" "}
                        off)
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="cursor-pointer p-4 bg-[#FBC700] rounded-md rounded-l-none hover:bg-[#e6b800] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex border border-[#6C727580] justify-between items-center rounded-[10px] flex-1 xl:w-[442px] w-[100%] pl-3 mt-3">
                    <div className="flex gap-x-2 xl:py-[14px] lg:py-[12px] py-[8px] items-center">
                      <img src={coupon} alt="Coupon icon" />
                      <input
                        type="text"
                        className="outline-none border-none bg-transparent w-full text-[#6C7275] placeholder-[#6C7275]"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                    </div>
                    <button
                      className="cursor-pointer p-4 bg-[#FBC700] rounded-md rounded-l-none hover:bg-[#e6b800] transition-colors"
                      onClick={handleApplyCoupon}
                      disabled={isLoading}
                    >
                      {isLoading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                )}
                {error && !couponData && (
                  <div className="text-rose-500 mt-2">{error}</div>
                )}
                {couponData && !isMinimumOrderMet && (
                  <div className="text-amber-600 mt-2">
                    Add €
                    {(couponData.minimum_order_amount - subtotal).toFixed(2)}
                    more to your cart to apply this coupon
                  </div>
                )}
              </section> */}
            </section>

            {/* Right side of grid  */}
            <section className="xl:w-[38.2%] lg:w-[38.2%] bg-[#F8F8F8] xl:px-[32px] lg:px-[25px] md:px-[20px] px-[12px] xl:pt-[44px] lg:pt-[30px] pt-[15px] rounded-lg">
              <section>
                <section className="flex justify-between">
                  <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                    {t("s_subtotal_excl_vat")}
                  </div>
                  <div>€{Number(cartTotal || 0).toFixed(2)}</div>
                </section>

                <section className="flex justify-between pt-[25px]">
                  <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                    {t("s_delivery_fee")}
                  </div>
                  <div>€{Number(delivery || 0).toFixed(2)}</div>
                </section>
                <section className="flex justify-between pt-[25px] border-b border-[#D9D9D9] pb-3">
                  <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                    {t("s_tax")}
                  </div>
                  <div>{Number(taxData || 0).toFixed(2)} %</div>
                </section>
                {couponData && isMinimumOrderMet && discount > 0 && (
                  <section className="flex justify-between pt-[25px]">
                    <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                      {t("s_you_saved")}
                    </div>
                    <div className="text-green-600">€{discount.toFixed(2)}</div>
                  </section>
                )}
                <section className="flex justify-between pt-[25px] pb-5">
                  <div className="xl:text-16 lg:text-15 md:text-14 text-[13px] font-medium">
                    {t("s_total")}
                  </div>
                  <div className="text-customYellow font-medium xl:text-18 lg:text-16 text-14">
                    €{cartTotal?.toFixed(2)}
                  </div>
                </section>
              </section>

              <div className="xl:py-[30px] py-[15px] flex justify-center">
                <button
                  onClick={() => handleDivClick("secondTab")}
                  className="xl:w-[93.5%] lg:w-[93.5%] w-[100%] bg-[#FBC700] text-white py-2 rounded-lg"
                >
                  Checkout
                </button>
              </div>
            </section>
          </>
        ) : (
          <section className="w-full flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <h3 className="xl:text-24 lg:text-22 text-20 font-medium mb-4">
                {t("s_cart_empty_heading")}
              </h3>
              <p className="text-[#6C7275] xl:text-16 lg:text-14 text-13 mb-6">
                {t("s_cart_empty_subtext")}
              </p>
              <button
                className="bg-[#FBC700] text-white py-2 px-6 rounded-lg"
                onClick={() => {
                  navigate("/shop-page");
                }}
              >
                {t("s_continue_shopping_button")}
              </button>
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default ShoppingCart;
