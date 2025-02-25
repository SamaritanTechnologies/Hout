import React, { useEffect, useState } from "react";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import addToCartt from "../../assets/LandingPageImages/products/addToCart.svg";
import Button from "../Common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosApi, axiosWithCredentials } from "../../providers";
import { addToCart } from "../../redux/actions/orderActions";
import { getFeaturedProducts } from "../../redux/actions/userActions";
import { scrollToTop } from "../../utils/helper";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const ProductsSection = () => {
  const navigate = useNavigate();
  const [featureProducts, setFeatureProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const data = await getFeaturedProducts();
      setFeatureProducts(data.products);
    };
    fetchFeaturedProducts();
  }, []);

  const getMinimumPriceObject = (lengths) => {
    if (!lengths || lengths.length === 0) return "N/A";

    return lengths.reduce((minObj, currentObj) => {
      const currentPrice = parseFloat(currentObj.full_price_ex_vat);
      const minPrice = parseFloat(minObj.full_price_ex_vat);
      return currentPrice < minPrice ? currentObj : minObj;
    });
  };

  return (
    <>
      <section className="pt-[30px] md:pt-[70px] lg:pt-[100px] xl:pt-[100px] px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px]">
        <div className="text-30 md:text-40 lg:text-50 xl:text-60 font-bold text-center pb-[30px] md:pb-[40px] lg:pb-[60px] xl:pb-[60px]">
          Products
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1240px] mx-auto">
          {featureProducts.map((product) => {
            const minimumPrice = getMinimumPriceObject(product.lengths);
            return (
              <div className="relative" key={product.id}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E97171] text-white absolute top-6 right-6 text-xs">
                  -{minimumPrice.discount}%
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/porduct-detail/${product.id}`)
                  }
                >
                  <img
                    src={product.images[0].image}
                    className="w-full object-cover h-full sm:h-[310px] lg:h-[310px] xl:h-[310px]"
                  />
                </div>
                <section className="bg-[#F4F5F7] pb-4 px-4">
                  <div className="font-semibold  text-24 pt-[15px]">
                    {product.name_en}
                  </div>
                  <div className=" font-medium  text-16  text-gray2 pt-[15px]">
                    {product.description_en}
                  </div>

                  <section className="flex gap-x-3 pt-[15px] pb-[20px] md:gap-x-2">
                    <div>$ {minimumPrice.discounted_price}</div>
                    <div className="text-gray2 line-through">
                      $ {minimumPrice.full_price_ex_vat}
                    </div>
                  </section>
                  <section className="flex gap-x-4 items-center justify-between">
                    <div className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3  gap-x-3  add-cart-btn md:text-[12px] lg:text-[12px]">
                      {/* <img src={item.addToCart} className="bg-red" /> */}
                      <img src={addToCartt} />
                      Add to Cart
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleAddToWishlist(item.product_id);
                      }}
                    >
                      <img src={productHeart} />
                    </div>
                  </section>
                </section>
              </div>
            );
          })}
        </div>
        <div className="flex  justify-center pt-[30px] md:pt-[40px] lg:pt-[70px] xl:pt-[70px] view-assortment-btn">
          <Button
            btnText="VIEW SHOP"
            paddingX="72px"
            fontbold
            paddingY="22px"
          />
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
