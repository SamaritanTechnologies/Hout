import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import signInRight from "../assets/authImages/signInRight.svg";
import houtLogo from "../assets/authImages/houtLogo.svg";
import thumbsUp from "../assets/authImages/thumbsUp.svg";
import signinBlur from "../assets/authImages/signinBlur.png";
import InputField from "../components/Common/InputField";
import FormikField from "../components/Common/FormikField";
import { resetPassword } from "../redux/actions/profileActions";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one digit"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = {
      password: values.new_password,
      uid: uid,
    };

    try {
      await resetPassword(data, { setSubmitting });
      resetForm(false);
      setSubmitting(false);
      navigate("/sign-in");
    } catch (error) {
      setSubmitting(false);
    }
  };

  console.log(uid, "nnnn");
  return (
    <div>
      <div className="signUpMain flex flex-row-reverse md:flex-col sm:flex-col xs:flex-col min-h-screen">
        <div className="signUpLeft xl:w-[50%] lg:w-[50%] w-full relative">
          <img
            src={signInRight}
            alt="signupleftImg"
            onClick={() => navigate("/")}
            className="cursor-pointer w-[100%] xl:min-h-[100vh] lg:min-h-[100vh] md:h-[70vh] md:min-h-[70vh] sm:h-[70vh] sm:min-h-[70vh] xs:h-[70vh] xs:min-h-[70vh]"
            style={{ objectFit: "cover" }}
          />
          <div>
            <div
              className="yellowBar absolute bottom-[20%] left-[50%] translate-x-[-50%]  xl:w-[70%] lg:w-[80%] w-[90%]  rounded-lg   xl:py-[40px] lg:py-[30px] py-[20px]  xl:px-[35px] lg:px-[25px] px-[18px] gap-2 xl:mb-[22.34px] mb-[14px] min-h-[120px]"
              style={{
                backgroundImage: `url(${signinBlur})`,
                backgroundSize: "cover",
              }}
            >
              <div className="yellowBar bg-[#FBC700] w-[90%] rounded-xl items-center py-[10px] xl:px-[20px] px-[14px] gap-2 mb-[22.34px] flex">
                <img src={thumbsUp} alt="" />
                <div>
                  <h6 className="xl:text-20 lg:text-18 md:text-16">
                    Lorem Ipsum is simply
                  </h6>
                </div>
              </div>
              <h6 className="flex-1 xl:text-20 lg:text-18 md:text-16 font-normal leading-[24px] mt-[10px] text-primary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </h6>
            </div>
          </div>
        </div>
        <div className="xl:min-w-[650px] min-w-[auto] signUpRight xl:w-[50%] lg:w-[55%] w-[100%] xl:py-[25px] py-[18px] xl:px-[51px] lg:px-[30px] px-[20px]">
          <div className="signUpHead flex justify-start xl:mb-[46px] lg:mb-[30px] mb-[20px]">
            <img
              src={houtLogo}
              onClick={() => navigate("/")}
              alt=""
              className="xl:w-[160px] xl:h-[46px] cursor-pointer lg:w-[140px] lg:h-[40px] w-[120px] h-[35px] object-cover"
            />
          </div>
          <div className="signUpFormSec max-w-[400px] mx-auto">
            <div className="text-center xl:mb-[42px] lg:mb-[30px] mb-[20px]">
              <h4 className="xl:text-36 lg:text-24 text-20 font-semibold">
                Reset Password
              </h4>
              <span className="xl:text-15 text-14 text-gray-500 block font-normal"></span>
            </div>
            <Formik
              initialValues={{
                new_password: "",
                confirm_password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  <div className="formSec">
                    <div className="mb-[23px]">
                      <Field
                        required
                        placeholder="New Password"
                        type="password"
                        name="new_password"
                        component={FormikField}
                      />
                    </div>
                    <div className="mb-[23px]">
                      <Field
                        required
                        placeholder="Confirm Password"
                        type="password"
                        name="confirm_password"
                        component={FormikField}
                      />
                    </div>
                    <div className="w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#FBC700] block text-black text-center xl:py-[16px] lg:py-[16px] py-[12px] px-[25px] w-full font-semibold mb-[23px] xl:text-[18px] text-[16px]"
                      >
                        {isSubmitting ? "Loading..." : "Reset Password"}
                      </button>
                      <span className="flex justify-end text-14">
                        Don't have an account?{" "}
                        <a
                          onClick={() => navigate("/sign-up")}
                          className="text-[#FBC700] ml-1 font-semibold cursor-pointer"
                        >
                          Sign up!
                        </a>
                      </span>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
