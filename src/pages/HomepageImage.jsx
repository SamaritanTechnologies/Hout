import React from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";

const handleDrop = (acceptedFiles) => {
  const newImages = acceptedFiles
    .filter((file) => validTypes.includes(file.type))
    .map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

  setImages((prevImages) => [...prevImages, ...newImages]);
  setIsErrors((prev) => ({ ...prev, images: false }));

  const invalidFiles = acceptedFiles.filter(
    (file) => !validTypes.includes(file.type)
  );
  if (invalidFiles.length > 0) {
    alert("Some files are invalid. Only JPEG, PNG, and WebP are accepted.");
  }
};

export const HomePageImage = () => {
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
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-14 overflow-x-auto pl-[54px]">
        <div className="flex gap-[20px] mb-[24px]">
          <div className="w-full">
            <label
              htmlFor="images"
              className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
            >
              Product Image
              <br />
              <span className="text-[#6C7275] font-normal text-12">
                You can Upload Multiple Images of product in different
                dimensions, and rotate. By saving the image will be rezised to
                optimized dimensions.
              </span>
            </label>
            <div className="flex gap-[14px] flex-wrap my-10">
              <Dropzone width="215px" height="215px" onDrop={handleDrop} />
            </div>
            <Button
              loading={""}
              type="submit"
              btnText="Save"
              paddingX="20px"
              textColor="#000000"
              breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
