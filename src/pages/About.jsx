import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import gridGroup from "../assets/about/gridGroup.svg";
import QualitySection from "../components/Common/QualitySection";
import Ratings from "../components/Common/Rating";
import { axiosApi } from "../providers";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    getAboutData();
  }, []);

  const getAboutData = async () => {
    try {
      const response = await axiosApi.get("/about-us/");
      // Check if response data is a string (assuming HTML content is returned as a string)
      if (
        typeof response.data === "string" &&
        response.data?.trim()?.startsWith("<")
      ) {
        setData(response.data);
      } else {
        console.error("Invalid HTML content received");
      }
    } catch (error) {
      console.error("Error fetching About Data", error);
    }
  };

  return (
    <>
      <section className="about flex justify-center items-center ">
        <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
          <div className="text-white text-48 font-medium">About US </div>
          <div className="text-white flex items-center justify-center gap-x-3 pt-5 ">
            <div className="flex items-center gap-x-3">
              <p className="cursor-pointer" onClick={() => navigate("/")}>
                Home
              </p>{" "}
              <img src={rightArrow} />
            </div>
            <div>About us</div>
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-2  lg:grid-cols-2  md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1   px-[100px] lg:px-[60px] md:px[40px] sm:px-[30px] xs:px-[20px]  pt-[100px] gap-x-4 ">
        <section className="w-full">
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </section>
        <section className="xl:w-[100%] lg:w-[100%]  w-[100%]     md:pt-10 sm:pt-10 xs:pt-10 ">
          <img src={gridGroup} />
        </section>
      </section>

      <div className="pt-[65px]">
        {" "}
        <Ratings />
      </div>
      <div className="pt-[121px]">
        {" "}
        <QualitySection />
      </div>
    </>
  );
};
