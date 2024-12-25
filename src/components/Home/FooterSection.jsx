import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import location from "../../assets/HeaderAndFooter/locationFooter.svg";
import cameraFooter from "../../assets/HeaderAndFooter/cameraFooter.svg";
import emailFooter from "../../assets/HeaderAndFooter/emailFooter.svg";
import phone from "../../assets/HeaderAndFooter/phoneFooter.svg";
import footerLogo from "../../assets/new-logo.png";
import whatsp from "../../assets/HeaderAndFooter/whatspFooter.svg";
import facebook from "../../assets/HeaderAndFooter/facebookFooter.svg";
import { API_BASE_URL, axiosApi } from "../../providers";
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils/helper";
import axios from "axios";

const FooterSection = ({ isShow }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    openHours: [],
    email: "",
  });

  useEffect(() => {
    getOpeningHours();
  }, []);

  const getOpeningHours = async () => {
    try {
      // const response = await axios.get(`${API_BASE_URL}/google-opening-hours/?place=Hout Totaal`);
      const response = await axios.get(`${API_BASE_URL}/opening-hours/`);
      const sortedData = response.data?.sort((a, b) => a.order - b.order);
      setState((prev) => ({
        ...prev,
        openHours: sortedData || [],
      }));
    } catch (error) {
      // toast.error("Wrong credentials!");
    }
  };

  const handleMailToClick = (e) => {
    e.preventDefault();
    window.location.href = "mailto:info@makeyourplank.nl";
  };

  const handleNewsLetter = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosApi.post("/hubspot_subscribe/", {
        email: state.email,
      });
      if (response.status === 201 || response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          email: "",
        }));
        toast.success("Newsletter submit successfuly");
      }
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in Node.js
        toast.error("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="bg-[#E9E6D6] relative">
        <section className="w-full absolute top-[-72px] left-[50%] right-[50%] transform -translate-x-1/2 -translate-y-1/2sF justify-center bg-white rounded-2xl max-w-[95%] xl:max-w-[1130px] mx-auto gap-x-3 py-3 md:py-7 lg:py-7 xl:py-7 px-4 md:px-7 lg:px-9 xl:px-9">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-4 items-start md:items-center lg:items-center xl:items-center">
              <div className="font-semibold text-[#000] text-[25px] vietnam">
                Newsletter
              </div>
              <form
                onSubmit={handleNewsLetter}
                className="flex flex-col xs:gap-4 sm:gap-4 sm:flex-row md:flex-row lg:flex-row xl:flex-row w-full"
              >
                <input
                  type="email"
                  autoComplete={true}
                  onChange={(e) => {
                    setState((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  value={state.email}
                  required={true}
                  placeholder="Enter Email Address"
                  className="bg-[#F5F4F8] flex-grow input-field"
                />
                <button
                  disabled={loading}
                  className="subscribe-btn vietnam  w-[150px] md:w-[200px] lg:w-[253px] xl:w-[253px]"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className=" pt-2 pl-[15px] text-xs vietnam  text-[#000] xs:text-sm ms-0 md:ms-[140px] lg:ms-[140px] xl:ms-[140px]">
              Subscribe to Our Newsletter and get updated every time.
            </div>
          </div>
        </section>

        {/* footer top end */}
        <div className="xs:pt-[200px] sm:pt-[200] pt-[120px] pb-[37px] max-w-[1240px] mx-auto px-[30px]">
          <img src={footerLogo} className="w-[160px] h-[60px]" />
        </div>
        <section className="footer-content">
          <div className="flex flex-wrap justify-center sm:justify-normal gap-y-12  text-[#000] mt-7 max-w-[1240px] px-[30px] mx-auto sm:mb-4 xs:mb-4">
            <div className=" w-[100%] sm:w-[50%] md:w-[25%] lg:w-[25%] xl:w-[25%]">
              <div className="mb-6  vietnam text-[18px] md:text-[20px] lg:text-[22px] xl:text-[22px] font-semibold text-[#000]">
                Home
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer "
                onClick={() => {
                  scrollToTop();
                  navigate("/");
                }}
              >
                Home
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer "
                onClick={() => {
                  scrollToTop();
                  navigate("/about");
                }}
              >
                About Us
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    navigate("/");
                    document
                      .getElementById("products-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 100);
                }}
              >
                Products
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    navigate("/");
                    document.getElementById("our-values")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                }}
              >
                Our Values
              </div>
              <div className="mb-5"></div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    navigate("/");
                    document
                      .getElementById("assortments-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 100);
                }}
              >
                Our assortment
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    navigate("/");
                    document.getElementById("why-hout")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                }}
              >
                Why Hout Total
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    navigate("/");
                    document.getElementById("contact-us")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                }}
              >
                Contact Us
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer"
                onClick={() => {
                  navigate("/terms-conditions");
                  scrollToTop();
                }}
              >
                <Link to="/terms-conditions">Terms & Conditions</Link>
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer"
                onClick={() => {
                  navigate("/privacy-policy");
                  scrollToTop();
                }}
              >
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
              <div
                className="mb-5 text-[14px] vietnam cursor-pointer "
                onClick={() => {
                  navigate("/faq");
                  scrollToTop();
                }}
              >
                <Link to="/faq">Customer Support/Faq</Link>
              </div>
            </div>

            <div className=" w-[100%] sm:w-[50%] md:w-[25%] lg:w-[25%] xl:w-[25%]">
              <div className="mb-6 text-[18px] md:text-[20px] lg:text-[22px] xl:text-[22px] font-semibold text-[#000]">
                Opening Hours
              </div>
              {state.openHours?.map((item) => (
                <div key={item.id} className="mb-5 text-[14px] vietnam">
                  {item.hour}
                </div>
              ))}
            </div>

            <div className=" w-[100%] sm:w-[50%] md:w-[25%] lg:w-[25%] xl:w-[25%]">
              <div className="mb-6 text-[18px] vietnam  md:text-[20px] lg:text-[22px] xl:text-[22px] font-semibold text-[#000]">
                Contact Us
              </div>
              <div className="flex items-start gap-x-2 mb-5 text-[14px] vietnam ">
                {" "}
                <img src={location} /> Lageweg 35K <br />
                2222AG Katwijk aan Zee <br />
                The Netherlands{" "}
              </div>
              <div className="flex items-center mb-5 text-[14px] gap-x-2 vietnam ">
                {" "}
                <img src={whatsp} /> +316 339 66 002
              </div>
              <div className="flex items-center mb-5 text-[14px] gap-x-2 vietnam ">
                {" "}
                <img src={phone} /> +31 71 203 40 90
              </div>
              <div
                onClick={handleMailToClick}
                href="mailto:info@makeyourplank.nl"
                className="flex items-center mb-5 text-[14px] gap-x-2 vietnam  cursor-pointer"
              >
                <img src={emailFooter} /> info@makeyourplank.nl
              </div>
              <div className="flex items-center mb-5 text-[14px] gap-x-6">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    window.open("https://www.facebook.com/HoutTotaal", "_blank")
                  }
                >
                  <img src={facebook} />{" "}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/houttotaal",
                      "_blank"
                    )
                  }
                >
                  {" "}
                  <img src={cameraFooter} />
                </div>
              </div>
            </div>

            <div className=" w-[100%] sm:w-[50%] md:w-[25%] lg:w-[25%] xl:w-[25%]">
              <div className="mb-6 text-[18px] vietnam  md:text-[20px] lg:text-[22px] xl:text-[22px] font-semibold text-[#000]">
                Chamber of Commerce
              </div>
              <div className="mb-5 text-[14px] vietnam ">61392421</div>
              <div className="mb-5 text-[14px] font-semibold vietnam ">
                Bank
              </div>
              <div className="mb-5 text-[14px] vietnam ">
                {/* NL65 BUNQ 2064 2611 33 */}
              </div>
              <div className=" mt-5 pay-button">
                {" "}
                <Button
                  btnText="Pay"
                  xl:paddingX="60px"
                  lg:paddingX="30px"
                  breakpoint="w-[155px]"
                  onClick={() =>
                    window.open("https://bunq.me/houttotaal", "_blank")
                  }
                >
                  {" "}
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="copyright-sect xs:flex-col-reverse flex justify-center items-center sm:gap-[30px] xs:gap-[30px] gap-[100px] py-[30px] px-[30px]">
          <div className="text-[14px] vietnam text-[#111727s]">
            Copyright © 2024 Hout Totaal
          </div>
          <img src={footerLogo} className="w-[160px] h-[60px] " />
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
