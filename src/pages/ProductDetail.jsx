import React, { useEffect, useState } from "react";
import ProductVaritants from "../components/CustomWood/ProductVaritants";
import RelatedProduct from "../components/CustomWood/RelatedProduct";
import rightArrow from "../assets/customWoodPage/rightArrow.svg";
import { Tab } from "@headlessui/react";
import whatspp from "../assets/customWoodPage/whatspp.svg";
import facebook from "../assets/customWoodPage/facebook.svg";
import pintrest from "../assets/customWoodPage/pintrest.svg";
import twitter from "../assets/customWoodPage/twitter.svg";
import linkdln from "../assets/customWoodPage/linkdln.svg";
import email from "../assets/customWoodPage/email.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductsById } from "../redux/actions/userActions";
import { toast } from "react-toastify";

export const ProductDetail = () => {
  const { product_id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductsById(product_id);
        setProductDetail(data);
        toast.success("Product details fetched successfully!");
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [product_id]);

  return (
    <>
      <section className="px-[30px] md:px-[80px] lg:px-[100px] bg-[#F4F5F7]">
        <tr className="xs:gap-x-3 gap-x-6 flex  items-center  py-[40px]">
          <td
            className="text-[#9F9F9F] xs:text-14 sm:text-15 text-16 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home{" "}
          </td>
          <td>
            <img src={rightArrow} alt="Right Arrow" />
          </td>
          <td
            className="text-[#9F9F9F] xs:text-14 sm:text-15 text-16 cursor-pointer"
            onClick={() => navigate("/shop-page")}
          >
            {" "}
            Shop
          </td>
          <td>
            <img src={rightArrow} alt="Right Arrow" />
          </td>
          <td className="h-[px] font-bold text-[#9F9F9F] xs:text-14 sm:text-15 text-16">
            |{" "}
          </td>
          <td>{productDetail?.name_en}</td>
        </tr>
      </section>

      <section className="px-[30px] max-w-[1058px] mx-auto grid pt-[55px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
        <section>
          <Tab.Group as="div" className="flex gap-8">
            {/* Thumbnails (Left Side) */}
            <div className="flex flex-col">
              <Tab.List className="flex flex-col gap-8">
                {productDetail?.images?.map((image, index) => (
                  <Tab
                    key={index}
                    className="relative flex h-20 w-[76px] cursor-pointer"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={image.image || chairIcon}
                            alt={image.name || "Product Image"}
                            className="h-full w-full object-cover rounded-md"
                          />
                        </span>
                        <span
                          className={`absolute inset-0 rounded-md ring-2 ${
                            selected ? "ring-customYellow" : "ring-transparent"
                          }`}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            {/* Main Image (Right Side) */}
            <Tab.Panels className="w-full flex justify-center items-center">
              {productDetail?.images?.map((image, index) => (
                <Tab.Panel
                  key={index}
                  className="w-full h-full flex justify-center items-center"
                >
                  <img
                    src={image.image || chairIcon}
                    alt={image.alt || "Product Image"}
                    className="w-full object-cover rounded-lg max-h-[500px] h-full"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <div className="xl:hidden lg:hidden md:hidden mt-20">
            <h1 className="text-20 font-bold">{productDetail?.name_en}</h1>
            <div className="pt-6 text-44">€ {productDetail?.price}</div>

            <div className="flex items-center gap-x-4 pt-5 border-b-2 border-[#D9D9D9] pb-[26px]">
              <div className="text-14">SHARE THIS PAGE:</div>
              <div>
                <img src={whatspp} alt="WhatsApp" />
              </div>
              <div>
                <img src={facebook} alt="Facebook" />
              </div>
              <div>
                <img src={twitter} alt="Twitter" />
              </div>
              <div>
                <img src={linkdln} alt="LinkedIn" />
              </div>
              <div>
                <img src={pintrest} alt="Pinterest" />
              </div>
              <div>
                <img src={email} alt="Email" />
              </div>
            </div>
          </div>

          <section className="xl:pt-[60px] lg:pt-[50px] md:pt-[40px] pt-[30px]">
            <span className="xl:text-24 lg:text-22 md:text-20 sm:text-18 text-[17px] font-bold border-b-3 border-customYellow">
              Description
            </span>
            <div className="pt-5 text-18 text-start xs:text-15 sm:text-15">
              {productDetail?.description_en}
            </div>
          </section>
        </section>

        {/* Right side Content */}
        <section>
          <h1 className="xl:text-38 lg:text-36 md:text-32 text-28 font-bold">
            {productDetail?.name_en}
          </h1>
          <div className="text-xl text-[#111727]">€ {productDetail?.price}</div>

          <div className="flex items-center gap-x-4 pt-5 border-b-2 border-[#D9D9D9] pb-[26px]">
            <div className="text-14">SHARE THIS PAGE:</div>
            <div>
              <img src={whatspp} alt="WhatsApp" />
            </div>
            <div>
              <img src={facebook} alt="Facebook" />
            </div>
            <div>
              <img src={twitter} alt="Twitter" />
            </div>
            <div>
              <img src={linkdln} alt="LinkedIn" />
            </div>
            <div>
              <img src={pintrest} alt="Pinterest" />
            </div>
          </div>

          {/* Product specifications section */}
          <section className="flex flex-col gap-6 bg-[#F8F8F8] px-6 py-4 xl:mt-[35px] lg:mt-[30px] md:mt-[25px] mt-[20px] ml-2">
            <div className="text-lg font-bold">Product specifications</div>
            <div className="flex flex-col">
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Group</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.group.map((g) => g.name_en).join(", ")}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Type</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.product_type.map((t) => t.name_en).join(", ")}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Material</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.material.map((m) => m.name_en).join(", ")}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Profile</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.profile.map((p) => p.name_en).join(", ")}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Durability Class</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.durability_class
                    .map((d) => d.name_en)
                    .join(", ")}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Quality</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.quality.map((q) => q.name_en).join(", ")}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Application</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.application.map((a) => a.name_en).join(", ")}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10 mt-20">
                <div className="text-16 font-bold flex-1">Width</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.width}
                </div>
              </div>
              <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                <div className="text-16 font-bold flex-1">Thickness</div>
                <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                  {productDetail?.thickness}
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>

      <div>
        <ProductVaritants variants={productDetail?.lengths}/>
      </div>

      <div>
        <RelatedProduct relatedProducts={productDetail?.related_products}/>
      </div>
    </>
  );
};
