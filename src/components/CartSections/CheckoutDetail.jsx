import React, { useCallback, useEffect, useState } from "react";
// import InputField from "../../components/Common/InputField";
// import image1 from "../../assets/addToCart/image1.svg";
// import minus from "../../assets/addToCart/minus.svg";
// import plus from "../../assets/addToCart/plus.svg";
// import RadioButtons from "../Common/RadioButtons";
// import { debounce } from "lodash";
import { Truck, Package } from "lucide-react";
import Button from "../../components/Common/Button";
import { paymentMethods } from "../../utils/helper";
import PaymentCard from "../Common/PaymentCard";
import TotalBalance from "../Common/TotalBalance";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import { Field, Form, Formik } from "formik";
import FormikField from "../Common/FormikField";
import * as Yup from "yup";

import {
  // getDeliveryAddress,
  getProfileInfo,
} from "../../redux/actions/profileActions";
import { getLoggedInUser, loginUser } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { calculateTotal } from "./amount";
import { setCartSummaryData } from "../../redux/slices/totalSummarySlice";

const CheckoutDetail = ({ cartData, fetchCart }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const cartSummary = useSelector((state) => state.summary);
  const cart_data = useSelector((state) => state.summary.cart_data);
  const userDetail = useSelector((state) => state.auth.user);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getLoggedInUser();
  const [state, setState] = useState({
    deliveryAddress: null,
    userData: null,
  });
  const [cartItems, setCartItems] = useState(cartData?.cart_items || []);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [terms, setTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("delivery");
  const [paymentOption, setPaymentOption] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    companyName: Yup.string(),
    streetAndNumber: Yup.string().required("Street & Number is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
  });

  const { totalPrice, delivery, taxData, couponData } = cart_data;

  useEffect(() => {
    const {
      total,
      discount,
      deliveryCharge,
      subtotal,
      isMinimumOrderMet,
      taxAmount,
    } = calculateTotal(
      totalPrice,
      delivery,
      taxData,
      couponData,
      selectedMethod
    );
    dispatch(
      setCartSummaryData({
        subtotal: Number(totalPrice || 0).toFixed(2),
        deliveryFee: deliveryCharge,
        tax: Number(taxData || 0).toFixed(2),
        youSaved: discount.toFixed(2),
        total: total?.toFixed(2),
        // order_status: selectedMethod,
        // payment_option: selectedOption,
        tax_amount: taxAmount.toFixed(2),
        cart_data: {
          totalPrice: totalPrice,
          delivery: delivery,
          taxData: taxData,
          couponData: couponData,
          selectedMethod: selectedMethod,
          // selectedOption: selectedOption,
        },
      })
    );
  }, [
    totalPrice,
    delivery,
    taxData,
    couponData,
    selectedMethod,
    selectedMethod,
  ]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const res = await axiosWithCredentials.get(
          `/accounts/payment-options/${user?.id}/`
        );
        // console.log("res", res);
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };
    fetchPaymentOptions();
    // No cleanup needed
    return undefined;
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getProfileInfo();

      // setState(
      //   (prev) => ({
      //   ...prev,
      //   userData: res,
      // }));
      setState(res);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const res = await axiosWithCredentials.get(
          `/accounts/payment-options/${user?.id}/`
        );
        setPaymentOption(res.data);
        // Auto-select if only one payment method is available
        //  if (res.data.cash_payment && !res.data.credit_card) {
        //    setSelectedOption("cash");
        //  } else if (!res.data.cash_payment && res.data.credit_card) {
        //    setSelectedOption("credit");
        //  }
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const handleMethod = (value) => {
    setSelectedMethod(selectedMethod === value ? "" : value);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setSelectedPaymentOption(method.name);
  };

  const confirmOrder = async () => {
    if (
      !state?.delivery_address?.street_and_number ||
      !state?.delivery_address?.city ||
      !state?.delivery_address?.zip_code ||
      !state?.delivery_address?.country
    ) {
      toast.warn(t("cd_address_incomplete"));
      return;
    }

    if (!terms) {
      toast.warn(t("cd_terms_required"));
      return;
    }

    if (!selectedPaymentMethod) {
      toast.warn(t("cd_payment_method_required"));
      return;
    }

    if (!selectedPaymentOption) {
      toast.warn(t("cd_payment_method_required"));
      return;
    }
    if (!selectedMethod) {
      toast.warn(t("cd_delivery_method_required"));
      return;
    }

    try {
      setLoading(true);
      const payload = {
        gross_total: cartSummary?.subtotal,
        total: cartSummary?.total,
        order_status: selectedMethod,
        delivery_method: selectedPaymentMethod.name,
        payment_option: selectedPaymentOption,
        delivery_price:
          cartSummary?.deliveryFee !== null &&
          cartSummary?.deliveryFee !== undefined
            ? cartSummary?.deliveryFee
            : 0,
        language: currentLang,
      };
      console.log("payload", payload);
      // const response = await axiosWithCredentials.post(
      //   `/confirm-order/`,
      //   payload
      // );

      // if (response?.data?.checkout_url) {
      //   window.open(response.data.checkout_url, "_blank");
      // } else {
      //   toast.error(t("cd_payment_init_fail"));
      // }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error.response?.data?.message || t("cd_payment_processing_fail")
      );
    } finally {
      setLoading(false);
    }
  };

  const hasCartItems = cartData?.cart_items?.length > 0;

  const initialValues = {
    firstName: userDetail?.first_name || "",
    lastName: userDetail?.last_name || "",
    companyName: userDetail?.company_name || "",
    streetAndNumber: userDetail?.delivery_address?.street_and_number || "",
    city: userDetail?.delivery_address?.city || "",
    zipCode: userDetail?.delivery_address?.zip_code || "",
    country: userDetail?.delivery_address?.country || "",
  };

  const filteredPaymentMethods = paymentMethods.filter((method) => {
    if (method.name === "Cash" && paymentOption && !paymentOption.cash_payment)
      return false;
    if (
      method.name === "Buy on Credit " &&
      paymentOption &&
      !paymentOption.credit_card
    )
      return false;
    return true;
  });

  return (
    <>
      <section className="w-full flex flex-col items-center justify-center">
        {hasCartItems ? (
          <>
            <section className="xl:px-[100px] lg:px-[60px] px-[30px] xs:px-[15px]  mb-16">
              <section className="grid grid-cols-12 gap-4 xs:gap-6 lg:gap-[45px] gap-x-12 ">
                <section className="col-span-12 xl:col-span-4">
                  <div className="text-22 font-medium border-b border-[#D9D9D9] pb-2">
                    {t("sk_view_order_text")}
                  </div>

                  {cartItems?.map((item) => {
                    // console.log("items Data:", item);
                    return (
                      <div key={item.id}>
                        <section className="flex pt-5 items-center">
                          <div>
                            <img
                              src={item?.product_length?.product.image}
                              className="xl:w-[80px] xl:h-[96px] lg:w-[70px] lg:h-[80px] min-w-[60px] min-h-[60px] xs:w-[60px] xs:h-[60px]"
                            />
                          </div>
                          <div>
                            <div className="px-2 text-18">
                              {currentLang === "en"
                                ? item?.product_length?.product.name_en
                                : item?.product_length?.product.name_nl}
                            </div>
                            <section className="flex gap-x-4 px-2 pt-1">
                              <div>
                                <div className="text-12 font-medium text-[#BABABA]">
                                  {t("sk_thickness_label")}
                                </div>
                                <div>
                                  {item?.product_length?.product?.thickness} mm
                                </div>
                              </div>

                              <div>
                                <div className="text-12 font-medium text-[#BABABA]">
                                  {t("sk_width_label")}
                                </div>
                                <div>
                                  {item?.product_length?.product?.width} mm
                                </div>
                              </div>

                              <div>
                                <div className="text-12 font-medium text-[#BABABA]">
                                  {t("sk_length_label")}
                                </div>
                                <div>{item?.product_length?.length} cm</div>
                              </div>
                            </section>
                          </div>
                        </section>

                        <section className="flex justify-between items-center xl:pl-[80px] lg:pl-[80px] md:pl-[80px] sm:pl-[80px] xs:pl-[60px] pl-[50px]">
                          {/* <div className="flex justify-between border items-center px-[10px] py-[6px] rounded-md xl:min-w-[118px] lg:w-[170px] md:w-[170px] sm:w-[170px] xs:w-[170px]">
                          <div className="cursor-pointer">
                            <span onClick={() => handleDecrement(item.id)}>
                              <img src={minus} alt="decrement" />
                            </span>
                          </div>
                          <h6>{item.quantity}</h6>
                          <div className="cursor-pointer">
                            <span onClick={() => handleIncrement(item.id)}>
                              <img src={plus} alt="increment" />
                            </span>
                          </div>
                        </div> */}
                          <div className="flex justify-between border items-center px-[10px] py-[6px] rounded-md xl:min-w-[118px] lg:w-[170px] md:w-[170px] sm:w-[170px] xs:w-[170px]">
                            <span>{t("cd_quantity_label")}:</span>{" "}
                            <h6>{item.quantity}</h6>
                          </div>
                          <div className="w-full text-right  xl:text-22 lg:text-20 md:text-18 text-16 font-bold">
                            € {item?.product_price}
                          </div>
                        </section>
                      </div>
                    );
                  })}

                  <div>
                    <TotalBalance
                    // subtotal={totalPrice}
                    // deliveryFee={delivery}
                    // tax={taxData}
                    // subtotal={totalPrice}
                    // total={total}
                    // cartItems={cartItems}
                    />
                  </div>
                  <section>
                    <div className="xl:text-14 lg:text-14 text-[13px] xl:pt-[25px] lg:pt-[20px] pt-[10px]">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded-full mr-4 h-4 w-4 accent-yellow-400"
                        checked={terms}
                        onChange={() => setTerms(!terms)}
                      />
                      {t("sk_terms_agreement_text")}
                    </div>
                  </section>

                  <div className="xl:py-[30px] lg:py-[25px] md:py-[20px] py-[10px]">
                    <Button
                      disabled={loading}
                      btnText={
                        loading
                          ? t("sk_confirming_text")
                          : t("sk_confirm_order_button")
                      }
                      widthfull
                      onClick={confirmOrder}
                    />
                  </div>
                </section>

                {/* Right Side Section  */}

                <section className="col-span-12 xl:col-span-8 font-bold text-md">
                  <div className="xl:text-22 lg:text-20 md:text-18 text-16 font-semibold border-b pb-2 border-[#D9D9D9]">
                    {t("cd_delivery_address_title")}
                  </div>

                  <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      const payload = {
                        first_name: values.firstName,
                        last_name: values.lastName,
                        company_name: values.companyName,
                        street_and_number: values.streetAndNumber,
                        zip_code: values.zipCode,
                        city: values.city,
                        country: values.country,
                      };

                      try {
                        const response = await axiosWithCredentials.patch(
                          `/accounts/update-personal-details/${state.id}/`,
                          payload
                        );
                        const userDetail = await getProfileInfo();
                        dispatch(loginUser(userDetail));
                        fetchUser();
                        setSubmitting(false);
                        resetForm(false);
                        toast.success(t("cd_address_update_success"));
                      } catch (error) {
                        toast.error(t("cd_address_update_fail"));
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 xl:col-span-6 mt-8">
                          <div className="mb-4">
                            <Field
                              component={FormikField}
                              name="firstName"
                              label={t("sk_first_name_label")}
                              placeholder={t("sk_first_name_placeholder")}
                            />
                          </div>
                          <div className="mb-4">
                            <Field
                              component={FormikField}
                              name="companyName"
                              label={t("sk_company_name_label")}
                              placeholder={t("sk_company_name_placeholder")}
                            />
                          </div>
                          <div className="mb-4">
                            <Field
                              component={FormikField}
                              name="streetAndNumber"
                              label={t("sk_street_number_label")}
                              placeholder={t("sk_street_number_placeholder")}
                            />
                          </div>
                          <div>
                            <Field
                              component={FormikField}
                              name="city"
                              label={t("sk_city_label")}
                              placeholder={t("sk_city_placeholder")}
                            />
                          </div>
                        </div>

                        <div className="col-span-12 xl:col-span-6 xl:mt-8">
                          <div className="mb-4">
                            <Field
                              component={FormikField}
                              name="lastName"
                              label={t("sk_last_name_label")}
                              placeholder={t("sk_last_name_placeholder")}
                            />
                          </div>
                          <div className="w-full md:h-20 md:w-0 col-span-6 mb-2 lg:hidden md:hidden sm:hidden xs:hidden"></div>
                          <div className="mb-4 invisible lg:hidden md:hidden sm:hidden xs:hidden">
                            {/* <Field
                              component={FormikField}
                              name="zipCode"
                              label={t("sk_zip_code_label")}
                              placeholder={t("sk_zip_code_placeholder")}
                            /> */}
                          </div>
                          <div className="mb-4">
                            <Field
                              component={FormikField}
                              name="zipCode"
                              label={t("sk_zip_code_label")}
                              placeholder={t("sk_zip_code_placeholder")}
                            />
                          </div>
                          <div className="mb-4">
                            <Field
                              component={FormikField}
                              name="country"
                              label={t("sk_country_label")}
                              placeholder={t("sk_country_placeholder")}
                            />
                          </div>
                          <div className="mt-4 float-end max-w-[159px] w-full">
                            <Button
                              btnText={
                                isSubmitting
                                  ? t("sk_saving_button")
                                  : t("sk_save_button")
                              }
                              disabled={isSubmitting}
                              type="submit"
                              widthfull
                            />
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  <section className="my-4 xl:w-2/3 w-full h-auto py-4 border-t border-[#D9D9D9]">
                    <div>
                      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                        {t("cd_delivery_method_title")}
                      </h2>

                      <div className="space-y-4">
                        {/* Delivery Option */}
                        <div
                          className={`relative  rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            selectedMethod === "delivery"
                              ? "border border-blue-500 bg-blue-50"
                              : " bg-[#F5F4F8]"
                          }`}
                          onClick={() => handleMethod("delivery")}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <input
                                type="radio"
                                name="deliveryMethod"
                                checked={selectedMethod === "delivery"}
                                onChange={() => handleMethod("delivery")}
                                style={{ display: "block" }}
                                className="payMain absolute -top-2"
                              />
                            </div>

                            <div className="flex-shrink-0">
                              <Truck className="h-8 w-8 text-gray-700" />
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                {t("cd_delivery_option_label")}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Pickup Option */}
                        <div
                          className={`relative  rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            selectedMethod === "pickup"
                              ? "border border-blue-500 bg-blue-50"
                              : " bg-[#F5F4F8]"
                          }`}
                          onClick={() => handleMethod("pickup")}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <input
                                type="radio"
                                name="pickupMethod"
                                checked={selectedMethod === "pickup"}
                                onChange={() => handleMethod("pickup")}
                                style={{ display: "block" }}
                                className="payMain absolute -top-2"
                              />
                            </div>

                            <div className="flex-shrink-0">
                              <Package className="h-8 w-8 text-gray-700" />
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                {t("cd_pickup_option_label")}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="mt-8 pb-[100px] my-4">
                    <h2 className="text-2xl font-bold my-2 border-b border-[#D9D9D9] pb-3">
                      {t("sk_payment_method_title")}
                    </h2>

                    {filteredPaymentMethods.map((item) => (
                      <div
                        className="my-4 xl:w-2/3 w-full h-auto"
                        key={item.id}
                      >
                        <PaymentCard
                          img={item.img}
                          name={item.name}
                          isChecked={selectedPaymentMethod?.id === item.id}
                          isRadioRequired
                          onChange={() => handlePaymentMethodChange(item)}
                          item={item}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </section>
            </section>
          </>
        ) : (
          <section className="w-full flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <h3 className="xl:text-24 lg:text-22 text-20 font-medium mb-4">
                Your cart is empty
              </h3>
              <p className="text-[#6C7275] xl:text-16 lg:text-14 text-13 mb-6">
                Looks like you haven't added any items to your cart yet
              </p>
              <button
                className="bg-[#FBC700] text-white py-2 px-6 rounded-lg"
                onClick={() => {
                  navigate("/shop-page");
                }}
              >
                Continue Shopping
              </button>
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default CheckoutDetail;
