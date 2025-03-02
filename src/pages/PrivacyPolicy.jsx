import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getPrivacyPolicy } from "../redux/actions/userActions";

export const PrivacyPolicy = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const data = await getPrivacyPolicy();
      setData(DOMPurify.sanitize(data.description_en));
    } catch (error) {
      console.error("Error fetching privacy policy", error);
      setData("<p className='text-center'>Failed to load Privacy Policy.</p>");
    }
  };

  return (
    <>
      <section className="about flex justify-center items-center !pt-18 ">
        <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
          <div className="text-white text-48 font-medium">Privacy Policy </div>
          <div className="text-white flex items-center justify-center gap-x-3 pt-5 ">
            <div className="flex items-center gap-x-3">
              <Link to="/">Home</Link>
              <img src={rightArrow} />
            </div>
            <div>Privacy Policy</div>
          </div>
        </div>
      </section>


      <section className="min-h-48 w-full p-16">
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </section>
    </>
  );
};
