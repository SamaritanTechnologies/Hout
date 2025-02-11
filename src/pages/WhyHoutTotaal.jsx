import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import FormikField from "../components/Common/FormikField";
import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  createWhyHoutTotal,
  fetchWhyHoutTotal,
} from "../redux/actions/dashboardActions";

export const WhyHoutTotaal = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title_nl: "",
    title_en: "",
    description_nl: "",
    description_en: "",
    videos: [],
  });

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchHoutTotal = async () => {
      setLoading(true);
      try {
        const data = await fetchWhyHoutTotal();
        setInitialValues({
          title_nl: data?.title_nl || "",
          title_en: data?.title_en || "",
          description_nl: data?.description_nl || "",
          description_en: data?.description_en || "",
          videos: data?.videos || [],
        });
      } catch (error) {
        toast.error("Failed to fetch data!");
      } finally {
        setLoading(false);
      }
    };
    fetchHoutTotal();
  }, []);

  // Handle video selection
  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    setVideos([...videos, ...files]);
  };

  // Handle video drag & drop
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("video/")
    );
    setVideos([...videos, ...files]);
  };

  // Remove a selected video
  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSave = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title_nl", values.title_nl);
      formData.append("title_en", values.title_en);
      formData.append("description_nl", values.description_nl);
      formData.append("description_en", values.description_en);

      // Append videos
      videos.forEach((video, index) => {
        formData.append(`videos[${index}]`, video);
      });

      await createWhyHoutTotal(formData);
      toast.success("Data saved successfully!");
    } catch (error) {
      toast.error("Error saving data!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center mb-6">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
          Why Hout Totaal
        </h5>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSave} enableReinitialize>
        {({ values }) => (
          <Form className="flex gap-8 pl-[54px] w-full">
            <div className="w-full max-w-2xl">
              {/* Name Fields */}
              <div className="flex gap-[20px] mb-[24px]">
                <div className="w-1/2 relative">
                  <Field type="text" name="title_nl" placeholder="Naam" component={FormikField} />
                  <img src={countryflag} alt="Dutch Flag" className="cursor-pointer h-5 w-5 absolute right-4 bottom-3" />
                </div>
                <div className="w-1/2 relative">
                  <Field type="text" name="title_en" placeholder="Name" component={FormikField} />
                  <img src={countryflag2} alt="English Flag" className="cursor-pointer h-5 w-5 absolute right-4 bottom-3" />
                </div>
              </div>

              {/* Description Fields */}
              <div className="flex gap-[20px] mb-[24px]">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beschrijving (Dutch)</label>
                  <Field as="textarea" name="description_nl" placeholder="Voer beschrijving in" className="w-full rounded-md xl:py-3 xl:px-3 py-2 px-2 border border-[#D9D9D9]" rows="4" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
                  <Field as="textarea" name="description_en" placeholder="Enter description" className="w-full rounded-md xl:py-3 xl:px-3 py-2 px-2 border border-[#D9D9D9]" rows="4" />
                </div>
              </div>

              {/* Video Upload */}
              <div className="mb-[24px]">
                <label className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block">
                  Upload Videos <br />
                  <span className="text-[#6C7275] font-normal text-12">You can upload multiple videos</span>
                </label>
                <div className="w-full max-w-[215px] h-[215px] border border-dashed border-[#4C5B66] rounded-lg p-3 flex items-center justify-center cursor-pointer"
                  onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                  <input type="file" accept="video/*" multiple id="video-upload" hidden onChange={handleVideoChange} />
                  <label htmlFor="video-upload" className="w-full h-full flex flex-col items-center justify-center">
                    <img src="/src/assets/DashboardImages/add.svg" className="xl:w-[82px] lg:w-[70px] w-[60px]" alt="Add Video" />
                    <p className="text-sm text-gray-600 mt-2">Drop video or <span className="text-customYellow">click to browse</span></p>
                  </label>
                </div>
              </div>

              {/* Video Previews */}
              {videos.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {videos.map((video, index) => (
                    <div key={index} className="relative">
                      <video controls className="w-full h-48 object-cover">
                        <source src={URL.createObjectURL(video)} type={video.type} />
                      </video>
                      <button type="button" onClick={() => handleRemoveVideo(index)} className="text-white absolute top-2 right-2">
                        <XCircleIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Save Button */}
              <Button loading={loading} type="submit" btnText="Save" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
