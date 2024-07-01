import React, { useCallback, useEffect, useState } from "react";
import InputField from "../../components/Common/InputField";
import Button from "../../components/Common/Button";
import { paymentMethods } from "../../utils/helper";
import PaymentCard from "../Common/PaymentCard";
import image1 from "../../assets/addToCart/image1.svg";
import minus from "../../assets/addToCart/minus.svg";
import plus from "../../assets/addToCart/plus.svg";
import TotalBalance from "../Common/TotalBalance";
import RadioButtons from "../Common/RadioButtons";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import { Field, Form, Formik } from "formik";
import FormikField from "../Common/FormikField";
import * as Yup from "yup";
import {
  getDeliveryAddress,
  getProfile,
} from "../../redux/actions/profileActions";

const CheckoutDetail = ({ cartData, fetchCart, taxData, delivery }) => {
  const [state, setState] = useState({
    deliveryAddress: null,
    userData: null,
  });
  const [cartItems, setCartItems] = useState(cartData?.cart_items || []);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [terms, setTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    companyName: Yup.string().required("Company name is required"),
    streetAndNumber: Yup.string().required("Street & Number is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
  });

  const fetchUser = async () => {
    try {
      const res = await getProfile();
      setState((prev) => ({
        ...prev,
        userData: res?.data,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    setCartItems(cartData?.cart_items || []);
  }, [cartData]);

  const updateQuantity = async ({ id, productId, price, newQuantity }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const payload = {
        cart: userData.card_id,
        user: userData?.user_id,
        product: productId,
        quantity: newQuantity,
        product_price: price,
      };
      await axiosWithCredentials.put(`/change-quantity/${id}/`, payload);

      toast.success("Successfully updated the cart");

      fetchCart();
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (error.response?.data?.product?.length) {
        errorMessage = error.response.data.product[0];
      } else if (error?.response?.data?.message) {
        errorMessage = error?.response?.data?.message;
      }
      fetchCart();
      toast.error(errorMessage);
    }
  };

  const fetchDeliveryAddress = async () => {
    try {
      const res = await getDeliveryAddress();
      setState((prev) => ({
        ...prev,
        deliveryAddress: res?.data,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const debouncedUpdateQuantity = useCallback(
    debounce((item) => updateQuantity(item), 500),
    []
  );

  console.log(state, "state");
  useEffect(() => {
    fetchUser();
    fetchDeliveryAddress();
  }, []);

  useEffect(() => {
    if (updatedItem) {
      debouncedUpdateQuantity(updatedItem);
    }
  }, [updatedItem]);

  const handleIncrement = (id) => {
    const item = cartItems?.find((item) => item.id === id);
    if (item) {
      const newQuantity = item.quantity + 1;
      setCartItems((prevItems) =>
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
    const item = cartItems?.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      setCartItems((prevItems) =>
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

  const totalPrice = cartItems?.reduce((acc, item) => {
    return acc + item.product_price;
  }, 0);

  const total = totalPrice + delivery + taxData;

  const confirmOrder = async () => {
    const payload = {
      gross_total: cartItems?.[0]?.product_price,
      total: total,
      delivery_method: "asdasda",
      delivery_price: delivery,
    };

    if (
      state?.deliveryAddress?.street_and_number &&
      state?.deliveryAddress?.city &&
      state?.deliveryAddress?.zip_code &&
      state?.deliveryAddress?.country
    ) {
      if (terms) {
        try {
          setLoading(true);
          const response = await axiosWithCredentials.post(
            `/confirm-order/`,
            payload
          );
          console.log(response, "kkkkk");
          if (response?.data?.checkout_url) {
            window.location.href = response?.data?.checkout_url;
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);

          toast.error("Something went wrong");

          throw error;
        }
      }
      if (!terms) {
        toast.warn("Please accept terms and conditions first");
      }
    } else {
      if (!terms) {
        toast.warn("Please accept terms and conditions first");
      } else {
        toast.warn("Please provide complete delivery address");
      }
    }
  };

  return (
    <>
      <section className="xl:px-[100px] lg:px-[60px] px-[30px] xs:px-[15px]  mb-16">
        <section className="grid grid-cols-12 gap-4 xs:gap-6 lg:gap-[45px] gap-x-12 ">
          <section className="col-span-12 xl:col-span-4">
            <div className="text-22 font-medium border-b border-[#D9D9D9] pb-2">
              View Order
            </div>

            {cartItems?.map((item) => (
              <div key={item.id}>
                <section className="flex pt-5 items-center">
                  <div>
                    <img
                      src={item?.product?.images_url?.[0]}
                      className="xl:w-[80px] xl:h-[96px] lg:w-[70px] lg:h-[80px] min-w-[60px] min-h-[60px] xs:w-[60px] xs:h-[60px]"
                    />
                  </div>
                  <div>
                    <div className="px-2 text-18">{item.name}</div>
                    <section className="flex gap-x-4 px-2 pt-1">
                      <div>
                        <div className="text-12 font-medium text-[#BABABA]">
                          Thickness
                        </div>
                        <div>{item.thickness} mm</div>
                      </div>

                      <div>
                        <div className="text-12 font-medium text-[#BABABA]">
                          Width
                        </div>
                        <div>{item.width} mm</div>
                      </div>

                      <div>
                        <div className="text-12 font-medium text-[#BABABA]">
                          Length
                        </div>
                        <div>{item.length} mm</div>
                      </div>
                    </section>
                  </div>
                </section>

                <section className="flex justify-between items-center xl:pl-[80px] lg:pl-[80px] md:pl-[80px] sm:pl-[80px] xs:pl-[60px] pl-[50px]">
                  <div className="flex justify-between border items-center px-[10px] py-[6px] rounded-md xl:min-w-[118px] lg:w-[170px] md:w-[170px] sm:w-[170px] xs:w-[170px]">
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
                  </div>
                  <div className="xl:text-22 lg:text-20 md:text-18 text-16 font-bold">
                    €{item?.product_price}
                  </div>
                </section>
              </div>
            ))}

            <div>
              <TotalBalance
                subtotal={totalPrice}
                deliveryFee={delivery}
                tax={taxData}
                total={total}
                cartItems={cartItems}
              />
            </div>
            <section>
              <div className="xl:text-14 lg:text-14 text-[13px] xl:pt-[25px] lg:pt-[20px] pt-[10px]">
                <input
                  type="checkbox"
                  className="form-checkbox focus:ring-[#000] rounded-full mr-4 h-4 w-4 text-[#15803D]"
                  checked={terms}
                  onChange={() => setTerms(!terms)}
                />{" "}
                I Agree to the General Terms and Conditions and waive the Right
                of Withdrawal because this is a customized product.
              </div>
            </section>

            <div className="xl:py-[30px] lg:py-[25px] md:py-[20px] py-[10px]">
              <Button
                disabled={loading}
                btnText={loading ? "Confirming.." : "Confirm Order"}
                paddingY="20px"
                widthfull
                onClick={confirmOrder}
              />
            </div>
          </section>

          {/* Right Side Section  */}

          <section className="col-span-12 xl:col-span-8 font-bold text-md">
            <div className="xl:text-22 lg:text-20 md:text-18 text-16 font-semibold border-b pb-2 border-[#D9D9D9]">
              Delivery Address
            </div>

            <Formik
              initialValues={{
                firstName: state?.userData?.first_name ?? "",
                lastName: state?.userData?.last_name ?? "",
                companyName: state?.userData?.company_name ?? "",
                streetAndNumber:
                  state?.deliveryAddress?.street_and_number ?? "",
                city: state?.deliveryAddress?.city ?? "",
                zipCode: state?.deliveryAddress?.zip_code ?? "",
                country: state?.deliveryAddress?.country ?? "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const payload = {
                  first_name: values.firstName,
                  last_name: values.lastName,
                  companyt_name: values.companyName,
                  street_and_number: values.streetAndNumber,
                  zip_code: values.zipCode,
                  city: values.city,
                  country: values.country,
                };

                try {
                  const response = await axiosWithCredentials.patch(
                    `/accounts/update-personal-details/${state.userData?.id}/`,
                    payload
                  );
                  setSubmitting(false);
                  resetForm(false);
                  toast.success("Successfully updated");
                } catch (error) {
                  console.log(error, "klklkl");
                  toast.error("Something went wrong");
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
                        label="First Name"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        component={FormikField}
                        name="companyName"
                        label="Company Name (Optional)"
                        placeholder="Company Name (Optional)"
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        component={FormikField}
                        name="streetAndNumber"
                        label="Street & Number"
                        placeholder="Street & Number"
                      />
                    </div>
                    <div>
                      <Field
                        component={FormikField}
                        name="city"
                        label="City"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  <div className="col-span-12 xl:col-span-6 xl:mt-8">
                    <div className="mb-4">
                      <Field
                        component={FormikField}
                        name="lastName"
                        label="Last Name"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="w-full md:h-20 md:w-0 col-span-6 mb-2 lg:hidden md:hidden sm:hidden xs:hidden"></div>
                    <div className="mb-4 invisible lg:hidden md:hidden sm:hidden xs:hidden">
                      <Field
                        component={FormikField}
                        name="zipCode"
                        label="Zip Code"
                        placeholder="Zip Code"
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        component={FormikField}
                        name="zipCode"
                        label="Zip Code"
                        placeholder="Zip Code"
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        component={FormikField}
                        name="country"
                        label="Country"
                        placeholder="Country"
                      />
                    </div>
                    <div className="mt-4 float-end w-[39%]">
                      <Button
                        btnText={isSubmitting ? "Saving.." : "Save"}
                        disabled={isSubmitting}
                        type="submit"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            {/* <div className="mt-8 pb-[100px] my-4">
              <h2 className="text-2xl font-bold my-2 border-b border-[#D9D9D9] pb-3">
                Payment Method
              </h2>

              {paymentMethods.map((item) => (
                <div className="my-4 xl:w-2/3 w-full h-auto" key={item.id}>
                  <PaymentCard
                    img={item.img}
                    name={item.name}
                    isChecked={item.checked}
                    isRadioRequired
                  />
                </div>
              ))}
            </div> */}
          </section>
        </section>
      </section>
    </>
  );
};

export default CheckoutDetail;
