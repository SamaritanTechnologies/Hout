import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import PlusCircle from "../assets/DashboardImages/plusCricle.svg";
import CrossCircle from "../assets/DashboardImages/cancelCircle.svg";
import Textarea from "../components/Common/Textarea";
import Button from "../components/Common/Button";
import Dropzone from "../components/Common/Dropzone";
import addImg from "../assets/DashboardImages/add.svg";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikField from "../components/Common/FormikField";
import { Multiselect } from "multiselect-react-dropdown";
import checkSquareIcon from "../assets/DashboardImages/check-square.svg";
import {
  addProduct,
  getProductCategories,
} from "../redux/actions/productActions";
import { useSelector } from "react-redux";

const styleMultiSelect = {
  chips: {
    background: "#F8F8F8",
    borderRadius: "4px",
  },
  searchBox: {},
  option: {
    background: "white",
    color: "black",
  },
};

const validTypes = ["image/jpeg", "image/png", "image/webp"];

const productItem = {
  length: "",
  product_id_prefix: "",
  full_price_ex_vat: "",
  discount: "",
  stock: "",
};

export const AddNewProduct = () => {
  const navigate = useNavigate();
  const { productCategories: categories } = useSelector((state) => state.admin);
  const [products, setProducts] = useState([{ ...productItem }]);
  const [images, setImages] = useState([]);
  const [isErrors, setIsErrors] = useState({
    images: false,
  });

  const getChoicesByName = (name) => {
    const category = categories?.find((cat) => cat.name.toLowerCase() === name.toLowerCase());
    return category ? category.choices : [];
  };
  

  const handleAddRow = () => {
    setProducts([...products, { ...productItem }]);
  };

  const handleRemoveRow = (index) => {
    if (products.length === 1) {
      setProducts([{ ...productItem }]);
    } else {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

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

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validTypes.includes(file.type)) {
        const newImage = {
          file: file,
          preview: URL.createObjectURL(file),
        };
        setImages((prevImages) => [...prevImages, newImage]);
        setIsErrors((prev) => ({ ...prev, images: false }));
      } else {
        alert("Please upload a valid image (jpg, jpeg, png, or webp)");
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      setIsErrors((prev) => ({ ...prev, images: updatedImages.length === 0 }));
      return updatedImages;
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          nameNl: "",
          group: [],
          type: [],
          material: [],
          profile: [],
          durability_class: [],
          quality: [],
          application: [],
          productDescription: "",
          productDescriptionNl: "",
          thickness: "",
          width: "",
          weight: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          nameNl: Yup.string().required("Naam is required"),
          thickness: Yup.number().required("Thickness is required"),
          width: Yup.number().required("Width is required"),
          weight: Yup.number().required("Weight is required"),
          productDescription: Yup.string().required(
            "Product Description is required"
          ),
          productDescriptionNl: Yup.string().required(
            "Product omschrijving is required"
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (!images?.length) {
            setIsErrors((prev) => ({ ...prev, images: true }));
            return;
          }
          try {
            await addProduct(values, products, images);
            navigate("/products");
          } catch (error) {
            console.error("Error submitting form:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, errors }) => (
          <Form>
            <div className="lg:pt-[50px] pt-[30px] xl:pb-[30px] lg:pb-[25px] pb-[20px] px-[20px] bg-[rgb(250,250,250)] h-full min-h-[86vh]">
              <div className="flex gap-2 items-center">
                <div
                  onClick={() => {
                    navigate("/products");
                  }}
                  className="cursor-pointer"
                >
                  <img src={ArrowBack} alt="" />
                </div>
                <h5 className="xl:text-32 lg:text-28 text-26 font-bold">
                  Products
                </h5>
              </div>

              <div className="myCard rounded-[4px] xl:mb-[30px] lg:mb-[25px] mb-[20px] mx-auto max-w-[912px]">
                <div className="flex mb-4">
                  <h5 className="xl:text-26 lg:text-24 text-22 font-semibold">
                    Add New Product
                  </h5>
                </div>
                <div className="formSec">
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2">
                      <div className="w-full md:mb-0">
                        <Field
                          type="text"
                          name="nameNl"
                          id="nameNl"
                          as="sele"
                          placeholder="Naam"
                          label="Naam"
                          component={FormikField}
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="w-full md:mb-0">
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          as="sele"
                          placeholder="Name"
                          label="Name"
                          component={FormikField}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[20px] mb-[25px]">
                    <div className="w-full  md:mb-0">
                      <label className="text-sm">Groep | Group</label>
                      <Multiselect
                        closeIcon="close"
                        style={styleMultiSelect}
                        name="group"
                        id="group"
                        options={getChoicesByName("group")}
                        displayValue="name_en"
                        selectedValues={values.group}
                        onSelect={(selectedList) => {
                          setFieldValue("group", selectedList);
                        }}
                        onRemove={(selectedList) =>
                          setFieldValue("group", selectedList)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[20px] mb-[24px]">
                    <div className="w-full md:mb-0">
                      <label className="text-sm">Soort | Type</label>
                      <Multiselect
                        closeIcon="close"
                        style={styleMultiSelect}
                        name="type"
                        id="type"
                        options={getChoicesByName("type")}
                        displayValue="name_en"
                        selectedValues={values.type}
                        onSelect={(selectedList) => {
                          setFieldValue("type", selectedList);
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm">Materiaal | Material</label>
                      <Multiselect
                        closeIcon="close"
                        style={styleMultiSelect}
                        name="material"
                        id="material"
                        options={getChoicesByName("material")}
                        displayValue="name_en"
                        selectedValues={values.material}
                        onSelect={(selectedList) => {
                          setFieldValue("material", selectedList);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[20px] mb-[24px]">
                    <div className="w-full md:mb-0">
                      <label className="text-sm">Profiel | Profile</label>
                      <Multiselect
                        closeIcon="close"
                        style={styleMultiSelect}
                        name="profile"
                        id="profile"
                        options={getChoicesByName("profile")}
                        displayValue="name_en"
                        selectedValues={values.profile}
                        onSelect={(selectedList) => {
                          setFieldValue("profile", selectedList);
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm">
                        Duurzaamheidsklasse | Durability Class
                      </label>
                      <Multiselect
                        closeIcon="close"
                        style={styleMultiSelect}
                        name="durability_class"
                        id="durability_class"
                        options={getChoicesByName("durability_class")}
                        displayValue="name_en"
                        selectedValues={values.durability_class}
                        onSelect={(selectedList) => {
                          setFieldValue("durability_class", selectedList);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-[20px] mb-[24px]">
                    <div className="w-full md:mb-0">
                      <label className="text-sm">Kwaliteit | Quality</label>
                      <Multiselect
                        closeIcon="close"
                        style={styleMultiSelect}
                        name="quality"
                        id="quality"
                        options={getChoicesByName("quality")}
                        displayValue="name_en"
                        selectedValues={values.quality}
                        onSelect={(selectedList) => {
                          setFieldValue("quality", selectedList);
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm">
                        Toepassing | Application
                      </label>
                      <Multiselect
                        closeIcon="close"
                        style={styleMultiSelect}
                        name="application"
                        id="application"
                        options={getChoicesByName("application")}
                        displayValue="name_en"
                        selectedValues={values.application}
                        onSelect={(selectedList) => {
                          setFieldValue("application", selectedList);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 inline-block rounded-lg overflow-hidden">
                      <Field
                        type="text"
                        name="productDescriptionNl"
                        id="productDescriptionNl"
                        as="sele"
                        placeholder="omschrijving"
                        label="Product omschrijving"
                        component={Textarea}
                      />
                    </div>
                    <div className="w-1/2 inline-block rounded-lg overflow-hidden">
                      <Field
                        type="text"
                        name="productDescription"
                        id="productDescription"
                        as="sele"
                        placeholder="Description"
                        label="Product Description"
                        component={Textarea}
                      />
                    </div>
                  </div>
                  <div className="h-1.5 blur-sm bg-black w-full mb-[24px]"></div>
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0">
                      <Field
                        type="number"
                        min={0}
                        postfix="mm"
                        name="width"
                        id="width"
                        placeholder="Width"
                        label="Breedte | Width"
                        component={FormikField}
                      />
                    </div>
                    <div className="w-1/2">
                      <Field
                        type="number"
                        min={0}
                        postfix="mm"
                        name="thickness"
                        id="thickness"
                        placeholder="Thickness"
                        label="Dikte | Thickness"
                        component={FormikField}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[20px] mb-[24px]">
                    <div className="w-1/2">
                      <Field
                        type="number"
                        min={0}
                        postfix="kg"
                        name="weight"
                        id="weight"
                        placeholder="1200"
                        label="Gewicht per m3 | Weight per m3"
                        component={FormikField}
                      />
                    </div>
                    <div className="w-1/2 md:mb-0"></div>
                  </div>

                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb]">
                              Lengte | Lenght
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

                            <th className="px-[2px] py-[16px] text-end text-16 font-semibold">
                              <button
                                type="button"
                                onClick={handleAddRow}
                                className="flex justify-end"
                              >
                                <img src={PlusCircle} alt="Add" />
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {products?.map((product, index) => (
                            <tr key={index}>
                              <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
                                <input
                                  type="number"
                                  min={0}
                                  value={product.length}
                                  required
                                  placeholder="300 cm"
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "length",
                                      e.target.value
                                    )
                                  }
                                  className="w-full outline-none bg-transparent"
                                />
                              </td>
                              <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
                                <input
                                  required
                                  type="text"
                                  placeholder="HHP123_300"
                                  value={product.product_id_prefix}
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "product_id_prefix",
                                      e.target.value
                                    )
                                  }
                                  className="w-full outline-none bg-transparent"
                                />
                              </td>
                              <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
                                <input
                                  required
                                  type="number"
                                  min={0}
                                  value={product.full_price_ex_vat}
                                  placeholder="30,000"
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "full_price_ex_vat",
                                      e.target.value
                                    )
                                  }
                                  className="w-full outline-none bg-transparent"
                                />
                              </td>
                              <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
                                <input
                                  type="number"
                                  min={0}
                                  value={product.discount}
                                  placeholder="12%"
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "discount",
                                      e.target.value
                                    )
                                  }
                                  className="w-full outline-none bg-transparent"
                                />
                              </td>
                              <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
                                <input
                                  required
                                  type="number"
                                  min={0}
                                  placeholder="140"
                                  value={product.stock}
                                  onChange={(e) =>
                                    handleChange(index, "stock", e.target.value)
                                  }
                                  className="w-full outline-none bg-transparent"
                                />
                              </td>
                              <td className="px-[2px] py-[16px] text-end">
                                <img
                                  src={CrossCircle}
                                  alt="Remove"
                                  onClick={() => handleRemoveRow(index)}
                                  className="cursor-pointer h-5 w-5"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="h-1.5 blur-sm bg-black w-full mb-[24px]"></div>
                  <div className="flex gap-5 items-center mb-[24px]">
                    <img src={checkSquareIcon} alt="check square" />
                    <p className="font-semibold text-lg text-[#111727]">
                      Place Product on GoedGeplaatst via API
                    </p>
                  </div>
                  <div className="h-1.5 blur-sm bg-black w-full mb-[24px]"></div>
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
                        <Dropzone
                          width="215px"
                          height="215px"
                          onDrop={handleDrop}
                        />
                        <div className="w-full max-w-[215px] h-[215px] border border-dashed border-[#4C5B66] rounded-lg p-3 flex items-center justify-center">
                          <input
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            style={{ display: "none" }}
                            onChange={handleImageSelect} // Trigger when an image is selected
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="w-full h-full flex items-center justify-center cursor-pointer"
                          >
                            <img
                              src={addImg}
                              className="xl:w-[82px] lg:w-[70px] w-[60px]"
                              alt="Add"
                            />
                          </label>
                        </div>

                        {/* Display uploaded images */}
                        {images?.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-[215px] h-[215px] rounded-lg overflow-hidden"
                          >
                            <img
                              src={image.preview}
                              alt={`product-${index}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-600"
                            >
                              {/* <IoCloseCircle size={24} /> */}
                            </button>
                          </div>
                        ))}
                      </div>
                      {isErrors.images && (
                        <p className="text-sm text-red mt-2">
                          Please upload atleast 1 image
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Button
                      loading={isSubmitting}
                      type="submit"
                      btnText="Add Product"
                      paddingX="20px"
                      textColor="#000000"
                      breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
