import React, { useEffect, useState } from "react";
import FormikField from "../Common/FormikField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Common/Button";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";
import {
  getProfile,
  updatePass,
  updateProfile,
} from "../../redux/actions/profileActions";
import { passwordValidationSchema } from "../../utils/validations";

const Account = ({ userData }) => {
  const [state, setState] = useState({
    userData: null,
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

  const fetchUser = async () => {
    try {
      const res = await getProfile(userData?.user_id);
      setState((prev) => ({
        ...prev,
        userData: res.data,
      }));
      console.log(res, "fetchUser");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
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
              <h2 className="text-[20px] lg:text-xl font-semibold">
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
                  btnText="Submit"
                  disabled={isSubmitting}
                  type="submit"
                />
              </div>
            </section>
          </Form>
        )}
      </Formik>
      {/* Second Section  Delivery address  */}
      <Formik
        initialValues={initialValuesPassword}
        validationSchema={passwordValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await updatePass(values, { setSubmitting });
            resetForm(false);
            setSubmitting(false);
          } catch (error) {
            console.error("Error updating password:", error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <section className="pt-8 pb-8">
              <h2 className="text-[20px] lg:text-xl font-semibold">Password</h2>
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
                  btnText="Submit"
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
