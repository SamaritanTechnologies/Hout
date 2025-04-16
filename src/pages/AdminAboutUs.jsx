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
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">About Us</h2>
      {/* Formik Wrapper */}
      <Formik
        initialValues={initialData}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-10 max-w-[848px] mx-auto w-full">
            <div className="flex gap-4">
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
              breakpoint="w-full max-w-[280px]"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
