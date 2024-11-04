import React from "react";
import InputField from "../components/Common/InputField";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import PlusCircle from "../assets/DashboardImages/plusCricle.svg";
import Textarea from "../components/Common/Textarea";
import Button from "../components/Common/Button";
import Dropzone from "../components/Common/Dropzone";
import addImg from "../assets/DashboardImages/add.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikField from "../components/Common/FormikField";
import { Multiselect } from "multiselect-react-dropdown";

export const AddNewProduct = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const selectedProduct = location?.state?.item;
  const objectArray = [
    { key: "Option 1", cat: "Group 1" },
    { key: "Option 2", cat: "Group 1" },
    { key: "Option 3", cat: "Group 1" },
    { key: "Option 4", cat: "Group 2" },
    { key: "Option 5", cat: "Group 2" },
    { key: "Option 6", cat: "Group 2" },
    { key: "Option 7", cat: "Group 2" }
  ]

  const styleMultiSelect = {
    chips: {
      background: "gray",
      borderRadius: '2px',
    },
    searchBox: {
    },
    option: {
      background: 'white',
      color: 'black',
    }

  };

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            name: selectedProduct?.name ?? "",
            group: "",
            typeOfWood: "",
            woodGroup: "",
            typeOfProduct: "",
            durabilityGlass: "",
            quality: "",
            edited: "",
            application: "",
            thickness: "",
            width: "",
            length: "",
            productDescription: "",
            discount: "",
            stock: "",
            weight: "",
            images: [],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            group: Yup.string().required("Group is required"),
            typeOfWood: Yup.string().required("Type of Wood is required"),
            woodGroup: Yup.string().required("Wood Group is required"),
            typeOfProduct: Yup.string().required("Type of Product is required"),
            durabilityGlass: Yup.string().required(
              "Durability Glass is required"
            ),
            quality: Yup.string().required("Quality is required"),
            edited: Yup.string().required("Edited is required"),
            application: Yup.string().required("Application is required"),
            thickness: Yup.string().required("Thickness is required"),
            width: Yup.string().required("Width is required"),
            length: Yup.string().required("Length is required"),
            productDescription: Yup.string().required(
              "Product Description is required"
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form action="">
            <div className=" cursor-pointer xl:pt-[80px] lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
              <div
                onClick={() => {
                  navigate("/products");
                }}
                className="flex gap-2 items-center xl:mb-[20px] lg:mb-[10px] mb-[10px]"
              >
                <img src={ArrowBack} alt="" />
                <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
                  Add New Product
                </h5>
              </div>
              <div className="myCard rounded-[4px] xl:mb-[30px] lg:mb-[25px] mb-[20px]">
                <div className="formSec">
                  <div className="xl:mb-[24px] mb-[15px]">
                    <div className="w-full md:mb-0">
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        as="sele"
                        placeholder="Name"
                        required
                        label="Name"
                        component={FormikField}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[20px] mb-[25px]">
                    <div className="w-full  md:mb-0">
                      <label>Group</label>
                      <Multiselect
                        options={objectArray}
                        displayValue="key"
                        closeIcon="close"
                        style={styleMultiSelect}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0">
                    <label>Type</label>
                      <Multiselect
                        options={objectArray}
                        displayValue="key"
                        closeIcon="close"
                        style={styleMultiSelect}
                      />
                    </div>
                    <div className="w-1/2">
                      {/* <Field
                        type="text"
                        name="woodGroup"
                        id="woodGroup"
                        placeholder="Wood Group"
                        required
                        label="Wood Group"
                        component={FormikField}
                      /> */}
                      <label>Material</label>
                      <Multiselect
                        options={objectArray}
                        displayValue="key"
                        closeIcon="close"
                        style={styleMultiSelect}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0">
                      {/* <Field
                        type="text"
                        name="typeOfProduct"
                        id="typeOfProduct"
                        placeholder="Type of Product"
                        required
                        label="Type of Product"
                        component={FormikField}
                      /> */}
                      <label>Profile</label>
                      <Multiselect
                        options={objectArray}
                        displayValue="key"
                        closeIcon="close"
                        style={styleMultiSelect}
                      />
                    </div>
                    <div className="w-1/2">
                    <label>Durability Class</label>
                      <Multiselect
                        options={objectArray}
                        displayValue="key"
                        closeIcon="close"
                        style={styleMultiSelect}
                      />
                    </div>
                  </div>

                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0">
                    <label>Quality</label>
                      <Multiselect
                        options={objectArray}
                        displayValue="key"
                        closeIcon="close"
                        style={styleMultiSelect}
                      />
                    </div>
                    <div className="w-1/2">
                    <label>Application</label>
                      <Multiselect
                        options={objectArray}
                        displayValue="key"
                        closeIcon="close"
                        style={styleMultiSelect}
                      />
                    </div>
                  </div>
                  <div className="inline-block min-w-full rounded-lg overflow-hidden">
                  <label
                        name="productDescription"
                        class=" text-black text-xs font-semibold xl:mb-[8px] mb-[4px] block"
                        for="email"
                    >
                      Product Description
                    </label>
                    <Textarea name="productDescription" />
                  </div>
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0">
                    <Field
                        type="text"
                        name="with"
                        id="width"
                        placeholder="Width"
                        required
                        label="Width"
                        component={FormikField}
                      />
                    </div>
                    <div className="w-1/2">
                    <Field
                        type="text"
                        name="thickness"
                        id="thickness"
                        placeholder="Thickness"
                        required
                        label="Thickness"
                        component={FormikField}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2">
                      <Field
                        type="text"
                        name="weight"
                        id="weight"
                        placeholder="Weight"
                        required
                        label="Weight"
                        component={FormikField}
                      />
                    </div>
                    <div className="w-1/2 md:mb-0">
                  
                    </div>
                  </div>
                  {/* <div class=" flex mb-[10px]">
                    <div class="w-full mb-0 md:mb-0">
                      <label
                        name="productDescription"
                        class=" text-black text-xs font-semibold xl:mb-[8px] mb-[4px] block"
                        for="email"
                      >
                        Product Description
                      </label>
                      <Textarea name="productDescription" />
                    </div>
                  </div> */}

                  {/* Add other fields similarly */}

                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                              Variant/Length
                            </th>
                            <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold	">
                              Product ID
                            </th>
                            <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold	">
                              Full Price ex Vat
                            </th>
                            <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold	">
                              Discount
                            </th>
                            <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl	">
                              Stock
                            </th>
                            <th className="px-[2px] py-[16px] text-end text-16 font-semibold ">
                              <a href="#" className="flex justify-end">
                                <img src={PlusCircle} alt="" />
                              </a>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Variant Length
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Product ID
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Price
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Discount
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Stock
                            </td>
                          </tr>
                          <tr>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Variant Length
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Product ID
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Price
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Discount
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9] ">
                              Stock
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
{/* 
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0 relative">
                      <Field
                        type="text"
                        name="discount"
                        placeholder="Discount %"
                        id="discount"
                        label="Discount"
                        component={FormikField}
                      />
                    </div>
                    <div className="w-1/2">
                      <Field
                        type="text"
                        name="stock"
                        placeholder="Stock"
                        id="stock"
                        label="Stock"
                        component={FormikField}
                      />
                    </div>
                  </div> */}

                  {/* <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0 relative">
                      <label
                        htmlFor="weight"
                        className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                      >
                        Price per m3
                        <br />
                        <span className="text-[#6C7275] font-normal text-12">
                          length x width x thickness in meters
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="weight"
                        placeholder="Weight"
                        id="weight"
                        component={FormikField}
                      />
                    </div>
                  </div> */}

                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-full md:mb-0 relative">
                      <label
                        htmlFor="images"
                        className="text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                      >
                        Product Image
                        <br />
                        <span className="text-[#6C7275] font-normal text-12">
                          You can Upload Multiple Images of product in different
                          dimensions
                        </span>
                      </label>
                      <div className="flex gap-[14px] flex-wrap">
                        <Dropzone width={"215px"} />
                        <div
                          style={{
                            width: "215px",
                            height: "215px",
                            border: "0.93px dashed #4C5B66",
                            borderRadius: "7.8px",
                            padding: "12px",
                          }}
                        >
                          <a
                            href="#"
                            style={{
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={addImg}
                              className="xl:w-[82px] lg:w-[70px] w-[60px]"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      btnText="Add Product"
                      paddingX="20px"
                      breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
