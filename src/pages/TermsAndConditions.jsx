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
import { toast } from "react-toastify";

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
        toast.success("Terms & Conditions fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch Terms & Conditions!");
        console.error("Error fetching privacy policy:", error);
      }
    };

    fetchTermsAndConditions();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await addTermsCondition(termsCondition);
      toast.success("Terms & Conditions saved successfully!");
    } catch (error) {
      toast.error("Failed to save Terms & Conditions!");
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
    <div className="flex flex-col gap-12 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Terms and Conditions
      </h2>
      <div className="flex flex-col gap-10 w-full max-w-[848px] mx-auto">
        <div className="flex gap-4">
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
          breakpoint="w-full max-w-[280px]"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};
