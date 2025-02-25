import React, { useEffect, useState } from "react";
import { addAboutUs, getAboutUs } from "../redux/actions/dashboardActions";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import { Formik, Form, Field } from "formik"; 
import Textarea from "../components/Common/Textarea";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import { toast } from "react-toastify";

export const AdminAboutUs = () => {
  const [initialData, setInitialData] = useState({
    description_en: "",
    description_nl: "",
  });
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); 

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const data = await getAboutUs();
        if (data) {
          setInitialData({
            description_en: data.description_en,
            description_nl: data.description_nl,
          });
          setDataLoaded(true);
          toast.success("About Us fetched successfully!");
        }
      } catch (error) {
        toast.error("Failed to fetch About Us");
        console.error("Error fetching About Us:", error);
      }
    };

    fetchAboutUs();
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await addAboutUs(values);
      toast.success("About Us saved successfully!");
    } catch (error) {
      toast.error("Failed to save About Us");
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center mb-6">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">About Us</h5>
      </div>

      {/* Formik Wrapper */}
      <Formik
        initialValues={initialData} 
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex gap-8 pl-[54px] w-full">
              <div className="w-1/2 relative">
                <Field
                  name="description_nl"
                  placeholder="Description (nl)"
                  component={Textarea}
                  rows="12"
                />
                <img
                  src={countryflag}
                  alt="Flag"
                  className="cursor-pointer h-5 w-5 absolute right-[6px] top-[10px]"
                />
              </div>
              <div className="w-1/2 relative">
                <Field
                  name="description_en"
                  placeholder="Description (en)"
                  component={Textarea}
                  rows="12"
                />
                <img
                  src={countryflag2}
                  alt="Flag"
                  className="cursor-pointer h-5 w-5 absolute right-[6px] top-[10px]"
                />
              </div>
            </div>

            <Button
              loading={loading || isSubmitting}
              type="submit"
              btnText="Save"
              textColor="#000000"
              breakpoint="xl:w-[354px] lg:w-[280px] w-[240px] mt-[40px] ml-[54px]"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};