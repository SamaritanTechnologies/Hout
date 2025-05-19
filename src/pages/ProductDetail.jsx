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
import PageLoader from "../components/Common/PageLoader";
import ProductsList from "../components/ShopComponents/ProductsList";
import ProductsSection from "../components/LandingPageSections/ProductsSection";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  EmailShareButton,
} from "react-share";
import Switch from "../components/Common/Switch";
import { useTranslation } from "react-i18next";

export const ProductDetail = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [vat, setVat] = useState(false);
  const shareUrl = window.location.href;
  const { product_id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductsById(product_id);
        setProductDetail(data);
        console.log("detail page", data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [product_id]);
  console.log("product detail", productDetail);

  return (
    <>
      <section className="px-[30px] md:px-[80px] lg:px-[100px] bg-[#F4F5F7]">
        <div className="flex justify-between items-center">
          <tr className="xs:gap-x-3 gap-x-6 flex  items-center  py-[40px]">
            <td
              className="text-[#9F9F9F] xs:text-14 sm:text-15 text-16 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </td>
            <td>
              <img src={rightArrow} alt="Right Arrow" />
            </td>
            <td
              className="text-[#9F9F9F] xs:text-14 sm:text-15 text-16 cursor-pointer"
              onClick={() => navigate("/shop-page")}
            >
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
          <div className=" flex justify-center  gap-5 pt-5">
            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("p_showPrices")}
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("p_exclVAT")}
            </div>
            <div className="recPasswrd">
              <Switch
                optional
                checked={vat ? "checked" : ""}
                onChange={() => setVat(!vat)}
              />
            </div>
            <div className="pops md:text-14 sm:text-14 xs:text-12">
              {t("p_inclVAT")}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <PageLoader />
      ) : (
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
                              selected
                                ? "ring-customYellow"
                                : "ring-transparent"
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
              <div className="pt-6 text-44">
                €
                {vat
                  ? productDetail?.lengths[0].discounted_price_in_vat
                  : productDetail?.lengths[0].discounted_price_ex_vat}
              </div>

              <div className="flex items-center gap-x-4 pt-5 border-b-2 border-[#D9D9D9] pb-[26px]">
                <div className="text-14">{t("p_shareThisPage")}</div>
                <div>
                  <WhatsappShareButton
                    url={shareUrl}
                    quote={productDetail?.name_en}
                  >
                    <img src={whatspp} alt="WhatsApp" />
                  </WhatsappShareButton>
                </div>
                <div>
                  <FacebookShareButton url={shareUrl}>
                    <img src={facebook} alt="Facebook" />
                  </FacebookShareButton>
                </div>
                <div>
                  <TwitterShareButton url={shareUrl}>
                    <img src={twitter} alt="Twitter" />
                  </TwitterShareButton>
                </div>
                <div>
                  <LinkedinShareButton url={shareUrl}>
                    <img src={linkdln} alt="LinkedIn" />
                  </LinkedinShareButton>
                </div>
                <div>
                  <PinterestShareButton url={shareUrl}>
                    <img src={pintrest} alt="Pinterest" />
                  </PinterestShareButton>
                </div>
              </div>
            </div>

            <section className="xl:pt-[60px] lg:pt-[50px] md:pt-[40px] pt-[30px]">
              <span className="xl:text-24 lg:text-22 md:text-20 sm:text-18 text-[17px] font-bold border-b-3 border-customYellow">
                {t("p_description")}
              </span>
              <div className="pt-5 text-18 text-start xs:text-15 sm:text-15">
                {currentLang == "en"
                  ? productDetail?.description_en
                  : productDetail?.description_nl}
              </div>
            </section>
          </section>

          {/* Right side Content */}
          <section>
            <h1 className="xl:text-38 lg:text-36 md:text-32 text-28 font-bold">
              {currentLang == "en"
                ? productDetail?.name_en
                : productDetail?.name_nl}
            </h1>
            <div className="text-xl text-[#111727]">
              €
              {vat
                ? productDetail?.lengths[0].discounted_price_in_vat
                : productDetail?.lengths[0].discounted_price_ex_vat}
            </div>

            <div className="flex items-center gap-x-4 pt-5 border-b-2 border-[#D9D9D9] pb-[26px]">
              <div className="text-14">{t("p_shareThisPage")}</div>
              <div>
                <WhatsappShareButton
                  url={shareUrl}
                  quote={productDetail?.name_en}
                >
                  <img src={whatspp} alt="WhatsApp" />
                </WhatsappShareButton>
              </div>
              <div>
                <FacebookShareButton url={shareUrl}>
                  <img src={facebook} alt="Facebook" />
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton url={shareUrl}>
                  <img src={twitter} alt="Twitter" />
                </TwitterShareButton>
              </div>
              <div>
                <LinkedinShareButton url={shareUrl}>
                  <img src={linkdln} alt="LinkedIn" />
                </LinkedinShareButton>
              </div>
              <div>
                <PinterestShareButton url={shareUrl}>
                  <img src={pintrest} alt="Pinterest" />
                </PinterestShareButton>
              </div>
            </div>

            {/* Product specifications section */}
            <section className="flex flex-col gap-6 bg-[#F8F8F8] px-6 py-4 xl:mt-[35px] lg:mt-[30px] md:mt-[25px] mt-[20px] ml-2">
              <div className="text-lg font-bold">
                {t("p_productSpecifications")}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">{t("p_group")}</div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.group
                      .map((g) =>
                        currentLang === "en" ? g.name_en : g.name_nl
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">Type</div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.product_type
                      .map((t) =>
                        currentLang === "en" ? t.name_en : t.name_nl
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">
                    {t("p_material")}
                  </div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.material
                      .map((m) =>
                        currentLang === "en" ? m.name_en : m.name_nl
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">
                    {t("p_profile")}
                  </div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.profile
                      .map((p) =>
                        currentLang === "en" ? p.name_en : p.name_nl
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">
                    {t("p_durabilityClass")}
                  </div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.durability_class
                      .map((d) =>
                        currentLang === "en" ? d.name_en : d.name_nl
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">
                    {t("p_quality")}
                  </div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.quality
                      .map((q) =>
                        currentLang === "en" ? q.name_en : q.name_nl
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">
                    {t("p_application")}
                  </div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.application
                      .map((a) =>
                        currentLang === "en" ? a.name_en : a.name_nl
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">{t("p_width")}</div>

                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.width} cm
                  </div>
                </div>
                <div className="flex items-center border-b border-[#E6E6E6] min-h-10">
                  <div className="text-16 font-bold flex-1">
                    {t("p_thickness")}
                  </div>
                  <div className="text-[#333333] flex-1 xl:text-16 lg:text-15 text-14">
                    {productDetail?.thickness} cm
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      )}

      <ProductVaritants
        variants={productDetail?.lengths}
        image={productDetail?.images}
        product={product_id}
        vat={vat}
      />

      {/* <RelatedProduct relatedProducts={productDetail?.related_products} /> */}

      <div className="mb-8">
        <ProductsSection />
      </div>
    </>
  );
};
