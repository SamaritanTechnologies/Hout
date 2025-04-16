import React, { useState, useEffect } from "react";
import {
  addPrivacyPolicies,
  getPrivacyPolicy,
} from "../redux/actions/dashboardActions";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import RichTextEditor from "../components/Common/RichTextEditor";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import { toast } from "react-toastify";

export const AdminPrivacyPolicy = () => {
  const [policy, setPolicy] = useState({
    description_en: "",
    description_nl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const data = await getPrivacyPolicy();
        if (data) {
          setPolicy({
            description_en: data.description_en,
            description_nl: data.description_nl,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch privacy policy");
        console.error("Error fetching privacy policy:", error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await addPrivacyPolicies(policy);
      toast.success("Privacy policy saved successfully!");
    } catch (error) {
      toast.error("Failed to save Privacy Policy");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setPolicy((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Privacy Policy
      </h2>
      <div className="flex flex-col max-w-[848px] mx-auto gap-10">
        <div className="flex gap-4">
          <div className="w-1/2 relative">
            <RichTextEditor
              name="description_nl"
              label="Privacy Policy"
              value={policy.description_nl}
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
              name="description_en"
              label="Privacy Policy"
              value={policy.description_en}
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
