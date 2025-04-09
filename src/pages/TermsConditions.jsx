import React, { useEffect, useState } from "react";
import rightArrow from "../assets/shopPage/rightArrow.svg";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getTermsCondition } from "../redux/actions/userActions";

export const TermsConditions = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchTermsConditions = async () => {
      try {
        const data = await getTermsCondition();
        setData(DOMPurify.sanitize(data.description_en));
      } catch (error) {
        console.error("Error fetching terms and conditions", error);
        setData(
          "<p className='text-center'>Failed to load terms and conditions.</p>"
        );
      }
    };

    fetchTermsConditions();
  }, []);

  return (
    <>
      <section className="about flex justify-center items-center ">
        <div className="w-[320px] m-auto  text-center bg-transparentGray text-white py-[35px] rounded-lg ">
          <div className="text-white text-48 font-medium">
            Terms and Conditions{" "}
          </div>
          <div className="text-white flex items-center justify-center gap-x-3 pt-5 ">
            <div className="flex items-center gap-x-3">
              <Link to="/">Home</Link>
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
