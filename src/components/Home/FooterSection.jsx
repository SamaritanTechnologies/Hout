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
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils/helper";
import {
  getOpeningHours,
  subscribeToNewsletter,
} from "../../redux/actions/userActions";

const FooterSection = ({ isShow }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openingHour, setOpeningHour] = useState([]);
  const [email, setEmail] = useState();

  useEffect(() => {
    const fetchOpeningHours = async () => {
      try {
        const data = await getOpeningHours();
        setOpeningHour(data);
      } catch (error) {
        console.error("Error fetching opening hours:", error);
        toast.error("An error occurred while fetching data: " + error.message);
      }
    };

    fetchOpeningHours();
  }, []);

  const handleNewsLetter = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email."); // Use toaster for error
      return;
    }
    setLoading(true);
    try {
      const response = await subscribeToNewsletter({ email });
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <footer className="bg-[#E9E6D6] relative">
        <div className="w-full max-w-[1130px] absolute top-[-72px] left-1/2 right-1/2 transform -translate-x-1/2 bg-white rounded-2xl gap-x-3 p-5 xl:px-10 xl:py-7">
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                  placeholder="Enter Email Address"
                  className="bg-[#F5F4F8] flex-grow input-field text-[#111727] rounded-tl-[12px] rounded-bl-[12px] rounded-tr-[0px] rounded-br-[0px] focus:outline-none text-base p-[18px_30px]"
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
        </div>

        {/* footer top end */}
        <div className="xs:pt-[200px] sm:pt-[200] pt-[120px] pb-[37px] max-w-[1240px] mx-auto px-[30px]">
          <img src={footerLogo} className="w-[160px] h-[60px]" />
        </div>
        <div className="footer-content p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-7 pt-4 max-w-[1308px] mx-auto">
            <div className="flex flex-col gap-5">
              <h3 className="text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px] mb-1">
                Home
              </h3>
              <div
                className="text-sm text-[#111727] cursor-pointer "
                onClick={() => {
                  scrollToTop();
                  navigate("/");
                }}
              >
                Home
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer "
                onClick={() => {
                  scrollToTop();
                  navigate("/about");
                }}
              >
                About Us
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer"
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
                className="text-sm text-[#111727] cursor-pointer"
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
              <div
                className="text-sm text-[#111727] cursor-pointer"
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
                className="text-sm text-[#111727] cursor-pointer"
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
                className="text-sm text-[#111727] cursor-pointer"
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
                className="text-sm text-[#111727] cursor-pointer"
                onClick={() => {
                  navigate("/terms-conditions");
                  scrollToTop();
                }}
              >
                <Link to="/terms-conditions">Terms & Conditions</Link>
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer"
                onClick={() => {
                  navigate("/privacy-policy");
                  scrollToTop();
                }}
              >
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer "
                onClick={() => {
                  navigate("/faq");
                  scrollToTop();
                }}
              >
                <Link to="/faq">Customer Support/Faq</Link>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="mb-1 text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px]">
                Opening Hours
              </h3>
              {openingHour.weekday_text?.map((item, index) => (
                <div key={index} className="text-sm text-[#111727]">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="mb-1 text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px]">
                Contact Us
              </h3>
              <div className="flex items-start gap-x-5 text-[#111727] text-sm vietnam ">
                {" "}
                <img src={location} /> Lageweg 35K <br />
                2222AG Katwijk aan Zee <br />
                The Netherlands{" "}
              </div>
              <div className="flex items-center text-[#111727] text-sm gap-x-5 vietnam ">
                <img src={whatsp} /> +31 63 396 60 02
              </div>
              <div className="flex items-center text-[#111727] text-sm gap-x-5 vietnam ">
                <img src={phone} /> +31 71 203 40 90
              </div>
              <a
                href="mailto:info@makeyourplank.nl"
                className="flex items-center text-[#111727] text-sm gap-x-5 vietnam cursor-pointer"
              >
                <img src={emailFooter} alt="Email Icon" /> info@houttotaal.nl
              </a>
              <div className="flex items-center text-[#111727] text-sm gap-x-6">
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

            <div className="flex flex-col gap-5">
              <h3 className="mb-1 text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px]">
                Chamber of Commerce
              </h3>
              <div className="text-sm text-[#111727]">61392421</div>
              <div className="text-sm text-[#111727] font-semibold">Bank</div>
              <div className="text-sm text-[#111727]">
                NL65 BUNQ 2064 2611 33
              </div>
              <div className="pay-button">
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
        </div>
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
