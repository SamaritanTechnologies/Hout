import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import PlusCircle from "../assets/DashboardImages/plusCricle.svg";
import CrossCircle from "../assets/DashboardImages/cancelCircle.svg";
import Textarea from "../components/Common/Textarea";
import Button from "../components/Common/Button";
import Dropzone from "../components/Common/Dropzone";
import addImg from "../assets/DashboardImages/add.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikField from "../components/Common/FormikField";
import Select from "react-select";
import { Multiselect } from "multiselect-react-dropdown";
import {
  getProducts,
  getProductDetailsById,
  updateProduct,
  getAllProductsList,
} from "../redux/actions/productActions";
import { XCircleIcon } from "@heroicons/react/24/outline";
import checkSquareIcon from "../assets/DashboardImages/check-square.svg";
import { useSelector } from "react-redux";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const styleMultiSelect = {
  chips: {
    background: "#F8F8F8",
    borderRadius: "4px",
  },
  searchBox: {
    position: "relative",
    paddingRight: "30px",
  },
  option: {
    background: "white",
    color: "black",
  },
};

const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

const productItem = {
  length: "",
  full_price_ex_vat: "",
  discount: "",
  stock: "",
};

const relatedInitial = {
  product1: null,
  product2: null,
  product3: null,
  product4: null,
};

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { productCategories: categories } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [lengths, setLengths] = useState([{ ...productItem }]);
  const [images, setImages] = useState([]);
  const [isErrors, setIsErrors] = useState({
    images: false,
  });

  const [relatedProducts, setRelatedProducts] = useState(relatedInitial);
  const [relatedProductsOptions, setRelatedProductsOptions] = useState([]);

  const { t } = useTranslation();

  const getProductDetails = async (id) => {
    try {
      const res = await getProductDetailsById(id);

      if (res) {
        setProduct(res);
        console.log("product sdsddsa", res);
        setLengths(res.lengths || [{ ...productItem }]);

        const newImages = res.images?.map((image) => ({
          id: image.id,
          file: image.image,
          preview: image.image,
        }));

        setImages(newImages || []);

        const relatedProductsArray = res.related_products || [];
        const formattedRelatedProducts = {
          product1: relatedProductsArray[0]
            ? {
              value: relatedProductsArray[0]?.id,
              label: relatedProductsArray[0]?.name_en,
            }
            : null,
          product2: relatedProductsArray[1]
            ? {
              value: relatedProductsArray[1]?.id,
              label: relatedProductsArray[1]?.name_en,
            }
            : null,
          product3: relatedProductsArray[2]
            ? {
              value: relatedProductsArray[2]?.id,
              label: relatedProductsArray[2]?.name_en,
            }
            : null,
          product4: relatedProductsArray[3]
            ? {
              value: relatedProductsArray[3]?.id,
              label: relatedProductsArray[3]?.name_en,
            }
            : null,
        };

        setRelatedProducts(formattedRelatedProducts);
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsList();
        const data = response.data; // The new API returns data in response.data
        const options = data.map((product) => ({
          label: product.name_nl,
          value: product.id,
        }));
        setRelatedProductsOptions(options);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getChoicesByName = (name) => {
    const category = categories?.find(
      (cat) => cat.name?.toLowerCase() === name.toLowerCase()
    );
    return category ? category.choices : [];
  };

  const mapProductCategories = () => {
    const result = {};

    categories?.forEach((category) => {
      const categoryName = category.name;
      const productCategoryIds = Array.isArray(product[categoryName])
        ? product[categoryName]
        : [];

      const matchingChoices = category?.choices?.filter((choice) =>
        productCategoryIds.includes(choice.id)
      );

      result[categoryName] = matchingChoices;
    });
  };

  const handleAddRow = () => {
    setLengths([...lengths, { ...productItem }]);
  };

  const handleRemoveRow = (index) => {
    if (lengths.length === 1) {
      setLengths([{ ...productItem }]);
    } else {
      setLengths(lengths.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const updatedProducts = [...lengths];
    // Convert to number for numeric fields
    if (["length", "full_price_ex_vat", "discount", "stock"].includes(field)) {
      updatedProducts[index][field] = value === "" ? "" : Number(value);
    } else {
      updatedProducts[index][field] = value;
    }
    setLengths(updatedProducts);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const data = response.results;
        const options = data.map((product) => ({
          label: product.name_en,
          value: product.id,
        }));
        setRelatedProductsOptions(options);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex gap-2 items-center">
        <div
          onClick={() => {
            navigate("/products");
          }}
          className="cursor-pointer"
        >
          <img src={ArrowBack} alt="" />
        </div>
        <h5 className="xl:text-32 lg:text-28 text-26 font-bold">Products</h5>
      </div>
      {loading ? (
        <div className="flex justify-center mx-auto pt-14 w-full">
          Fetching Product details...
        </div>
      ) : (
        <Formik
          initialValues={{
            ...mapProductCategories(),
            name_en: product?.name_en ?? "",
            name_nl: product?.name_nl ?? "",
            description_en: product?.description_en ?? "",
            description_nl: product?.description_nl ?? "",
            thickness: product?.thickness ?? "",
            width: product?.width ?? "",
            weight_per_m3: product?.weight_per_m3 ?? "",
            group: product?.group ?? [],
            product_type: product?.product_type ?? [],
            material: product?.material ?? [],
            profile: product?.profile ?? [],
            durability_class: product?.durability_class ?? [],
            quality: product?.quality ?? [],
            application: product?.application ?? [],
            place_on_goedgeplaatst: product?.is_active_on_goedgeplaatst ?? false,
          }}
          validationSchema={Yup.object({
            name_en: Yup.string().required("Name is required"),
            name_nl: Yup.string().required("Naam is required"),
            thickness: Yup.number().required("Thickness is required"),
            width: Yup.number().required("Width is required"),
            weight_per_m3: Yup.number().required("Weight is required"),
            description_en: Yup.string().required(
              "Product Description is required"
            ),
            description_nl: Yup.string().required(
              "Product omschrijving is required"
            ),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            if (!images?.length) {
              setIsErrors((prev) => ({ ...prev, images: true }));
              return;
            }
            try {
              console.log(
                "Submitting lengths:",
                id,
                values,
                lengths,
                images,
                relatedProducts
              );
              await updateProduct(id, values, lengths, images, relatedProducts);
              navigate("/products");
            } catch (error) {
              console.error("Error submitting form:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="mx-auto max-w-[840px]">
              <div className="flex mb-4">
                <h5 className="xl:text-26 lg:text-24 text-22 font-semibold">
                  Update Product
                </h5>
              </div>
              <div className="formSec">
                <div className="flex gap-[20px] mb-[24px]">
                  <div className="w-1/2">
                    <div className="w-full md:mb-0 relative">
                      <Field
                        type="text"
                        name="name_nl"
                        id="name_nl"
                        as="sele"
                        placeholder="Naam"
                        label="Naam"
                        component={FormikField}
                        flag={countryflag}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="w-full md:mb-0 relative">
                      <Field
                        type="text"
                        name="name_en"
                        id="name_en"
                        as="sele"
                        placeholder="Name"
                        label="Name"
                        component={FormikField}
                        flag={countryflag2}
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
                      selectedValues={values?.group}
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
                      name="product_type"
                      id="product_type"
                      options={getChoicesByName("type")}
                      displayValue="name_en"
                      selectedValues={values?.product_type}
                      onSelect={(selectedList) => {
                        setFieldValue("product_type", selectedList);
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
                      selectedValues={values?.material}
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
                      selectedValues={values?.profile}
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
                      options={getChoicesByName("durability")}
                      displayValue="name_en"
                      selectedValues={values?.durability_class}
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
                      selectedValues={values?.quality}
                      onSelect={(selectedList) => {
                        setFieldValue("quality", selectedList);
                      }}
                      closeIconStyle={{ color: "red" }}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm">Toepassing | Application</label>
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
                  <div className="w-1/2 relative">
                    <Field
                      type="text"
                      name="description_nl"
                      id="description_nl"
                      as="sele"
                      placeholder="Omschrijving"
                      label="Product omschrijving"
                      component={Textarea}
                      fixedHeight={true}
                    />
                    <img
                      src={countryflag}
                      alt="Flag"
                      className="cursor-pointer h-5 w-5 absolute right-4 top-10"
                    />
                  </div>
                  <div className="w-1/2 relative">
                    <Field
                      type="text"
                      name="description_en"
                      id="description_en"
                      as="sele"
                      placeholder="Description"
                      label="Product Description"
                      component={Textarea}
                      fixedHeight={true}
                    />
                    <img
                      src={countryflag2}
                      alt="Flag"
                      className="cursor-pointer h-5 w-5 absolute right-4 top-10"
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
                      name="weight_per_m3"
                      id="weight_per_m3"
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
                        {lengths?.map((product, index) => (
                          <tr key={index}>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
                              <input
                                type="number"
                                min={0}
                                value={product.length}
                                required
                                placeholder="300 cm"
                                onChange={(e) =>
                                  handleChange(index, "length", e.target.value)
                                }
                                className="w-full outline-none bg-transparent"
                              />
                            </td>
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
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
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
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
                            <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
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
                  <Field
                    type="checkbox"
                    name="place_on_goedgeplaatst"
                    className="h-8 w-8 cursor-pointer"
                    checked={values.place_on_goedgeplaatst}
                    onChange={() => {
                      setFieldValue(
                        "place_on_goedgeplaatst",
                        !values.place_on_goedgeplaatst
                      );
                    }}
                  />
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
                            className="absolute top-2 right-2"
                          >
                            <XCircleIcon className="h-6 w-6 text-[#FBC700]" />
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

                <div className="flex flex-col gap-[20px] mb-[60px]">
                  <h2 className="text-sm">Related Products</h2>
                  <div className="w-full md:mb-0">
                    <label className="text-sm">Product 1</label>
                    <Select
                      classNamePrefix="select"
                      isClearable
                      isSearchable
                      name="product1"
                      placeholder="Product 1"
                      options={relatedProductsOptions}
                      value={relatedProducts.product1}
                      onChange={(value) => {
                        setRelatedProducts((prev) => ({
                          ...prev,
                          product1: value,
                        }));
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm">Product 2</label>
                    <Select
                      classNamePrefix="select"
                      isClearable
                      isSearchable
                      name="product2"
                      placeholder="Product 2"
                      options={relatedProductsOptions}
                      value={relatedProducts.product2}
                      onChange={(value) => {
                        setRelatedProducts((prev) => ({
                          ...prev,
                          product2: value,
                        }));
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm">Product 3</label>
                    <Select
                      classNamePrefix="select"
                      isClearable
                      isSearchable
                      name="product3"
                      placeholder="Product 3"
                      options={relatedProductsOptions}
                      value={relatedProducts.product3}
                      onChange={(value) => {
                        setRelatedProducts((prev) => ({
                          ...prev,
                          product3: value,
                        }));
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm">Product 4</label>
                    <Select
                      classNamePrefix="select"
                      isClearable
                      isSearchable
                      name="product4"
                      placeholder="Product 4"
                      options={relatedProductsOptions}
                      value={relatedProducts.product4}
                      onChange={(value) => {
                        setRelatedProducts((prev) => ({
                          ...prev,
                          product4: value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    btnText="Update Product"
                    paddingX="20px"
                    breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
