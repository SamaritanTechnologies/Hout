import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";
import FormikField from "../components/Common/FormikField";
import Textarea from "../components/Common/Textarea";
import { Formik, Form, Field } from "formik";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { addOurAssortment, getOurAssortment } from "../redux/actions/dashboardActions";
import { toast } from "react-toastify"; // Ensure you have toast for notifications

export const OurAssortment = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name_en: new Array(9).fill(""),
    name_nl: new Array(9).fill(""),
    description_en: new Array(9).fill(""),
    description_nl: new Array(9).fill(""),
    images: new Array(9).fill(null),
  });

  const [selectedImages, setSelectedImages] = useState(new Array(9).fill(null));

  useEffect(() => {
    const fetchOurValues = async () => {
      setLoading(true);
      try {
        const data = await getOurAssortment();

        let updatedValues;
        let updatedImages;

        if (data && data.length > 0) {
          updatedImages = data.map((item) => ({
            preview: item.image,
            file: null,
            name: item.image.split("/").pop(),
          }));

          updatedValues = {
            name_en: data.map((item) => item.name_en || ""),
            name_nl: data.map((item) => item.name_nl || ""),
            description_en: data.map((item) => item.description_en || ""),
            description_nl: data.map((item) => item.description_nl || ""),
            images: updatedImages,
          };

          // Ensure always 4 sections (if less than 4, fill with empty values)
          while (updatedValues.name_en.length < 9) {
            updatedValues.name_en.push("");
            updatedValues.name_nl.push("");
            updatedValues.description_en.push("");
            updatedValues.description_nl.push("");
            updatedImages.push(null);
          }
        } else {
          // Initialize empty fields if no data
          updatedValues = {
            name_en: new Array(9).fill(""),
            name_nl: new Array(9).fill(""),
            description_en: new Array(9).fill(""),
            description_nl: new Array(9).fill(""),
            images: new Array(9).fill(null),
          };
          updatedImages = new Array(9).fill(null);
        }

        setValues(updatedValues);
        setSelectedImages(updatedImages);
      } catch (error) {
        toast.error("Failed to fetch data!");
      } finally {
        setLoading(false);
      }
    };

    fetchOurValues();
  }, []);

  // Handle image selection
  const handleDrop = (acceptedFiles, index, setFieldValue) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
  
    const newImages = [...selectedImages];
    newImages[index] = {
      file,  // Store actual file for API
      preview: URL.createObjectURL(file),
      name: file.name,
    };
  
    setSelectedImages(newImages);
    setFieldValue(`images[${index}]`, file); // Update Formik values correctly
  };
  

  // Handle image removal
  const handleRemove = (index, setFieldValue) => {
    const newImages = [...selectedImages];
    newImages[index] = null;
    setSelectedImages(newImages);
    setFieldValue(`images[${index}]`, null);
  };

  // Function to handle form submission and send data to API
  const handleSave = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
  
      values.name_en.forEach((title, index) => {
        formData.append(`[${index}][name_en]`, title);
      });
  
      values.name_nl.forEach((title, index) => {
        formData.append(`[${index}][name_nl]`, title);
      });
  
      values.description_en.forEach((desc, index) => {
        formData.append(`[${index}][description_en]`, desc);
      });
  
      values.description_nl.forEach((desc, index) => {
        formData.append(`[${index}][description_nl]`, desc);
      });
  
      // Append images correctly
      selectedImages.forEach((image, index) => {
        if (image && image.file) {
          formData.append(`[${index}][image]`, image.file);
        }
      });
  
      await addOurAssortment(formData);
      toast.success("Data saved successfully!");
    } catch (error) {
      toast.error("Error saving data!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
          Our Assortment
        </h5>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-14 overflow-x-auto pl-[54px]">
        <Formik enableReinitialize initialValues={values} onSubmit={handleSave}>
          {({ setFieldValue }) => (
            <Form>
              <div className="flex flex-col gap-[40px] mb-[24px]">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-12">
                    {values.name_en.map((_, index) => (
                      <div key={index} className="flex gap-[12px] flex-wrap my-3 flex-col p-2 rounded bg-white">
                        <label htmlFor={`value-${index}`} className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block">
                          Group {index + 1}
                        </label>
                        <div className="flex flex-col items-center">
                          {selectedImages[index] ? (
                            <div className="relative">
                              <img src={selectedImages[index].preview} alt="Uploaded" className="w-[140px] h-[140px] object-cover rounded-md border" />
                              <button type="button" onClick={() => handleRemove(index, setFieldValue)} className="absolute top-2 right-2 text-black">
                                <XCircleIcon className="h-6 w-6 text-gray-500" />
                              </button>
                            </div>
                          ) : (
                            <Dropzone width="140px" height="140px" onDrop={(acceptedFiles) => handleDrop(acceptedFiles, index, setFieldValue)} />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <Field type="text" name={`name_nl[${index}]`} placeholder="Naam" component={FormikField} />
                          <Field type="text" name={`name_en[${index}]`} placeholder="Name" component={FormikField} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <Field as="textarea" name={`description_nl[${index}]`} placeholder="Description (nl)" component={Textarea} />
                          <Field as="textarea" name={`description_en[${index}]`} placeholder="Description (en)" component={Textarea} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button loading={loading} type="submit" btnText="Save" paddingX="20px" textColor="#000000" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};