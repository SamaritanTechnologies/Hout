import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Textarea from "../components/Common/Textarea";
import Button from "../components/Common/Button";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import FormikField from "../components/Common/FormikField";
import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  createWhyHoutTotal,
  fetchWhyHoutTotal,
} from "../redux/actions/dashboardActions";
import { ClassSharp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const WhyHoutTotaal = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]); // This will store both API videos and newly uploaded files
  const [initialValues, setInitialValues] = useState({
    title_nl: "",
    title_en: "",
    description_nl: "",
    description_en: "",
    videos: [],
  });
  const { t } = useTranslation();

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchHoutTotal = async () => {
      setLoading(true);
      try {
        const data = await fetchWhyHoutTotal();
        if (data) {
          setInitialValues({
            title_nl: data?.title_nl || "",
            title_en: data?.title_en || "",
            description_nl: data?.description_nl || "",
            description_en: data?.description_en || "",
            videos: data?.videos || [],
          });

          // Map the API response videos to the format expected by the component
          const videoURLs =
            data?.videos?.map((video) => ({
              id: video.id, // Preserve the ID for future reference
              url: video.video, // Use the video URL
            })) || [];

          setVideos(videoURLs);
        }
      } catch (error) {
        toast.error(t("whyhouttotaal_fetch_fail"));
      } finally {
        setLoading(false);
      }
    };
    fetchHoutTotal();
  }, []);

  // Handle video selection
  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const newVideos = files.map((file) => ({
      id: Date.now() + Math.random(), // Generate unique ID for new videos
      file, // Store the File object for new uploads
      url: URL.createObjectURL(file), // Create a preview URL
    }));
    setVideos([...videos, ...newVideos]);
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  // Handle video drag & drop
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("video/")
    );
    const newVideos = files.map((file) => ({
      id: Date.now() + Math.random(), // Generate unique ID for new videos
      file, // Store the File object for new uploads
      url: URL.createObjectURL(file), // Create a preview URL
    }));
    setVideos([...videos, ...newVideos]);
  };

  // Remove a selected video
  const handleRemoveVideo = (id, setFieldValue) => {
    const videoToRemove = videos.find(video => video.id === id);
    if (videoToRemove && videoToRemove.url && videoToRemove.url.startsWith('blob:')) {
      // Revoke the blob URL to free up memory
      URL.revokeObjectURL(videoToRemove.url);
    }
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
    setFieldValue("videos", updatedVideos); // Sync with Formik
  };

  const fetchVideoAsFile = async (url) => {
    const filename = url.split("/").pop();
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
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
      for (const video of videos) {
        if (video.file) {
          formData.append("videos", video.file);
        } else if (video.url) {
          const file = await fetchVideoAsFile(video.url);
          formData.append("videos", file);
        }
      }

      await createWhyHoutTotal(formData);
      toast.success(t("whyhouttotaal_save_success"));
    } catch (error) {
      toast.error(t("whyhouttotaal_save_fail"));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Why Hout Totaal
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSave}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-5 max-w-[848px] mx-auto">
            {/* Name Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              <Field
                type="text"
                name="title_nl"
                placeholder="Naam"
                component={FormikField}
                flag={countryflag}
              />
              <Field
                type="text"
                name="title_en"
                placeholder="Name"
                component={FormikField}
                flag={countryflag2}
              />
              <Field
                as="textarea"
                name="description_nl"
                placeholder="Voer beschrijving in"
                rows="6"
                label="Beschrijving (Dutch)"
                component={Textarea}
              />
              <Field
                as="textarea"
                name="description_en"
                placeholder="Enter description"
                rows="6"
                label="Description (English)"
                component={Textarea}
              />
            </div>
            {/* Video Upload */}
            <div className="video-upload">
              <label className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block">
                Upload Videos <br />
                <span className="text-[#6C7275] font-normal text-12">
                  You can upload multiple videos
                </span>
              </label>
              <div
                className="w-full max-w-[215px] h-[215px] border border-dashed border-[#4C5B66] rounded-lg p-3 flex items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('video-upload').click()}
              >
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  id="video-upload"
                  hidden
                  onChange={handleVideoChange}
                />
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img
                    src="/src/assets/DashboardImages/add.svg"
                    className="xl:w-[82px] lg:w-[70px] w-[60px]"
                    alt="Add Video"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Drop video or{" "}
                    <span className="text-customYellow">click to browse</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Video Previews */}
            {videos.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {videos.map((video, index) => (
                  <div key={video.id} className="relative">
                    <video controls className="w-full h-48 object-cover">
                      <source
                        src={video.url} // Use the URL for preview
                        type="video/mp4"
                      />
                    </video>
                    <button
                      type="button"
                      onClick={() => handleRemoveVideo(video.id, setFieldValue)}
                      className="text-white absolute top-2 right-2"
                    >
                      <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Save Button */}
            <Button
              loading={loading}
              type="submit"
              btnText="Save"
              paddingX="20px"
              textColor="#000000"
              breakpoint="w-full max-w-[280px] mt-[18px]"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
