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
import { useTranslation } from "react-i18next";

const Account = ({ userData, setSelectedPic, setUserName }) => {
  const { t, i18n } = useTranslation();
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
            await updateProfile(updatedVal, userData?.id, {
              setSubmitting,
            });
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
                {t("a_account_details")}
              </h2>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <Field
                    name="firstName"
                    placeholder={t("a_first_name_placeholder")}
                    label={t("a_first_name_label")}
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="lastName"
                    placeholder={t("a_last_name_placeholder")}
                    label={t("a_last_name_label")}
                    component={FormikField}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 pt-5">
                <div className="w-full md:w-1/2">
                  <Field
                    name="companyName"
                    placeholder={t("a_company_name_placeholder")}
                    label={t("a_company_name_label")}
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="email"
                    type="email"
                    placeholder={t("a_email_placeholder")}
                    label={t("a_email_label")}
                    component={FormikField}
                    disabled
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="phone"
                    type="text"
                    placeholder={t("a_phone_number_placeholder")}
                    label={t("a_phone_number_label")}
                    component={FormikField}
                  />
                </div>
              </div>
              <div className="pt-5">
                <Button
                  btnText={t("a_save_changes_btn_text")}
                  disabled={isSubmitting}
                  type="submit"
                />
              </div>
            </section>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={initialValuesPassword}
        validationSchema={passwordValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await updatePass(values, userData?.id, { setSubmitting });
            resetForm(false);
            setSubmitting(false);
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
                {t("a_password_section_title")}
              </h2>
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 pt-5">
                <div className="w-full md:w-1/2">
                  <Field
                    name="oldPassword"
                    type="password"
                    placeholder={t("a_old_password_placeholder")}
                    label={t("a_old_password_label")}
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder={t("a_new_password_placeholder")}
                    label={t("a_new_password_label")}
                    component={FormikField}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Field
                    name="repeatNewPassword"
                    type="password"
                    placeholder={t("a_repeat_new_password_placeholder")}
                    label={t("a_repeat_new_password_label")}
                    component={FormikField}
                  />
                </div>
              </div>
              <div className="pt-5">
                <Button
                  btnText={t("a_save_changes_btn_text")}
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
