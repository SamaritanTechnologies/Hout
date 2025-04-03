import React, { useEffect, useState } from "react";
import FormikField from "../Common/FormikField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Common/Button";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";
import {
  getDeliveryAddress,
  getInvoiceAddress,
  getProfileInfo,
  updateDeliveryAddress,
  updateInvoiceAddress,
  updatePass,
  updateProfile,
} from "../../redux/actions/profileActions";
import {
  passwordValidationSchema,
  validationDelivery,
  validationInvoice,
} from "../../utils/validations";

const Account = ({ userData, setSelectedPic, setUserName }) => {
  const [state, setState] = useState({
    userData: null,
    deliveryAddress: null,
    invoiceAddress: null,
  });

  const initialValuesPassword = {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    companyName: Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number is not valid")
      .required("Phone number is required"),
  });

  useEffect(() => {
    if (setSelectedPic) setSelectedPic(state?.userData?.profile_pic);
    if (setUserName)
      setUserName(
        state?.userData?.first_name + " " + state?.userData?.last_name
      );
  }, [state.userData]);

  const fetchUser = async () => {
    try {
      const res = await getProfileInfo();
      setState((prev) => ({
        ...prev,
        userData: res,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
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

  const fetchInvoiceAddress = async () => {
    try {
      const res = await getInvoiceAddress();
      setState((prev) => ({
        ...prev,
        invoiceAddress: res?.data,
      }));

      console.log(res, "fetchUser");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDeliveryAddress();
    fetchInvoiceAddress();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstName: state?.userData?.first_name ?? "",
          lastName: state?.userData?.last_name ?? "",
          companyName: state?.userData?.company_name ?? "",
          email: state?.userData?.email ?? "",
          phone: state?.userData?.phone ?? "",
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const updatedVal = {
            first_name: values?.firstName,
            last_name: values?.lastName,
            email: values?.email,
            company_name: values?.companyName,
            phone: values?.phone,
            userId: userData?.user_id,
          };

          try {
            await updateProfile(updatedVal, { setSubmitting });
            fetchUser();
            resetForm();
          } catch (error) {
            console.error("Error updating user data:", error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <section className="md:pt-10">
              <h2 className="text-[20px] my-4 lg:text-xl font-semibold">
                Account Details
              </h2>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <Field
                    name="firstName"
                    placeholder="Enter Name"
                    label="First name*"
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    label="Last name*"
                    component={FormikField}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 pt-5">
                <div className="w-full md:w-1/2">
                  <Field
                    name="companyName"
                    placeholder="Company Name"
                    label="Company Name"
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    label="Email*"
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    label="Phone Number*"
                    component={FormikField}
                  />
                </div>
              </div>
              <div className="pt-5">
                <Button
                  btnText="Save changes"
                  disabled={isSubmitting}
                  type="submit"
                />
              </div>
            </section>
          </Form>
        )}
      </Formik>

      {/* <>
        <h5 className="text-20 font-semibold mb-[30px] mt-8">
          Delivery Address
        </h5>
        <Formik
          initialValues={{
            stNumber: state?.deliveryAddress?.street_and_number ?? "",
            zCode: state?.deliveryAddress?.zip_code ?? "",
            city: state?.deliveryAddress?.city ?? "",
            country: state?.deliveryAddress?.country ?? "",
          }}
          enableReinitialize={true}
          validationSchema={validationDelivery}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const updatedVal = {
              stNumber: values?.stNumber,
              zCode: values?.zCode,
              city: values?.city,
              country: values?.country,
            };

            try {
              await updateDeliveryAddress(updatedVal, { setSubmitting });
              await fetchDeliveryAddress();
              resetForm();
            } catch (error) {
              console.error("Error updating user data:", error);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="formSec">
                <div className="flex gap-[20px] mb-[24px]">
                  <div className="w-1/2 md:mb-0">
                    <Field
                      component={FormikField}
                      name="stNumber"
                      label="Street and Number"
                      placeholder="Street and Number"
                      id="stNumber"
                    />
                  </div>
                  <div className="w-1/2">
                    <Field
                      component={FormikField}
                      name="zCode"
                      label="Zip Code"
                      placeholder="12345"
                      id="zCode"
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex gap-[20px] mb-[24px]">
                  <div className="w-1/2 md:mb-0">
                    <Field
                      component={FormikField}
                      name="city"
                      label="City"
                      id="city"
                      type="text"
                      placeholder="Add City"
                    />
                  </div>
                  <div className="w-1/2">
                    <Field
                      component={FormikField}
                      name="country"
                      width="w-[100%]"
                      paddingY="12px"
                      label="Country"
                      firstOptionText="Country"
                      placeholder="Add Country"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    btnText="Save Changes"
                    paddingX="20px"
                    breakpoint="w-[207px]"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
      <>
        <h5 className="text-20 font-semibold mb-[30px]  mt-8">
          Invoice Address
        </h5>
        <Formik
          initialValues={{
            stNumber: state?.invoiceAddress?.street_and_number ?? "",
            zCode: state?.invoiceAddress?.zip_code ?? "",
            city: state?.invoiceAddress?.city ?? "",
            country: state?.invoiceAddress?.country ?? "",
          }}
          enableReinitialize={true}
          validationSchema={validationInvoice}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const updatedVal = {
              stNumber: values?.stNumber,
              zCode: values?.zCode,
              city: values?.city,
              country: values?.country,
            };

            try {
              await updateInvoiceAddress(updatedVal, { setSubmitting });
              await fetchInvoiceAddress();
              resetForm();
            } catch (error) {
              console.error("Error updating user data:", error);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="formSec">
                <div className="flex gap-[20px] mb-[24px]">
                  <div className="w-1/2 md:mb-0">
                    <Field
                      component={FormikField}
                      name="stNumber"
                      label="Street and Number"
                      placeholder="Street and Number"
                      id="stNumber"
                    />
                  </div>
                  <div className="w-1/2">
                    <Field
                      component={FormikField}
                      name="zCode"
                      label="Zip Code"
                      placeholder="12345"
                      id="zCode"
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex gap-[20px] mb-[24px]">
                  <div className="w-1/2 md:mb-0">
                    <Field
                      component={FormikField}
                      name="city"
                      width="w-[100%]"
                      paddingY="12px"
                      firstOptionText="City"
                      label="City"
                      placeholder="Add city"
                    />
                  </div>
                  <div className="w-1/2">
                    <Field
                      component={FormikField}
                      name="country"
                      width="w-[100%]"
                      paddingY="12px"
                      firstOptionText="Country"
                      placeholder="Add country"
                      label="Country"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    btnText="Save Changes"
                    paddingX="20px"
                    breakpoint="w-[207px]"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </> */}

      <Formik
        initialValues={initialValuesPassword}
        validationSchema={passwordValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await updatePass(values, { setSubmitting });
            resetForm(false);
            setSubmitting(false);
            toast.success("Password updated successfully!");
          } catch (error) {
            toast.error("Password not updated");
            console.error("Error updating password:", error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <section className="pt-8 pb-8">
              <h2 className="text-[20px] lg:text-xl font-semibold my-2">
                Password
              </h2>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 pt-5">
                <div className="w-full md:w-1/2">
                  <Field
                    name="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    label="Old Password"
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    label="New Password"
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="repeatNewPassword"
                    type="password"
                    placeholder="Repeat new password"
                    label="Repeat new password"
                    component={FormikField}
                  />
                </div>
              </div>
              <div className="pt-5">
                <Button
                  btnText="Save changes"
                  disabled={isSubmitting}
                  type="submit"
                />
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Account;
