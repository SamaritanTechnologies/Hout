import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { axiosApi } from "../providers";
import { useNavigate } from "react-router-dom";

export const TermsConditions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    getTermsConditions();
  }, []);

  const getTermsConditions = async () => {
    try {
      const response = await axiosApi.get("/terms&condition/");
      // Check if response data is a string (assuming HTML content is returned as a string)
      if (
        typeof response.data === "string" &&
        response.data?.trim()?.startsWith("<")
      ) {
        setData(response.data);
      } else {
        console.error("Invalid HTML content received");
        setData(
          "<p class='text-center'>Content is not available at the moment.</p>"
        );
      }
    } catch (error) {
      console.error("Error fetching terms and conditions", error);
    }
  };

  return (
    <>
      <section className="about flex justify-center items-center ">
        <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
          <div className="text-white text-48 font-medium">
            Terms and Conditions{" "}
          </div>
          <div className="text-white flex items-center justify-center gap-x-3 pt-5 ">
            <div className="flex items-center gap-x-3">
              <p className="cursor-pointer" onClick={() => navigate("/")}>
                Home
              </p>{" "}
              <img src={rightArrow} />
            </div>
            <div>Terms and Conditions</div>
          </div>
        </div>
      </section>

      <section className="min-h-48 w-full p-16">
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </section>
    </>
  );
};
