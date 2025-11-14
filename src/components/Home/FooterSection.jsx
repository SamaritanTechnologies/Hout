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
import { useTranslation } from "react-i18next";

const FooterSection = ({ isShow }) => {
  const { t, i18n } = useTranslation();
  console.log("Selected Lamguage", i18n.language);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openingHour, setOpeningHour] = useState([]);
  const [email, setEmail] = useState();

  useEffect(() => {
    const fetchOpeningHours = async () => {
      try {
        const data = await getOpeningHours(i18n.language);
        setOpeningHour(data);
      } catch (error) {
        console.error("Error fetching opening hours:", error);
        toast.error("An error occurred while fetching data: " + error.message);
      }
    };

    fetchOpeningHours();
  }, [i18n.language]);

  const handleNewsLetter = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const response = await subscribeToNewsletter({ email });
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      if (
        (error.response &&
          error.response.data &&
          error.response.data.error === "Contact already exist") ||
        (error.message && error.message.includes("Contact already exist"))
      ) {
        toast.error("You're already subscribed!");
      } else {
        const errorMessage = error.message || "An unexpected error occurred.";
        toast.error("Error: " + errorMessage);
      }
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
                {t("f_newsletter")}
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
                  placeholder={t("f_enter_email_placeholder")}
                  className="bg-[#F5F4F8] flex-grow input-field text-[#111727] rounded-tl-[12px] rounded-bl-[12px] rounded-tr-[0px] rounded-br-[0px] focus:outline-none text-base p-[18px_30px]"
                />
                <button
                  disabled={loading}
                  className="subscribe-btn vietnam  w-[150px] md:w-[200px] lg:w-[253px] xl:w-[253px]"
                  type="submit"
                >
                  {t("f_subscribe")}
                </button>
              </form>
            </div>
            <div className=" pt-2 pl-[15px] text-xs vietnam  text-[#000] xs:text-sm ms-0 md:ms-[140px] lg:ms-[140px] xl:ms-[140px]">
              {t("f_subscribe_description")}
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
                {t("f_home")}
              </h3>
              <div
                className="text-sm text-[#111727] cursor-pointer "
                onClick={() => {
                  scrollToTop();
                  navigate("/");
                }}
              >
                {t("f_home")}
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer "
                onClick={() => {
                  scrollToTop();
                  navigate("/about");
                }}
              >
                {t("f_about_us")}
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer"
                onClick={() => {
                  navigate("/shop-page");
                  scrollToTop();
                  // setTimeout(() => {
                  //   navigate("/");
                  //   document
                  //     .getElementById("products-section")
                  //     ?.scrollIntoView({
                  //       behavior: "smooth",
                  //     });
                  // }, 100);
                }}
              >
                {t("f_products")}
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
                {t("f_our_values")}
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
                {t("f_our_assortment")}
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
                {t("f_why_hout_total")}
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
                {t("f_contact_us")}
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer"
                onClick={() => {
                  navigate("/terms-conditions");
                  scrollToTop();
                }}
              >
                <Link to="/terms-conditions">{t("f_terms_conditions")}</Link>
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer"
                onClick={() => {
                  navigate("/privacy-policy");
                  scrollToTop();
                }}
              >
                <Link to="/privacy-policy">{t("f_privacy_policy")}</Link>
              </div>
              <div
                className="text-sm text-[#111727] cursor-pointer "
                onClick={() => {
                  navigate("/faq");
                  scrollToTop();
                }}
              >
                <Link to="/faq">{t("f_customer_support_faq")}</Link>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="mb-1 text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px]">
                {t("f_opening_hours")}
              </h3>
              {openingHour.weekday_text?.map((item, index) => (
                <div key={index} className="text-sm text-[#111727]">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="mb-1 text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px]">
                {t("f_contact_us_header")}
              </h3>
              <div className="flex items-start gap-x-5 text-[#111727] text-sm vietnam ">
                {" "}
                <img src={location} />
                {t("f_address_line1")}
                <br />
                {t("f_address_line2")} <br />
                {t("f_address_line3")}
              </div>
              <div className="flex items-center text-[#111727] text-sm gap-x-5 vietnam ">
                <img src={whatsp} /> {t("f_whatsapp")}
              </div>
              <div className="flex items-center text-[#111727] text-sm gap-x-5 vietnam ">
                <img src={phone} />
                {t("f_phone")}
              </div>
              <a
                href="mailto:info@houttotaal.nl"
                className="flex items-center text-[#111727] text-sm gap-x-5 vietnam cursor-pointer"
              >
                <img src={emailFooter} alt="Email Icon" /> {t("f_email")}
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
                  <img src={cameraFooter} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="mb-1 text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px]">
                {t("f_chamber_of_commerce")}
              </h3>
              <div className="text-sm text-[#111727]">
                {t("f_chamber_number")}
              </div>
              <div className="mb-1 text-[#111727] font-semibold text-base lg:text-xl xl:text-[22px]">
                {t("f_bank")}
              </div>
              <div className="text-sm text-[#111727]">
                {t("f_bank_account")}
              </div>
              <div className="pay-button">
                <Button
                  btnText={t("f_pay")}
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
            {t("f_copyright", { year: new Date().getFullYear() })}
          </div>
          <img src={footerLogo} className="w-[160px] h-[60px] " />
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
