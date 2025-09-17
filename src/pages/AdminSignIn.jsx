import React, { useState, useEffect } from "react";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";
import nlflag from "../assets/DashboardImages/flag-netherlands.svg";
import usaflag from "../assets/DashboardImages/USA-flag.svg";
import {
  addHomepageImage,
  getSigninImage,
} from "../redux/actions/dashboardActions";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const validTypes = ["image/jpeg", "image/png", "image/webp"];

export const AdminSignIn = () => {
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "signin",
    heading_en: "",
    heading_nl: "",
    text_en: "",
    text_nl: "",
    button_text_en: "",
    button_text_nl: "",
  });
  const { t } = useTranslation();

  const fetchExistingImage = async () => {
    try {
      const response = await getSigninImage();
      if (response) {
        setExistingImage(response.image);

        setFormData({
          title: response.title || "signin",
          heading_en: response.heading_en || "",
          heading_nl: response.heading_nl || "",
          text_en: response.text_en || "",
          text_nl: response.text_nl || "",
        });
      }
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  };

  useEffect(() => {
    fetchExistingImage();
  }, []);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && validTypes.includes(file.type)) {
      setImage({ file, preview: URL.createObjectURL(file) });
      setExistingImage(null);
    } else {
      toast.error(t("adminsignin_invalid_type"));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setExistingImage(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    if (!image?.file && !existingImage) {
      toast.error(t("adminsignin_select_required"));
      return;
    }

    setIsLoading(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (image?.file) {
        payload.append("image", image.file);
      } else if (existingImage) {
        try {
          const response = await fetch(existingImage);
          const blob = await response.blob();
          const file = new File([blob], "existingImage.png", {
            type: blob.type,
          });
          payload.append("image", file);
          console.log("Existing image fetched and appended");
        } catch (error) {
          console.error("Failed to fetch image:", error);
        }
      }

      const response = await addHomepageImage(payload);
      toast.success(t("adminsignin_save_success"));
      fetchExistingImage();

      if (response?.data?.imageUrl) {
        setExistingImage(response.data.imageUrl);
      }
      setImage(null);
    } catch (error) {
      toast.error(t("adminsignin_save_fail"));
      console.error("Error saving homepage content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
        SignIn Wallpaper
      </h5>
      <div className="flex flex-col gap-14 max-w-[848px] mx-auto">
        <div className="flex flex-col gap-3.5">
          <h2 className="text-[#111727] font-medium">
            Upload SignIn Wallpaper
          </h2>
          <p className="text-[#6C7275] text-sm">
            You can upload an image for the SignIn wallpaper. By saving, the
            image will be resized to optimized dimensions.
          </p>
        </div>

        <div className="flex gap-[14px] flex-wrap">
          {image?.preview ? (
            <div className="relative w-[215px] h-[215px] rounded-lg overflow-hidden">
              <img
                src={image.preview}
                alt="Selected"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2"
              >
                <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
              </button>
            </div>
          ) : existingImage ? (
            <div className="relative w-[215px] h-[215px] rounded-lg overflow-hidden">
              <img
                src={existingImage}
                alt="Existing"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2"
              >
                <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
              </button>
            </div>
          ) : (
            <Dropzone width="215px" height="215px" onDrop={handleDrop} />
          )}
        </div>

        <div className="flex gap-4">
          {/* Dutch Section */}
          <div className="flex flex-col gap-4 min-w-80">
            <div className="relative flex flex-col gap-2">
              <label
                htmlFor="heading_nl"
                className="text-sm font-medium text-gray-700"
              >
                Koptekst (Dutch)
              </label>
              <input
                className="pl-3 pr-10 block w-full appearance-none font-footer1
               placeholder-[#5A5A5A] outline-none border border-[#D9D9D9]
               focus:outline-none
              sm:text-sm rounded-md xl:py-3 xl:ps-3 py-2"
                id="heading_nl"
                type="text"
                value={formData.heading_nl}
                onChange={handleInputChange}
                placeholder="Koptekst"
              />
              <img
                className="absolute right-2 bottom-4 w-5 h-5"
                src={nlflag}
                alt="Dutch flag"
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label
                htmlFor="text_nl"
                className="text-sm font-medium text-gray-700"
              >
                Tekst (Dutch)
              </label>
              <textarea
                className="pl-3 pr-10 block w-full appearance-none font-footer1
                           placeholder-[#5A5A5A] outline-none border border-[#D9D9D9]
                           focus:outline-none
                          sm:text-sm rounded-md xl:py-3 xl:ps-3 py-2"
                id="text_nl"
                value={formData.text_nl}
                onChange={handleInputChange}
                placeholder="Tekst"
                rows={6}
              />
              <img
                className="absolute right-2 top-10 w-5 h-5"
                src={nlflag}
                alt="Dutch flag"
              />
            </div>
          </div>

          {/* English Section */}
          <div className="flex flex-col gap-4 min-w-80">
            <div className="relative flex flex-col gap-2">
              <label
                htmlFor="heading_en"
                className="text-sm font-medium text-gray-700"
              >
                Heading (English)
              </label>
              <input
                className="pl-3 pr-10 block w-full appearance-none font-footer1
               placeholder-[#5A5A5A] outline-none border border-[#D9D9D9]
               focus:outline-none
              sm:text-sm rounded-md xl:py-3 xl:ps-3 py-2"
                id="heading_en"
                type="text"
                value={formData.heading_en}
                onChange={handleInputChange}
                placeholder="Heading"
              />
              <img
                className="absolute right-2 bottom-4 w-5 h-5"
                src={usaflag}
                alt="USA flag"
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label
                htmlFor="text_en"
                className="text-sm font-medium text-gray-700"
              >
                Text (English)
              </label>
              <textarea
                className="pl-3 pr-10 block w-full appearance-none font-footer1
                           placeholder-[#5A5A5A] outline-none border border-[#D9D9D9]
                           focus:outline-none
                          sm:text-sm rounded-md xl:py-3 xl:ps-3 py-2"
                id="text_en"
                value={formData.text_en}
                onChange={handleInputChange}
                placeholder="Text"
                rows={6}
              />
              <img
                className="absolute right-2 top-10 w-5 h-5"
                src={usaflag}
                alt="USA flag"
              />
            </div>
          </div>
        </div>

        <Button
          loading={isLoading}
          type="button"
          btnText="Save"
          paddingX="20px"
          textColor="#000000"
          breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
          disabled={isLoading}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default AdminSignIn;
