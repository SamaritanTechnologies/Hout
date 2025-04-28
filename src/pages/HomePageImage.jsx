import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";
import {
  addHomepageImage,
  getHomepageImage,
} from "../redux/actions/dashboardActions";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";

const validTypes = ["image/jpeg", "image/png", "image/webp"];

export const HomePageImage = () => {
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    text: "",
    buttonText: "",
  });

  const fetchExistingImage = async () => {
    try {
      const response = await getHomepageImage();
      if (response?.length > 0 && response[0].image) {
        setExistingImage(response[0].image);
      }
      if (response[0].heading) {
        setFormData((prev) => ({
          ...prev,
          heading: response[0].heading || "",
          text: response[0].text || "",
          buttonText: response[0].buttonText || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching existing image:", error);
    }
  };
  useEffect(() => {
    fetchExistingImage();
  }, []);

  // Handle image selection
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && validTypes.includes(file.type)) {
      setImage({ file, preview: URL.createObjectURL(file) });
      setExistingImage(null); // Clear existing image when a new one is selected
    } else {
      toast.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
    }
  };

  // Remove selected image
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
    if (!image?.file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", "homepage");
      payload.append("image", image.file);
      payload.append("heading", formData.heading);
      payload.append("text", formData.text);
      payload.append("button_text", formData.buttonText);

      const response = await addHomepageImage(payload);
      toast.success("Image uploaded successfully!");

      setExistingImage(response?.data?.imageUrl || null);
      setImage(null);
    } catch (error) {
      toast.error("Failed to upload image.");
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
        Homepage Image
      </h5>
      <div className="flex flex-col gap-14 max-w-[848px] mx-auto">
        <div className="flex flex-col gap-3.5">
          <h2 className="text-[#111727] font-medium">
            Upload Homepage Wallpaper
          </h2>
          <p className="text-[#6C7275 text-sm">
            You can Upload Multiple Images of product in different dimensions,
            and rotate. By saving the image will be rezised to optimized
            dimensions.
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

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="heading"
              className="text-sm font-medium text-gray-700"
            >
              Heading
            </label>
            {/* <InputField /> */}
            <input
              className="pl-3 block w-full appearance-none font-footer1
               placeholder-[#5A5A5A] outline-none border border-[#D9D9D9] 
               focus:outline-none 
              sm:text-sm  rounded-md xl:py-3 xl:ps-3 py-2"
              id="heading"
              type="text"
              value={formData.heading}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="text-sm font-medium text-gray-700">
              Text
            </label>
            <textarea
              className="pl-3 block w-full appearance-none font-footer1
               placeholder-[#5A5A5A] outline-none border border-[#D9D9D9] 
               focus:outline-none 
              sm:text-sm  rounded-md xl:py-3 xl:ps-3 py-2"
              id="text"
              value={formData.text}
              onChange={handleInputChange}
              required
              rows={6}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="buttonText"
              className="text-sm font-medium text-gray-700"
            >
              Button Text
            </label>
            <input
              className="pl-3 block w-full appearance-none font-footer1
               placeholder-[#5A5A5A] outline-none border border-[#D9D9D9] 
               focus:outline-none 
              sm:text-sm  rounded-md xl:py-3 xl:ps-3 py-2"
              id="buttonText"
              type="text"
              value={formData.buttonText}
              onChange={handleInputChange}
              required
            />
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
