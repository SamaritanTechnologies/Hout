import React, { useState, useEffect } from "react";
import { getOurValues, addOurValues } from "../redux/actions/dashboardActions";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import RichTextEditor from "../components/Common/RichTextEditor";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";

export const OurValues = () => {
  const [values, setValues] = useState({
    description_en: "",
    description_nl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOurValues = async () => {
      try {
        const data = await getOurValues();
        setValues({
          description_en: data.description_en,
          description_nl: data.description_nl,
        });
      } catch (error) {
        console.error("Error fetching Our Values:", error);
      }
    };

    fetchOurValues();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await addOurValues(values);
    } catch (error) {
      console.error("Error updating Our Values:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (label, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [label === "Onze Waarden" ? "description_nl" : "description_en"]: value,
    }));
  };

  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center mb-6">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">Our Values</h5>
      </div>

      <div className="flex gap-8 pl-[54px] w-full">
        <div className="w-1/2 relative">
          <RichTextEditor
            label="Onze Waarden"
            value={values.description_nl}
            onChange={(value) => handleChange("Onze Waarden", value)}
          />
          <img
            src={countryflag}
            alt="Flag"
            className="cursor-pointer h-5 w-5 absolute right-[6px] top-[60px]"
          />
        </div>
        <div className="w-1/2 relative">
          <RichTextEditor
            label="Our Values"
            value={values.description_en}
            onChange={(value) => handleChange("Our Values", value)}
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