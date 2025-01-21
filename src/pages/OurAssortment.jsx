import React from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Dropzone from "../components/Common/Dropzone";
import Button from "../components/Common/Button";
import FormikField from "../components/Common/FormikField";
import Textarea from "../components/Common/Textarea";
import { Formik, Form, Field } from "formik";

const handleDrop = (acceptedFiles) => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const newImages = acceptedFiles
    .filter((file) => validTypes.includes(file.type))
    .map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

  console.log(newImages);

  const invalidFiles = acceptedFiles.filter(
    (file) => !validTypes.includes(file.type)
  );
  if (invalidFiles.length > 0) {
    alert("Some files are invalid. Only JPEG, PNG, and WebP are accepted.");
  }
};

export const OurAssortment = () => {
  const initialValues = {
    groupName: "",
    description: "",
    images: [],
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <img src={ArrowBack} alt="Back" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">Our Assortment</h5>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-14 overflow-x-auto pl-[54px]">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="flex flex-col gap-[40px] mb-[24px]">
                <div className="w-full">
                  <div className="flex flex-wrap gap-[5%]">
                  <div className="flex gap-[12px] flex-wrap my-3 flex-col w-[30%]">
                  <label
                    htmlFor="images"
                    className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                  >
                    Group 1
                  </label>
                    <div className="flex justify-center">
                    <Dropzone
                      width="140px"
                      height="140px"
                      onDrop={(acceptedFiles) => {
                        handleDrop(acceptedFiles);
                        setFieldValue("images", acceptedFiles);
                      }}
                    />
                    </div>
                     <Field
                          type="text"
                          name="nameNl"
                          id="nameNl"
                          as="sele"
                          placeholder="Group Name"
                          component={FormikField}
                        />
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      as="textarea"
                      placeholder="Description"
                      component={Textarea}
                      className="h-16 w-full"
                    />
                  </div>
                  <div className="flex gap-[12px] flex-wrap my-3 flex-col w-[30%]">
                  <label
                    htmlFor="images"
                    className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                  >
                    Group 1
                  </label>
                    <div className="flex justify-center">
                    <Dropzone
                      width="140px"
                      height="140px"
                      onDrop={(acceptedFiles) => {
                        handleDrop(acceptedFiles);
                        setFieldValue("images", acceptedFiles);
                      }}
                    />
                    </div>
                     <Field
                          type="text"
                          name="nameNl"
                          id="nameNl"
                          as="sele"
                          placeholder="Group Name"
                          component={FormikField}
                        />
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      as="textarea"
                      placeholder="Description"
                      component={Textarea}
                      className="h-16 w-full"
                    />
                  </div>
                  <div className="flex gap-[12px] flex-wrap my-3 flex-col w-[30%]">
                  <label
                    htmlFor="images"
                    className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                  >
                    Group 1
                  </label>
                    <div className="flex justify-center">
                    <Dropzone
                      width="140px"
                      height="140px"
                      onDrop={(acceptedFiles) => {
                        handleDrop(acceptedFiles);
                        setFieldValue("images", acceptedFiles);
                      }}
                    />
                    </div>
                     <Field
                          type="text"
                          name="nameNl"
                          id="nameNl"
                          as="sele"
                          placeholder="Group Name"
                          component={FormikField}
                        />
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      as="textarea"
                      placeholder="Description"
                      component={Textarea}
                      className="h-16 w-full"
                    />
                  </div>
                  
                  
                  </div>

                  <Button
                    loading={false}
                    type="submit"
                    btnText="Save"
                    paddingX="20px"
                    textColor="#000000"
                    breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
                  />
                </div>
                <div className="w-full">
                  <div className="flex flex-wrap gap-[5%]">
                  <div className="flex gap-[12px] flex-wrap my-3 flex-col w-[30%]">
                  <label
                    htmlFor="images"
                    className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                  >
                    Group 1
                  </label>
                    <div className="flex justify-center">
                    <Dropzone
                      width="140px"
                      height="140px"
                      onDrop={(acceptedFiles) => {
                        handleDrop(acceptedFiles);
                        setFieldValue("images", acceptedFiles);
                      }}
                    />
                    </div>
                     <Field
                          type="text"
                          name="nameNl"
                          id="nameNl"
                          as="sele"
                          placeholder="Group Name"
                          component={FormikField}
                        />
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      as="textarea"
                      placeholder="Description"
                      component={Textarea}
                      className="h-16 w-full"
                    />
                  </div>
                  <div className="flex gap-[12px] flex-wrap my-3 flex-col w-[30%]">
                  <label
                    htmlFor="images"
                    className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                  >
                    Group 1
                  </label>
                    <div className="flex justify-center">
                    <Dropzone
                      width="140px"
                      height="140px"
                      onDrop={(acceptedFiles) => {
                        handleDrop(acceptedFiles);
                        setFieldValue("images", acceptedFiles);
                      }}
                    />
                    </div>
                     <Field
                          type="text"
                          name="nameNl"
                          id="nameNl"
                          as="sele"
                          placeholder="Group Name"
                          component={FormikField}
                        />
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      as="textarea"
                      placeholder="Description"
                      component={Textarea}
                      className="h-16 w-full"
                    />
                  </div>
                  <div className="flex gap-[12px] flex-wrap my-3 flex-col w-[30%]">
                  <label
                    htmlFor="images"
                    className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                  >
                    Group 1
                  </label>
                    <div className="flex justify-center">
                    <Dropzone
                      width="140px"
                      height="140px"
                      onDrop={(acceptedFiles) => {
                        handleDrop(acceptedFiles);
                        setFieldValue("images", acceptedFiles);
                      }}
                    />
                    </div>
                     <Field
                          type="text"
                          name="nameNl"
                          id="nameNl"
                          as="sele"
                          placeholder="Group Name"
                          component={FormikField}
                        />
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      as="textarea"
                      placeholder="Description"
                      component={Textarea}
                      className="h-16 w-full"
                    />
                  </div>
                  
                  
                  </div>

                  <Button
                    loading={false}
                    type="submit"
                    btnText="Save"
                    paddingX="20px"
                    textColor="#000000"
                    breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

