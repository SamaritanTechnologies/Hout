import React, { useEffect, useState } from "react";
import {
  addTermsCondition,
  getTermsCondition,
} from "../redux/actions/dashboardActions";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import RichTextEditor from "../components/Common/RichTextEditor";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";

export const TermsAndConditions = () => {
  const [termsCondition, setTermsCondition] = useState({
    description_nl: "",
    description_en: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const data = await getTermsCondition();
        if (data) {
          setTermsCondition({
            description_en: data.description_en,
            description_nl: data.description_nl,
          });
        }
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      }
    };

    fetchTermsAndConditions();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await addTermsCondition(termsCondition);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setTermsCondition((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center mb-6">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
          Terms and Conditions
        </h5>
      </div>

      <div className="flex gap-8 pl-[54px] w-full">
        <div className="w-1/2 relative">
          <RichTextEditor
            label="Algemene Voorwaarden"
            name="description_nl"
            value={termsCondition.description_nl} // Ensure the editor is controlled
            onChange={(value) => handleChange("description_nl", value)}
          />
          <img
            src={countryflag}
            alt="Flag"
            className="cursor-pointer h-5 w-5 absolute right-[6px] top-[60px]"
          />
        </div>

        <div className="w-1/2 relative">
          <RichTextEditor
            label="Terms and Conditions"
            name="description_en"
            value={termsCondition.description_en} // Ensure the editor is controlled
            onChange={(value) => handleChange("description_en", value)}
          />
          <img
            src={countryflag2}
            alt="Flag"
            className="cursor-pointer h-5 w-5 absolute right-[6px] top-[60px]"
          />
        </div>
      </div>

      <Button
        loading={loading}
        type="submit"
        btnText="Save"
        paddingX="20px"
        textColor="#000000"
        breakpoint="xl:w-[354px] lg:w-[280px] w-[240px] ml-[54px] mt-[100px]"
        onClick={handleSave}
      />
    </div>
  );
};
