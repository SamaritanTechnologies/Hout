import React, { useCallback, useEffect, useState } from "react";
import {
  addAboutUs,
  addHomepageImage,
  getAboutImage,
  getAboutUs,
} from "../redux/actions/dashboardActions";
import Button from "../components/Common/Button";
import { Formik, Form, Field } from "formik";
import Textarea from "../components/Common/Textarea";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import Dropzone from "../components/Common/Dropzone";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// Define valid image types
const validTypes = ["image/jpeg", "image/png", "image/webp"];

// Custom InputField component
const InputField = ({ field, form, className, ...props }) => (
  <input
    {...field}
    {...props}
    className={`block w-full appearance-none font-footer1 placeholder-[#5A5A5A] rounded-md xl:py-3 xl:ps-3 py-2 ps-3 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm ${
      className || ""
    }`}
  />
);

// Custom Textarea component (assumed implementation with consistent styling)
const TextareaField = ({ field, form, className, ...props }) => (
  <textarea
    {...field}
    {...props}
    className={`block w-full appearance-none font-footer1 placeholder-[#5A5A5A] rounded-md xl:py-3 xl:ps-3 py-2 ps-3 outline-none border border-[#D9D9D9] focus:outline-none  sm:text-sm ${
      className || ""
    }`}
  />
);

export const AdminAboutUs = () => {
  const [initialData, setInitialData] = useState({
    description_en: "",
    description_nl: "",
    heading_en: "",
    heading_nl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const { t } = useTranslation();

  const fetchExistingImage = useCallback(async () => {
    try {
      const response = await getAboutImage();
      if (response?.image) {
        setExistingImage(response.image);
      }
    } catch (error) {
      console.error("Error fetching existing image:", error);
      toast.error(t("adminaboutus_fetch_image_fail"));
    }
  }, [t]);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const data = await getAboutUs();
        if (data) {
          setInitialData({
            description_en: data.description_en || "",
            description_nl: data.description_nl || "",
            heading_en: data.heading_en || "",
            heading_nl: data.heading_nl || "",
          });
        }
      } catch (error) {
        toast.error(t("adminaboutus_fetch_fail"));
        console.error("Error fetching About Us:", error);
      }
    };

    fetchAboutUs();
    fetchExistingImage();
  }, [fetchExistingImage, t]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      await addAboutUs(values);
      toast.success(t("adminaboutus_save_success"));
    } catch (error) {
      toast.error(t("adminaboutus_save_fail"));
      console.error("Error saving About Us:", error);
    } finally {
      setIsSubmitting(false);
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
        if (image?.preview) {
          URL.revokeObjectURL(image.preview);
        }
        const preview = URL.createObjectURL(file);
        setImage({ file, preview });
        setExistingImage(null);
      } else {
        toast.error(t("adminaboutus_invalid_type"));
      }
    },
    [image, t]
  );

  const handleImageSave = async () => {
    if (!image?.file) {
      toast.error(t("adminaboutus_select_required"));
      return;
    }

    setIsUploading(true);
    try {
      const payload = new FormData();
      payload.append("title", "about");
      payload.append("image", image.file);

      await addHomepageImage(payload);
      toast.success(t("adminaboutus_image_upload_success"));
      await fetchExistingImage();
      setImage(null);
    } catch (error) {
      toast.error(t("adminaboutus_image_upload_fail"));
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
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
      <Formik
        initialValues={initialData}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting: formikSubmitting }) => (
          <Form className="flex flex-col gap-10 max-w-[848px] mx-auto w-full">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="heading_nl"
                  className="text-[16px] font-bold py-[12px] block"
                >
                  Koptekst
                </label>
                <div className="relative">
                  <Field
                    id="heading_nl"
                    name="heading_nl"
                    placeholder="Heading (Dutch)"
                    component={InputField}
                    aria-label="Heading in Dutch"
                  />
                  <img
                    src={countryflag}
                    alt="Dutch flag"
                    className="cursor-pointer h-5 w-5 absolute right-[6px] top-[10px]"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="heading_en"
                  className="text-[16px] font-bold py-[12px] block"
                >
                  Heading
                </label>
                <div className="relative">
                  <Field
                    id="heading_en"
                    name="heading_en"
                    placeholder="Heading (English)"
                    component={InputField}
                    aria-label="Heading in English"
                  />
                  <img
                    src={countryflag2}
                    alt="English flag"
                    className="cursor-pointer h-5 w-5 absolute right-[6px] top-[10px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="description_nl"
                  className="text-[16px] font-bold py-[12px] block"
                >
                  Beschrijving
                </label>
                <div className="relative">
                  <Field
                    id="description_nl"
                    name="description_nl"
                    placeholder="Description (Dutch)"
                    component={TextareaField}
                    rows="12"
                    aria-label="Description in Dutch"
                  />
                  <img
                    src={countryflag}
                    alt="Dutch flag"
                    className="cursor-pointer h-5 w-5 absolute right-[6px] top-[10px]"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="description_en"
                  className="text-[16px] font-bold py-[12px] block"
                >
                  Description
                </label>
                <div className="relative">
                  <Field
                    id="description_en"
                    name="description_en"
                    placeholder="Description (English)"
                    component={TextareaField}
                    rows="12"
                    aria-label="Description in English"
                  />
                  <img
                    src={countryflag2}
                    alt="English flag"
                    className="cursor-pointer h-5 w-5 absolute right-[6px] top-[10px]"
                  />
                </div>
              </div>
            </div>

            <Button
              loading={isSubmitting || formikSubmitting}
              type="submit"
              btnText="Save"
              textColor="#000000"
              breakpoint="w-full max-w-[280px]"
            />
          </Form>
        )}
      </Formik>
      {/* Image Upload Section remains unchanged */}
      <section className="flex flex-col gap-6">
        <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
          Upload About Us Image
        </h2>
        <div className="flex flex-col gap-6 ml-20">
          <div className="flex gap-[14px] flex-wrap items-center">
            {image?.preview ? (
              <div className="relative w-[215px] h-[215px] rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={image.preview}
                  alt="Selected image preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  aria-label="Remove selected image"
                >
                  <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
                </button>
              </div>
            ) : existingImage ? (
              <div className="relative w-[215px] h-[215px] rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={existingImage}
                  alt="Existing About Us image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  aria-label="Remove existing image"
                >
                  <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
                </button>
              </div>
            ) : (
              <Dropzone
                width="215px"
                height="215px"
                onDrop={handleDrop}
                accept="image/jpeg,image/png,image/webp"
              />
            )}
          </div>
          <Button
            loading={isUploading}
            type="button"
            btnText="Save Image"
            paddingX="20px"
            textColor="#000000"
            breakpoint="w-full max-w-[280px]"
            disabled={!image?.file || isUploading}
            onClick={handleImageSave}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminAboutUs;
