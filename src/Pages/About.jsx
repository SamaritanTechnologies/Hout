import React from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import gridGroup from "../assets/about/gridGroup.svg";
import avatars from "../assets/about/avatars.svg";
import stars from "../assets/about/stars.svg";
import QualitySection from "../components/Common/QualitySection";
import Ratings from "../components/Common/Rating";

const About = () => {
  return (
    <>
      <section className="about flex justify-center items-center ">
        <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
          <div className="text-white text-30 md:tex-40 lg:text-44 xl:text-48 font-medium">About US </div>
          <div className="text-white flex items-center justify-center gap-x-3 pt-5 ">
            <div className="flex items-center gap-x-3">
              Home <img src={rightArrow} />
            </div>
            <div>About us</div>
          </div>
        </div>
      </section>

      <section className="flex flex-col-reverse items-center lg:items-start xl:items-start lg:flex-row xl:flex-row px-[30px] md:px-[80px] lg:px-[100px] pt-[100px] gap-y-12 gap-x-6 max-w-[1240px] mx-auto">
        <div className="text-16 flex-1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essLorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.entially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </div>
        <div className="flex-1">
          <img src={gridGroup} />
        </div>
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

export default About;
