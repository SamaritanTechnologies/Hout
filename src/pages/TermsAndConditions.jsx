import React, { useCallback, useEffect, useState } from "react";
import {
  addHomepageImage,
  addTermsCondition,
  getPrivacyPolicyImage,
  getTermAndConditionsImage,
  getTermsCondition,
} from "../redux/actions/dashboardActions";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import RichTextEditor from "../components/Common/RichTextEditor";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import Dropzone from "../components/Common/Dropzone";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";
import InputField from "../components/Common/InputField";
import { useTranslation } from "react-i18next";
const validTypes = ["image/jpeg", "image/png", "image/webp"];

export const TermsAndConditions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [termsCondition, setTermsCondition] = useState({
    heading_nl: "avdsvsafvsdv",
    heading_en: "",
    description_nl: "",
    description_en: "",
  });

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchExistingImage = useCallback(async () => {
    try {
      const response = await getTermAndConditionsImage();
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
    const fetchTermsAndConditions = async () => {
      try {
        const data = await getTermsCondition();
        if (data) {
          setTermsCondition({
            description_en: data.description_en,
            description_nl: data.description_nl,
            heading_en: data.heading_en,
            heading_nl: data.heading_nl,
          });
        }
        // toast.success("Terms & Conditions fetched successfully!");
      } catch (error) {
        toast.error(t("termsconditions_fetch_fail"));
        console.error("Error fetching privacy policy:", error);
      }
    };

    fetchTermsAndConditions();
  }, [t]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await addTermsCondition(termsCondition);
      toast.success(t("termsconditions_save_success"));
    } catch (error) {
      toast.error(t("termsconditions_save_fail"));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
        toast.error(t("termsconditions_invalid_type"));
      }
    },
    [image, t]
  );

  const handleRemoveImage = useCallback(() => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
    setExistingImage(null);
  }, [image]);

  const handleImageSave = async () => {
    if (!image?.file) {
      toast.error(t("termsconditions_select_required"));
      return;
    }

    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", "termAndconditions");
      payload.append("image", image.file);

      const response = await addHomepageImage(payload);
      toast.success(t("termsconditions_image_upload_success"));
      fetchExistingImage();
      // setExistingImage(response?.imageUrl || null);
      setImage(null);
    } catch (error) {
      toast.error(t("termsconditions_image_upload_fail"));
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

  const handleChange = (name, value) => {
    setTermsCondition((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-12 xl:gap-12 ">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Terms and Conditions
      </h2>
      <div className="flex flex-col gap-10 w-full max-w-[848px] mx-auto">
        <div className="flex gap-4">
          <div className="w-1/2 relative">
            <div>
              <h5 className="text-[16px] font-bold py-[12px]">Koptekst</h5>
              <InputField
                type="text"
                placeholder="Kop invoeren"
                name="heading_nl"
                value={termsCondition.heading_nl}
                onChange={(e) => handleChange("heading_nl", e.target.value)}
                flag={countryflag}
              />
            </div>
            <img
              src={countryflag}
              alt="Flag"
              className="cursor-pointer h-5 w-5 absolute right-[6px] top-[60px]"
            />
          </div>
          <div className="w-1/2 relative">
            <div>
              <h5 className="text-[16px] font-bold py-[12px]">Heading</h5>
              <InputField
                className="text-[16px] font-bold py-[12px]"
                type="text"
                placeholder="Enter heading"
                name="heading_en"
                value={termsCondition.heading_en}
                onChange={(e) => handleChange("heading_en", e.target.value)}
                flag={countryflag2}
              />
            </div>
            <img
              src={countryflag2}
              alt="Flag"
              className="cursor-pointer h-5 w-5 absolute right-[6px] top-[60px]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 relative">
            <RichTextEditor
              label="Algemene Voorwaarden"
              name="description_nl"
              value={termsCondition.description_nl} // Ensure the editor is controlled
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
              label="Terms and Conditions"
              name="description_en"
              value={termsCondition.description_en} // Ensure the editor is controlled
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
