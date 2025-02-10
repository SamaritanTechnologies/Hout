import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import FormikField from "../components/Common/FormikField";
import { XCircleIcon } from "@heroicons/react/24/outline";

export const WhyHoutTotaal = () => {
  const [videos, setVideos] = useState([]);

  const handleSave = (values) => {
    console.log("Form Values:", values);
    console.log(
      "Selected Videos:",
      videos.map((v) => v.name).join(", ") || "No videos selected"
    );
  };

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    setVideos([...videos, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("video/")
    );
    setVideos([...videos, ...files]);
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
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

      <Formik
        initialValues={{
          name_nl: "",
          name_en: "",
          description_nl: "",
          description_en: "",
        }}
        onSubmit={handleSave}
      >
        {({ values }) => (
          <Form className="flex gap-8 pl-[54px] w-full">
            <div className="w-full max-w-2xl">
              {/* Name Fields */}
              <div className="flex gap-[20px] mb-[24px]">
                {/* Dutch Name */}
                <div className="w-1/2 relative">
                  <Field
                    type="text"
                    name="name_nl"
                    placeholder="Naam"
                    component={FormikField}
                  />
                  <img
                    src={countryflag}
                    alt="Dutch Flag"
                    className="cursor-pointer h-5 w-5 absolute right-4 bottom-3"
                  />
                </div>

                {/* English Name */}
                <div className="w-1/2 relative">
                  <Field
                    type="text"
                    name="name_en"
                    placeholder="Name"
                    component={FormikField}
                  />
                  <img
                    src={countryflag2}
                    alt="English Flag"
                    className="cursor-pointer h-5 w-5 absolute right-4 bottom-3"
                  />
                </div>
              </div>

              {/* Description Fields */}
              <div className="flex gap-[20px] mb-[24px]">
                {/* Dutch Description */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beschrijving (Dutch)
                  </label>
                  <Field
                    as="textarea"
                    name="description_nl"
                    placeholder="Voer beschrijving in"
                    className="w-full rounded-md xl:py-3 xl:px-3 py-2 px-2 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm input-field"
                    rows="4"
                  />
                </div>

                {/* English Description */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (English)
                  </label>
                  <Field
                    as="textarea"
                    name="description_en"
                    placeholder="Enter description"
                    className="w-full rounded-md xl:py-3 xl:px-3 py-2 px-2 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm input-field"
                    rows="4"
                  />
                </div>
              </div>

              {/* Video Upload Section */}
              <div className="flex gap-[20px] mb-[24px]">
                <div className="w-full md:mb-0 relative">
                  <label className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block">
                    Upload Videos <br />
                    <span className="text-[#6C7275] font-normal text-12">
                      You can upload multiple videos in different formats
                    </span>
                  </label>

                  {/* Drag & Drop Video Upload */}
                  <div
                    className="w-full max-w-[215px] h-[215px] border border-dashed border-[#4C5B66] rounded-lg p-3 flex items-center justify-center cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      id="video-upload"
                      style={{ display: "none" }}
                      onChange={handleVideoChange}
                    />
                    <label
                      htmlFor="video-upload"
                      className="w-full h-full flex flex-col items-center justify-center"
                    >
                      <img
                        src="/src/assets/DashboardImages/add.svg"
                        className="xl:w-[82px] lg:w-[70px] w-[60px]"
                        alt="Add Video"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Drop your video here or{" "}
                        <span className="text-customYellow">
                          click to browse
                        </span>
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Video Previews */}
              {videos.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Video Previews</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative">
                        <div className="w-full h-48 overflow-hidden rounded-lg shadow-md">
                          <video
                            controls
                            className="w-full h-full object-cover"
                          >
                            <source
                              src={URL.createObjectURL(video)}
                              type={video.type}
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <p className="text-sm text-center mt-1">{video.name}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveVideo(index)}
                          className="absolute top-2 right-2 text-white"
                        >
                          <XCircleIcon className="h-6 w-6 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <Button
                loading={false}
                type="submit"
                btnText="Save"
                paddingX="20px"
                textColor="#000000"
                breakpoint="xl:w-[354px] lg:w-[280px] w-[240px] ml-[54px] mt-[100px]"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};