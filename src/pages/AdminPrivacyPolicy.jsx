import React, { useState, useEffect } from "react";
import {
  addPrivacyPolicies,
  getPrivacyPolicy,
  getPrivacyPolicyImage,
} from "../redux/actions/dashboardActions";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import RichTextEditor from "../components/Common/RichTextEditor";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import { toast } from "react-toastify";
import Dropzone from "../components/Common/Dropzone";
import { XCircleIcon } from "@heroicons/react/24/outline";
const validTypes = ["image/jpeg", "image/png", "image/webp"];
export const AdminPrivacyPolicy = () => {
  const [policy, setPolicy] = useState({
    description_en: "",
    description_nl: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const fetchExistingImage = async () => {
    try {
      const response = await getPrivacyPolicyImage();
      if (response?.length > 0 && response[0].image) {
        setExistingImage(response[0].image);
      }
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  };
  useEffect(() => {
    fetchExistingImage();
  }, []);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const data = await getPrivacyPolicy();
        if (data) {
          setPolicy({
            description_en: data.description_en,
            description_nl: data.description_nl,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch privacy policy");
        console.error("Error fetching privacy policy:", error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && validTypes.includes(file.type)) {
      setImage({ file, preview: URL.createObjectURL(file) });
      setExistingImage(null); // Clear existing image when a new one is selected
    } else {
      toast.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setExistingImage(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await addPrivacyPolicies(policy);
      toast.success("Privacy policy saved successfully!");
    } catch (error) {
      toast.error("Failed to save Privacy Policy");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setPolicy((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageSave = async () => {
    if (!image?.file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", "homepage");
      payload.append("image", image.file);

      const response = await addHomepageImage(payload);
      toast.success("Image uploaded successfully!");

      setExistingImage(response?.data?.imageUrl || null);
      setImage(null);
    } catch (error) {
      toast.error("Failed to upload image.");
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Privacy Policy
      </h2>
      <div className="flex flex-col max-w-[848px] mx-auto gap-10">
        <div className="flex gap-4">
          <div className="w-1/2 relative">
            <RichTextEditor
              name="description_nl"
              label="Privacy Policy"
              value={policy.description_nl}
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
              name="description_en"
              label="Privacy Policy"
              value={policy.description_en}
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

      <section className="">
        <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
          Upload Privacy Policy Wallpaper
        </h2>
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
      </section>
    </div>
  );
};
