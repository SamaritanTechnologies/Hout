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

  // Fetch existing homepage image
  useEffect(() => {
    const fetchExistingImage = async () => {
      try {
        const response = await getHomepageImage();
        if (response?.length > 0 && response[0].image) {
          setExistingImage(response[0].image);
        }
      } catch (error) {
        console.error("Error fetching existing image:", error);
      }
    };
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

  // Handle Save Image
  const handleSave = async () => {
    if (!image?.file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", "homepage");
      formData.append("image", image.file);

      const response = await addHomepageImage(formData);
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
                <XCircleIcon class="h-6 w-6 text-[#FBC700]" />
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
                <XCircleIcon class="h-6 w-6 text-[#FBC700]" />
              </button>
            </div>
          ) : (
            <Dropzone width="215px" height="215px" onDrop={handleDrop} />
          )}
        </div>

        {/* Save Button */}
        <Button
          loading={isLoading}
          type="button"
          btnText="Save"
          paddingX="20px"
          textColor="#000000"
          breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
          disabled={!image?.file || isLoading}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};
