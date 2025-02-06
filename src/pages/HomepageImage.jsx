import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";
import { addHomepageImage, getHomepageImage } from "../redux/actions/dashboardActions";
import { toast } from "react-toastify";

const validTypes = ["image/jpeg", "image/png", "image/webp"];

export const HomePageImage = () => {
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing homepage image from the database
  useEffect(() => {
    const fetchExistingImage = async () => {
      try {
        const response = await getHomepageImage();
        console.log("API Response:", response); // Check the response format
        if (response && response.length > 0 && response[0].image) {
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
      const previewUrl = URL.createObjectURL(file);
      setImage({ file, preview: previewUrl });
      setExistingImage(null); // Hide the old image once a new file is selected
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
      const response = await addHomepageImage({ files: [image.file] });
      toast.success("Image uploaded successfully!");

      if (response?.data?.imageUrl) {
        setExistingImage(response.data.imageUrl);
        setImage(null); // Reset new image selection after successful upload
      }
    } catch (error) {
      toast.error("Failed to upload image.");
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
          Upload Homepage Wallpaper
        </h5>
      </div>

      <div className="px-4 sm:px-8 py-14">
        <div className="w-full">
          <label className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block">
            Product Image
            <br />
            <span className="text-[#6C7275] font-normal text-12">
              Select an image to preview before uploading.
            </span>
          </label>

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
                  className="absolute top-2 right-2 border border-black bg-white rounded-full p-1 text-red-600"
                >
                  X
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
                  className="absolute top-2 right-2 border border-black bg-white rounded-full p-1 text-red-600"
                >
                  X
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
    </div>
  );
};
