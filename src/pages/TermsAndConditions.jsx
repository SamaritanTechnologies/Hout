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
const validTypes = ["image/jpeg", "image/png", "image/webp"];

export const TermsAndConditions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [termsCondition, setTermsCondition] = useState({
    description_nl: "",
    description_en: "",
  });

  const [loading, setLoading] = useState(false);

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
          });
        }
        // toast.success("Terms & Conditions fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch Terms & Conditions!");
        console.error("Error fetching privacy policy:", error);
      }
    };

    fetchTermsAndConditions();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await addTermsCondition(termsCondition);
      toast.success("Terms & Conditions saved successfully!");
    } catch (error) {
      toast.error("Failed to save Terms & Conditions!");
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
        toast.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
      }
    },
    [image]
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
      toast.error("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", "termAndconditions");
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

  const handleChange = (name, value) => {
    setTermsCondition((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-12 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Terms and Conditions
      </h2>
      <div className="flex flex-col gap-10 w-full max-w-[848px] mx-auto">
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
