import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getTermsCondition } from "../redux/actions/userActions";
import { getTermAndConditionsImage } from "../redux/actions/dashboardActions";
import { useTranslation } from "react-i18next";

export const TermsConditions = () => {
  const [data, setData] = useState("");
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchTermsConditions = async () => {
      try {
        const data = await getTermsCondition();
        const lang = i18n.language;
        const description =
          lang === "nl" ? data.description_nl : data.description_en;
        setData(DOMPurify.sanitize(description));
        const heading =
          i18n.language === "nl" ? data.heading_nl : data.heading_en;
        setHeading(heading);
      } catch (error) {
        console.error("Error fetching terms and conditions", error);
        setData(
          "<p className='text-center'>Failed to load terms and conditions.</p>"
        );
      }
    };

    fetchTermsConditions();
  }, [i18n.language]);

  const fetchExistingImage = async () => {
    try {
      const response = await getTermAndConditionsImage();
      if (response?.image) {
        setImage(response.image);
      }
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  };

  useEffect(() => {
    fetchExistingImage();
  }, [fetchExistingImage]);

  return (
    <>
      <section
        className=" flex justify-center items-center "
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          minHeight: "500px",
          width: "100%",
        }}
      >
        <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
          <div className="text-white text-48 font-medium">{heading}</div>
          <div className="text-white flex items-center justify-center gap-x-3 pt-5 ">
            <div className="flex items-center gap-x-3">
              <Link to="/">Home</Link>
              <img src={rightArrow} />
            </div>
            <div>{heading}</div>
          </div>
        </div>
      </section>

      <section className="min-h-48 w-full p-16 pb-24">
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </section>
    </>
  );
};
