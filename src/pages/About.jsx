import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import gridGroup from "../assets/about/gridGroup.svg";
import QualitySection from "../components/Common/QualitySection";
import Ratings from "../components/Common/Rating";
import { axiosApi } from "../providers";
import { useNavigate } from "react-router-dom";
import { getAboutUs } from "../redux/actions/dashboardActions";
import { toast } from "react-toastify";

export const About = () => {
  const navigate = useNavigate();
  const [aboutUs, setAbouUs] = useState("");

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const data = await getAboutUs();
        setAbouUs(data)
      } catch (error) {
        toast.error("Failed to fetch About Us");
        console.error("Error fetching About Us:", error);
      }
    };
    fetchAboutUs();
  }, []);

  return (
    <>
      <section className="about flex justify-center items-center ">
        <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
          <div className="text-white text-30 md:tex-40 lg:text-44 xl:text-48 font-medium">About US </div>
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
          {aboutUs.description_en}
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
