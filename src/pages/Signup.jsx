import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../providers";
import { toast } from "react-toastify";

import signUpLeft from "../assets/authImages/signUpLeft.svg";
import houtLogo from "../assets/new-logo.png";
import googleIcon from "../assets/authImages/googleIcon.svg";
import faceBookIcon from "../assets/authImages/faceBookIcon.svg";
import appleIcon from "../assets/authImages/appleIcon.svg";
import grayLine from "../assets/authImages/grayLine.svg";
import blackRin from "../assets/authImages/blackRin.svg";
import whiteRin from "../assets/authImages/whiteRin.svg";
import microscope from "../assets/authImages/microscope.svg";
import slBlurBg from "../assets/authImages/slBlurBg.png";
import InputField from "../components/Common/InputField";
import { useTranslation } from "react-i18next";
import { getSignupImage } from "../redux/actions/dashboardActions";

export const Signup = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirm_password: "",
  });
  const [data, setData] = useState();

  const fetchImage = async () => {
    try {
      const response = await getSignupImage();
      setData(response);
      console.log("signindata", response);
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleFormData = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value, formData.confirm_password);
    } else if (name === "confirm_password") {
      validatePassword(formData.password, value);
    }
  };

  // const validateForm = () => {
  //   if (Object.values(formData).some((field) => field.trim() === "")) {
  //     toast.error("Please fill in all fields");
  //     return false;
  //   }

  //   return true;
  // };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (Object.values(formData).some((field) => field.trim() === "")) {
      toast.error("Please fill in all fields");
      isValid = false;
    }

    validatePassword(formData.password, formData.confirm_password);

    if (errors.password || errors.confirm_password) {
      isValid = false;
    }

    return isValid;
  };

  const validatePassword = (password, confirmPassword) => {
    const newErrors = { ...errors };

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password =
        "Password must contain at least one special character";
    } else {
      newErrors.password = "";
    }

    // Confirm password validation
    if (password !== confirmPassword && confirmPassword) {
      newErrors.confirm_password = "Passwords do not match";
    } else {
      newErrors.confirm_password = "";
    }

    setErrors(newErrors);
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setBtnLoading(true);

    let data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      company_name: formData.companyName,
      phone: formData.phone,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    try {
      const response = await axiosApi.post("/accounts/sign_up/", data);
      setBtnLoading(false);
      toast.success("Thank you for sign up! Please check your email.");
      setTimeout(() => {
        navigate("/sign-in");
      }, 1000);
    } catch (error) {
      setBtnLoading(false);
      if (error?.response?.data?.email) {
        toast.error(error?.response?.data?.email[0]);
      } else {
        toast.error("Something went wrong, Try Again");
      }
    }
  };

  return (
    <div className="pb-20">
      <div className="signUpMain flex min-h-screen flex-row md:flex-col sm:flex-col xs:flex-col">
        <div className="signUpLeft w-[50%] md:w-full sm:w-full xs:w-full relative">
          <img
            src={data?.image}
            alt="signupleftImg"
            className="w-[100%] min-h-[142px] h-full object-cover"
          />
          <div>
            <div className=" yellowBar absolute xl:top-[35%] lg:top-[30%] md:top-[10%] sm:top-[20%] xs:top-[20%] left-[50%] translate-x-[-50%]  bg-[#FBC700] w-[291px] rounded-[48px] flex items-center p-3 gap-6 mb-[22.34px]">
              <div className="w-[40px] h-[38px] rounded-[50%] grid place-items-center bg-[#00000066]">
                <img src={blackRin} alt="" />
              </div>
              <h6
                className="flex-1 xl:text-20 lg:text-18 md:text-16
 font-medium"
              >
                {currentLang == "en" ? data?.heading_en : data?.heading_nl}
              </h6>
            </div>
            <div
              className=" absolute top-[43%] md:top-[30%] sm:top-[35%] xs:top-[35%]  left-[50%] translate-x-[-50%]  w-[291px]  rounded-lg   xl:py-[21px] py-[12px] xl:px-[25px] lg:px-[18px] px-[10px] gap-2 mb-[22.34px] min-h-[120px]"
              style={{ backgroundImage: `url(${slBlurBg})` }}
            >
              <div className="w-[56px] h-[51px] rounded-lg  grid place-items-center  p-[6px] bg-[#000]">
                <img src={microscope} alt="" className="mb-[5px]" />
              </div>
              <h6
                className="flex-1 xl:text-20 lg:text-18 md:text-16
 font-normal leading-[24px]  mt-[10px] text-primary"
              >
                {currentLang == "en" ? data?.text_en : data?.text_nl}
              </h6>
            </div>
            {/* <div className=" grayBar absolute xl:top-[50%] lg:top-[65%] md:top-[70%]  sm:top-[70%] xs:top-[70%] xl:right-[-10%] lg:right-[1%] md:right-[50%] sm:right-[50%] xs:right-[50%] translate-x-[20%] md:translate-x-[50%] sm:translate-x-[50%] xs:translate-x-[50%]  bg-[#5A5A5A] min-w-[200px] md:min-w-[291px] sm:min-w-[291px] xs:min-w-[291px]  rounded-full flex items-center xl:py-[10px] py-[5px] xl:px-[20px] px-[10px] gap-2 mb-[22.34px]">
              <div className="w-[40px] h-[38px] rounded-[50%] bg-[#9c9c9c] grid place-items-center text-white">
                <img src={whiteRin} alt="" />
              </div>
              <h6
                className="flex-1 xl:text-18 lg:text-16 text-14
 font-normal text-center text-primary	"
              >
                Lorem Ipsum is
              </h6>
            </div> */}
          </div>
        </div>
        <div className="xl:min-w-[650px] min-w-[auto] signUpRight xl:w-[50%] lg:w-[55%] w-[100%] sm:w-[100%] xs:w-[100%] xl:py-[25px] py-[18px] xl:px-[51px] lg:px-[30px] px-[20px]">
          <div className="signUpHead flex justify-end xl:mb-[46px] lg:mb-[30px] mb-[20px] ">
            <img
              src={houtLogo}
              alt=""
              onClick={() => navigate("/")}
              className="cursor-pointer  xl:h-[50px] lg:w-[160px] lg:h-[40px] w-[120px] h-[35px] object-cover"
            />
          </div>
          <div className="signUpFormSec max-w-[400px] mx-auto">
            <div className="text-center xl:mb-[42px] lg:mb-[30px] mb-[20px]">
              <h4 className="xl:text-24 lg:text-20 text-18 font-semibold">
                {t("su_get_started_with_houttotaal")}
              </h4>
              <span className="xl:text-15  text-[#7E7E7E] text-14 text-gray-500 block font-normal	">
                {t("su_getting_started_is_easy")}
              </span>
            </div>
            <form className="w-full" onSubmit={createUser}>
              {/* social auth row  */}
              <div className="socialAuthRow flex gap-3 mb-[12px]">
                <a
                  href="#"
                  className="flex-1 flex gap-2 items-center rounded-md	xl:px-[20px] lg:px-[16px] px-[4px] xl:py-[10px] lg:py-[8px] py-[6px] text-center text-12 font-medium font-footer1"
                  style={{ border: "1px solid #ccc" }}
                >
                  <img src={googleIcon} alt="" />
                  <span> Google </span>
                </a>
                <a
                  href="#"
                  className="flex-1 flex gap-2 items-center rounded-md		xl:px-[20px] lg:px-[16px] px-[4px] xl:py-[10px] lg:py-[8px] py-[6px] text-center text-12 font-medium font-footer1"
                  style={{ border: "1px solid #ccc" }}
                >
                  <img src={faceBookIcon} alt="" />
                  <span> Facebook </span>
                </a>
                <a
                  href="#"
                  className=" flex-1 flex gap-2 items-center rounded-md xl:px-[20px] lg:px-[16px] px-[4px] xl:py-[10px] lg:py-[8px] py-[6px] text-center text-12 font-medium font-footer1"
                  style={{ border: "1px solid #ccc" }}
                >
                  <img src={appleIcon} alt="" />
                  <span> Apple </span>
                </a>
              </div>

              <div className="flex justify-between items-center mb-[24px]">
                <div className="w-[32%]">
                  <img src={grayLine} alt="" />
                </div>
                <h5 className="w-[32%] text-13 xs:text-12 text-center font-normal">
                  {t("su_or_continue_with")}
                </h5>
                <div className="w-[32%]">
                  <img src={grayLine} alt="" />
                </div>
              </div>
              <div className="formSec">
                <div className="mb-[23px]">
                  <InputField
                    required
                    placeholder={t("su_placeholder_first_name")}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormData}
                  />
                </div>
                <div className="mb-[23px]">
                  <InputField
                    required
                    placeholder={t("su_placeholder_last_name")}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormData}
                  />
                </div>
                <div className="mb-[23px]">
                  <InputField
                    required
                    placeholder={t("su_placeholder_company_name")}
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleFormData}
                  />
                </div>
                <div className="mb-[23px]">
                  <InputField
                    required
                    placeholder={t("su_placeholder_enter_email")}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormData}
                  />
                </div>
                <div className="mb-[23px]">
                  <InputField
                    required
                    placeholder={t("su_placeholder_phone_number")}
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormData}
                  />
                </div>{" "}
                <div className="mb-[23px]">
                  <InputField
                    required
                    placeholder={t("su_placeholder_password")}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormData}
                  />
                  {errors.password && (
                    <p className="text-red text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                <div className="mb-[23px]">
                  <InputField
                    required
                    type="password"
                    placeholder={t("su_placeholder_confirm_password")}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleFormData}
                  />
                  {errors.confirm_password && (
                    <p className="text-red text-xs mt-1">
                      {errors.confirm_password}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <button
                    type="submit"
                    onClick={createUser}
                    disabled={btnLoading}
                    className="bg-[#FBC700] block text-black text-center xl:py-[16px] lg:py-[16px] py-[12px] px-[25px] w-full font-semibold mb-[23px] xl:text-[18px] text-[16px]"
                  >
                    {btnLoading
                      ? t("su_button_loading")
                      : t("su_button_create_account")}
                  </button>
                  <span className="flex justify-end text-14">
                    {t("su_have_account")}
                    <a
                      onClick={() => navigate("/sign-in")}
                      className="text-customYellow  cursor-pointer  ml-1 font-semibold"
                    >
                      {t("su_sign_in")}
                    </a>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
