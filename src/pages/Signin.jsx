import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  axiosApi,
  setAccessToken,
  BASE_URL,
  setRefreshToken,
} from "../providers";
import { toast } from "react-toastify";

import signInRight from "../assets/authImages/signInRight.svg";
import houtLogo from "../assets/new-logo.png";
import googleIcon from "../assets/authImages/googleIcon.svg";
import faceBookIcon from "../assets/authImages/faceBookIcon.svg";
import appleIcon from "../assets/authImages/appleIcon.svg";
import grayLine from "../assets/authImages/grayLine.svg";
import thumbsUp from "../assets/authImages/thumbsUp.svg";
import signinBlur from "../assets/authImages/signinBlur.png";
import InputField from "../components/Common/InputField";
import Switch from "../components/Common/Switch";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux";

export const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormData = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setBtnLoading(true);

    let data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axiosApi.post("/accounts/login/", data);
      const { access_token, refresh_token, user } = response.data;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      dispatch(loginUser(user));

      setTimeout(() => {
        if (user.is_superuser) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 500);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Wrong credentials!";
      toast.error(errorMessage);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
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
                className=" yellowBar absolute bottom-[20%] left-[50%] translate-x-[-50%]  xl:w-[70%] lg:w-[80%] w-[90%]  rounded-lg   xl:py-[40px] lg:py-[30px] py-[20px]  xl:px-[35px] lg:px-[25px] px-[18px] gap-2 xl:mb-[22.34px] mb-[14px] min-h-[120px]"
                style={{
                  backgroundImage: `url(${signinBlur})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="yellowBar  bg-[#FBC700] w-[90%]  rounded-xl items-center py-[10px] xl:px-[20px] px-[14px] gap-2 mb-[22.34px] flex">
                  <img src={thumbsUp} alt="" />
                  <div>
                    <h6
                      className="xl:text-20 lg:text-18 md:text-16
"
                    >
                      Lorem Ipsum is simply
                    </h6>
                  </div>
                </div>
                <h6
                  className="flex-1 xl:text-20 lg:text-18 md:text-16
 font-normal leading-[24px]  mt-[10px] text-primary"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.{" "}
                </h6>
              </div>
            </div>
          </div>
          <div className="xl:min-w-[650px] min-w-[auto] signUpRight xl:w-[50%] lg:w-[55%] w-[100%] xl:py-[25px] py-[18px] xl:px-[51px] lg:px-[30px] px-[20px]">
            <div className="signUpHead xl:mb-[46px] lg:mb-[30px] mb-[20px] max-w-[400px] mx-auto">
              <img
                src={houtLogo}
                onClick={() => navigate("/")}
                alt=""
                className=" xl:h-[50px] cursor-pointer mt-4 lg:w-[160px] lg:h-[40px] w-[120px] h-[35px] object-cover"
              />
            </div>
            <div className="signUpFormSec max-w-[400px] mx-auto">
              <div className="text-center xl:mb-[42px] lg:mb-[30px] mb-[20px]">
                <h4 className="xl:text-36 lg:text-24 text-20 font-semibold">
                  Welcome Back
                </h4>
                <span className="xl:text-15 text-14 text-gray-500 block font-normal	">
                  Login into your account
                </span>
              </div>
              <form className="w-full" onSubmit={handleLogin}>
                {/* social auth row  */}
                <div className="mx-auto socialAuthRow flex gap-2.5 mb-[12px]">
                  <a
                    href={`${BASE_URL}/accounts/google/login/?process=login`}
                    className="flex-1 flex gap-2 items-center rounded-md	xl:px-[20px] lg:px-[16px] px-[4px] xl:py-[10px] lg:py-[8px] py-[6px] text-center text-12 font-medium font-footer1"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <img src={googleIcon} alt="" />
                    <span> Google </span>
                  </a>
                  <a
                    href={`${BASE_URL}/accounts/facebook/login/?process=login`}
                    className="flex-1 flex gap-2 items-center rounded-md		xl:px-[20px] lg:px-[16px] px-[4px] xl:py-[10px] lg:py-[8px] py-[6px] text-center text-12 font-medium font-footer1"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <img src={faceBookIcon} alt="" />
                    <span> Facebook </span>
                  </a>
                  <a
                    href={`${BASE_URL}/accounts/apple/login/?process=login`}
                    className="flex-1 flex gap-2 items-center rounded-md xl:px-[20px] lg:px-[16px] px-[4px] xl:py-[10px] lg:py-[8px] py-[6px] text-center text-12 font-medium font-footer1"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <img src={appleIcon} alt="" />
                    <span> Apple </span>
                  </a>
                </div>

                <div className="flex justify-between items-center xl:mb-[24px] mb-[15px]">
                  <div className="w-[32%]">
                    <img src={grayLine} alt="" />
                  </div>
                  <h5 className="w-[32%] text-[13px] xs:text-12 text-center font-footer1 font-normal">
                    or continue with{" "}
                  </h5>
                  <div className="w-[32%]">
                    <img src={grayLine} alt="" />
                  </div>
                </div>
                <div className="formSec">
                  <div className="mb-[23px]">
                    <InputField
                      required
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormData}
                    />
                  </div>
                  <div className="mb-[23px]">
                    <InputField
                      required
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleFormData}
                    />
                  </div>

                  <div className="recPasswrd xl:mb-[30px] mb-[15px] flex w-full justify-between">
                    <Switch />
                    <a
                      onClick={() => navigate("/forget-password")}
                      className="text-14 font-footer1 text-[#D93F21] cursor-pointer"
                    >
                      Recover Password{" "}
                    </a>{" "}
                  </div>

                  <div className="w-full ">
                    <button
                      type="submit"
                      disabled={btnLoading}
                      className="bg-[#FBC700] block text-black text-center xl:py-[16px] lg:py-[16px] py-[12px] px-[25px] w-full font-semibold mb-[23px] xl:text-[18px] text-[16px]"
                    >
                      {btnLoading ? "Loading..." : "Log In"}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
