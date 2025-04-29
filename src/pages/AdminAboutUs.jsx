import React, { useCallback, useEffect, useState } from "react";
import {
  addAboutUs,
  addHomepageImage,
  getAboutImage,
  getAboutUs,
} from "../redux/actions/dashboardActions";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import { Formik, Form, Field } from "formik";
import Textarea from "../components/Common/Textarea";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import Dropzone from "../components/Common/Dropzone";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";
const validTypes = ["image/jpeg", "image/png", "image/webp"];

export const AdminAboutUs = () => {
  const [initialData, setInitialData] = useState({
    description_en: "",
    description_nl: "",
  });
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const fetchExistingImage = useCallback(async () => {
    try {
      const response = await getAboutImage();
      if (response?.image) {
        setExistingImage(response.image);
      }
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  }, []);

  useEffect(() => {
    fetchExistingImage();
  }, [fetchExistingImage]);

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

  const handleRemoveImage = useCallback(() => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
    setExistingImage(null);
  }, [image]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && validTypes.includes(file.type)) {
        // Revoke previous URL if exists
        if (image?.preview) {
          URL.revokeObjectURL(image.preview);
        }
        const preview = URL.createObjectURL(file);
        setImage({ file, preview });
        setExistingImage(null);
      } else {
        toast.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
      }
    },
    [image]
  );

  const handleImageSave = async () => {
    if (!image?.file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", "about");
      payload.append("image", image.file);

      const response = await addHomepageImage(payload);
      toast.success("Image uploaded successfully!");
      fetchExistingImage();
      // setExistingImage(response?.imageUrl || null);
      setImage(null);
    } catch (error) {
      toast.error("Failed to upload image.");
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

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
      {/* Image Upload Section */}
      <section className="flex flex-col gap-6">
        <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
          Upload Terms and Conditions Wallpaper
        </h2>
        <div className="flex flex-col gap-6 ml-20">
          <div className="flex gap-[14px] flex-wrap items-center">
            {image?.preview ? (
              <div className="relative w-[215px] h-[215px] rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={image.preview}
                  alt="Selected Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
                </button>
              </div>
            ) : existingImage ? (
              <div className="relative w-[215px] h-[215px] rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={existingImage}
                  alt="Existing Wallpaper"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
                </button>
              </div>
            ) : (
              <Dropzone
                width="215px"
                height="215px"
                onDrop={handleDrop}
                accept="image/jpeg, image/png, image/webp"
              />
            )}
          </div>
          <Button
            loading={isLoading}
            type="button"
            btnText="Save Image"
            paddingX="20px"
            textColor="#000000"
            breakpoint="w-full max-w-[280px]"
            disabled={!image?.file || isLoading}
            onClick={handleImageSave}
          />
        </div>
      </section>
    </div>
  );
};
