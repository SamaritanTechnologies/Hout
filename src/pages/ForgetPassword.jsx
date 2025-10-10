import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import FormikField from "../components/Common/FormikField";

import signInRight from "../assets/authImages/signInRight.svg";
import houtLogo from "../assets/authImages/houtLogo.svg";
import googleIcon from "../assets/authImages/googleIcon.svg";
import faceBookIcon from "../assets/authImages/faceBookIcon.svg";
import appleIcon from "../assets/authImages/appleIcon.svg";
import grayLine from "../assets/authImages/grayLine.svg";
import thumbsUp from "../assets/authImages/thumbsUp.svg";
import signinBlur from "../assets/authImages/signinBlur.png";
import InputField from "../components/Common/InputField";
import Switch from "../components/Common/Switch";
import { resetPasswordLink } from "../redux/actions/profileActions";
import { useTranslation } from "react-i18next";
import { getForgotImage } from "../redux/actions/dashboardActions";

// Define validation schema using Yup

export const ForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const [data, setData] = useState();
  const fetchImage = async () => {
    try {
      const response = await getForgotImage();
      setData(response);
      console.log("signindata", response);
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const loginUser = async (values, { setSubmitting }) => {
    try {
      await resetPasswordLink(values, { setSubmitting });
      navigate("/sign-in");
      resetForm(false);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <div className="signUpMain flex flex-row-reverse md:flex-col sm:flex-col xs:flex-col min-h-screen">
          <div className="signUpLeft xl:w-[50%] lg:w-[50%] w-full relative">
            <img
              src={data?.image}
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
                      {currentLang == "en"
                        ? data?.heading_en
                        : data?.heading_nl}
                    </h6>
                  </div>
                </div>
                <h6 className="flex-1 xl:text-20 lg:text-18 md:text-16 font-normal leading-[24px] mt-[10px] text-primary">
                  {currentLang == "en" ? data?.text_en : data?.text_nl}
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
                  {t("f_forget_password")}
                </h4>
                <span className="xl:text-15 text-14 text-gray-500 block font-normal">
                  {t("f_enter_email_to_receive_reset_link")}
                </span>
              </div>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Email is required"),
                })}
                onSubmit={loginUser}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="w-full">
                    <div className="formSec">
                      <div className="mb-[23px]">
                        <Field
                          name="email"
                          type="email"
                          placeholder={t("f_placeholder_enter_email")}
                          className={`input-field`}
                          component={FormikField}
                        />
                      </div>

                      <div className="w-full ">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#FBC700] block text-black text-center xl:py-[16px] lg:py-[16px] py-[12px] px-[25px] w-full font-semibold mb-[23px] xl:text-[18px] text-[16px]"
                        >
                          {isSubmitting
                            ? t("f_button_submitting")
                            : t("f_button_submit")}
                        </button>
                        <span className="flex justify-end text-14">
                          {t("f_dont_have_account")}
                          <a
                            onClick={() => navigate("/sign-up")}
                            className="text-[#FBC700] ml-1 font-semibold cursor-pointer"
                          >
                            {t("f_sign_up")}
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
    </>
  );
};
