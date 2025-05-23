import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";
import FormikField from "../components/Common/FormikField";
import Textarea from "../components/Common/Textarea";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import ErrorMessage
import { XCircleIcon } from "@heroicons/react/24/outline";
import nlflag from "../assets/DashboardImages/flag-netherlands.svg";
import usaflag from "../assets/DashboardImages/USA-flag.svg";
import {
  addOurAssortment,
  getOurAssortment,
} from "../redux/actions/dashboardActions";
import { toast } from "react-toastify";
import * as Yup from "yup"; // Import Yup for validation

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

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name_en: Yup.array()
      .of(Yup.string().required("Name (English) is required"))
      .min(9, "All 9 values must be filled"),
    name_nl: Yup.array()
      .of(Yup.string().required("Name (Dutch) is required"))
      .min(9, "All 9 values must be filled"),
    description_en: Yup.array()
      .of(Yup.string().required("Description (English) is required"))
      .min(9, "All 9 values must be filled"),
    description_nl: Yup.array()
      .of(Yup.string().required("Description (Dutch) is required"))
      .min(9, "All 9 values must be filled"),
    images: Yup.array()
      .of(Yup.mixed().required("Image is required"))
      .min(9, "All 9 images must be uploaded"),
  });

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

          // Ensure always 9 sections (if less than 9, fill with empty values)
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

  // Function to fetch an image URL and convert it to a File object
  const fetchImageAsFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
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
      for (let index = 0; index < selectedImages.length; index++) {
        const image = selectedImages[index];
        if (image && image.file) {
          // If a new file is uploaded, append it directly
          formData.append(`[${index}][image]`, image.file);
        } else if (image && image.preview) {
          // If an existing image URL is present, fetch it and convert to binary
          const file = await fetchImageAsFile(
            image.preview,
            `image_${index}.jpg`
          );
          formData.append(`[${index}][image]`, file);
        } else {
          // If no image is present, append an empty value
          formData.append(`[${index}][image]`, "");
        }
      }

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
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Our Assortment
      </h2>
      <Formik
        enableReinitialize
        initialValues={values}
        validationSchema={validationSchema} // Add validation schema
        onSubmit={handleSave}
      >
        {({ setFieldValue, isValid, touched }) => (
          <Form className="flex flex-col gap-[40px] max-w-[848px] mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {values.name_en.map((_, index) => (
                <div
                  key={index}
                  className="flex gap-[12px] flex-wrap flex-col p-2 rounded bg-white"
                >
                  <label
                    htmlFor={`value-${index}`}
                    className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                  >
                    Group {index + 1}
                  </label>
                  <div className="flex flex-col items-center">
                    {selectedImages[index] ? (
                      <div className="relative">
                        <img
                          src={selectedImages[index].preview}
                          alt="Uploaded"
                          className="w-[140px] h-[140px] object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemove(index, setFieldValue)}
                          className="absolute top-2 right-2 text-black"
                        >
                          <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
                        </button>
                      </div>
                    ) : (
                      <Dropzone
                        width="140px"
                        height="140px"
                        onDrop={(acceptedFiles) =>
                          handleDrop(acceptedFiles, index, setFieldValue)
                        }
                      />
                    )}
                    <ErrorMessage
                      name={`images[${index}]`}
                      component="div"
                      className="text-red text-sm mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Field
                        type="text"
                        name={`name_nl[${index}]`}
                        placeholder="Naam"
                        component={FormikField}
                      />
                      <img
                        className="absolute right-2 top-4 w-5 h-5"
                        src={nlflag}
                        alt="USA flag"
                      />
                      <ErrorMessage
                        name={`name_nl[${index}]`}
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>
                    <div className="relative">
                      <Field
                        type="text"
                        name={`name_en[${index}]`}
                        placeholder="Name"
                        component={FormikField}
                      />{" "}
                      <img
                        className="absolute right-2 top-4 w-5 h-5"
                        src={usaflag}
                        alt="USA flag"
                      />
                      <ErrorMessage
                        name={`name_en[${index}]`}
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Field
                        as="textarea"
                        name={`description_nl[${index}]`}
                        placeholder="Description (nl)"
                        component={Textarea}
                      />
                      <ErrorMessage
                        name={`description_nl[${index}]`}
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        as="textarea"
                        name={`description_en[${index}]`}
                        placeholder="Description (en)"
                        component={Textarea}
                      />
                      <ErrorMessage
                        name={`description_en[${index}]`}
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};
