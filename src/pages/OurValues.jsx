import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";
import FormikField from "../components/Common/FormikField";
import Textarea from "../components/Common/Textarea";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import ErrorMessage
import { XCircleIcon } from "@heroicons/react/24/outline";
import { addOurValues, getOurValues } from "../redux/actions/dashboardActions";
import { toast } from "react-toastify";
import * as Yup from "yup"; // Import Yup for validation
import { fetchImageAsFile } from "../redux/actions/productActions";

export const OurValues = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title_en: new Array(4).fill(""),
    title_nl: new Array(4).fill(""),
    description_en: new Array(4).fill(""),
    description_nl: new Array(4).fill(""),
    images: new Array(4).fill(null),
  });

  const [selectedImages, setSelectedImages] = useState(new Array(4).fill(null));

  // Validation Schema
  const validationSchema = Yup.object().shape({
    title_en: Yup.array()
      .of(Yup.string().required("Title (English) is required"))
      .min(4, "All 4 values must be filled"),
    title_nl: Yup.array()
      .of(Yup.string().required("Title (Dutch) is required"))
      .min(4, "All 4 values must be filled"),
    description_en: Yup.array()
      .of(Yup.string().required("Description (English) is required"))
      .min(4, "All 4 values must be filled"),
    description_nl: Yup.array()
      .of(Yup.string().required("Description (Dutch) is required"))
      .min(4, "All 4 values must be filled"),
    images: Yup.array()
      .of(Yup.mixed().required("Image is required"))
      .min(4, "All 4 images must be uploaded"),
  });

  useEffect(() => {
    const fetchOurValues = async () => {
      setLoading(true);
      try {
        const data = await getOurValues();

        let updatedValues;
        let updatedImages;

        if (data && data.length > 0) {
          updatedImages = data.map((item) => ({
            preview: item.image,
            file: null,
            name: item.image.split("/").pop(),
          }));

          updatedValues = {
            title_en: data.map((item) => item.title_en || ""),
            title_nl: data.map((item) => item.title_nl || ""),
            description_en: data.map((item) => item.description_en || ""),
            description_nl: data.map((item) => item.description_nl || ""),
            images: updatedImages,
          };

          // Ensure always 4 sections (if less than 4, fill with empty values)
          while (updatedValues.title_en.length < 4) {
            updatedValues.title_en.push("");
            updatedValues.title_nl.push("");
            updatedValues.description_en.push("");
            updatedValues.description_nl.push("");
            updatedImages.push(null);
          }
        } else {
          // Initialize empty fields if no data
          updatedValues = {
            title_en: new Array(4).fill(""),
            title_nl: new Array(4).fill(""),
            description_en: new Array(4).fill(""),
            description_nl: new Array(4).fill(""),
            images: new Array(4).fill(null),
          };
          updatedImages = new Array(4).fill(null);
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
      file, // Store actual file for API
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

      values.title_en.forEach((title, index) => {
        formData.append(`[${index}][title_en]`, title);
      });

      values.title_nl.forEach((title, index) => {
        formData.append(`[${index}][title_nl]`, title);
      });

      values.description_en.forEach((desc, index) => {
        formData.append(`[${index}][description_en]`, desc);
      });

      values.description_nl.forEach((desc, index) => {
        formData.append(`[${index}][description_nl]`, desc);
      });

      // Append images correctly
      for (let index = 0; index < selectedImages.length; index++) {
        const image = selectedImages[index];

        if (image && image.file) {
          // If a new file is uploaded, append it directly
          formData.append(`[${index}][image]`, image.file);
        } else if (image && image.preview) {
          // If an existing image URL is present, fetch it and convert to binary
          const file = await fetchImageAsFile(image.preview);
          formData.append(`[${index}][image]`, file);
        } else {
          // If no image is present, append an empty value
          formData.append(`[${index}][image]`, "");
        }
      }

      await addOurValues(formData);
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
        <Formik
          enableReinitialize
          initialValues={values}
          validationSchema={validationSchema} // Add validation schema
          onSubmit={handleSave}
        >
          {({ setFieldValue, isValid, touched }) => (
            <Form>
              <div className="flex flex-col gap-[40px] mb-[24px]">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-12">
                    {values.title_en.map((_, index) => (
                      <div key={index} className="flex gap-[12px] flex-wrap my-3 flex-col p-2 rounded bg-white">
                        <label htmlFor={`value-${index}`} className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block">
                          Value {index + 1}
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
                          <ErrorMessage name={`images[${index}]`} component="div" className="text-red text-sm mt-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Field type="text" name={`title_nl[${index}]`} placeholder="Naam" component={FormikField} />
                            <ErrorMessage name={`title_nl[${index}]`} component="div" className="text-red text-sm mt-1" />
                          </div>
                          <div>
                            <Field type="text" name={`title_en[${index}]`} placeholder="Name" component={FormikField} />
                            <ErrorMessage name={`title_en[${index}]`} component="div" className="text-red text-sm mt-1" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Field as="textarea" name={`description_nl[${index}]`} placeholder="Description (nl)" component={Textarea} />
                            <ErrorMessage name={`description_nl[${index}]`} component="div" className="text-red text-sm mt-1" />
                          </div>
                          <div>
                            <Field as="textarea" name={`description_en[${index}]`} placeholder="Description (en)" component={Textarea} />
                            <ErrorMessage name={`description_en[${index}]`} component="div" className="text-red text-sm mt-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  loading={loading}
                  type="submit"
                  btnText="Save"
                  paddingX="20px"
                  textColor="#000000"
                  breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
                  disabled={!isValid || !touched} // Disable if form is invalid or not touched
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};