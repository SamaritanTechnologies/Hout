import React, { useEffect, useState } from "react";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import addToCartt from "../../assets/LandingPageImages/products/addToCart.svg";
import Button from "../Common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosApi, axiosWithCredentials } from "../../providers";
import { addToCart } from "../../redux/actions/orderActions";
import { scrollToTop } from "../../utils/helper";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const ProductsSection = ({
  isthree,
  notRequired,
  isbuttonReqird,
  passTypes,
  selectedFilter,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState({
    products: [],
    types: [],
  });

  useEffect(() => {
    handleGetProducts();
  }, [selectedFilter]);

  const handleGetProducts = async () => {
    try {
      const response = await axiosWithCredentials.get("/products/");
      if (selectedFilter === "" && location.pathname !== "/") {
        setState((prev) => ({
          ...prev,
          products: response.data,
          types: passTypes(
            response.data.map((product) => ({
              filter: product.hout_type,
              checked: false,
            }))
          ),
        }));
      } else if (selectedFilter !== "" && location.pathname !== "/") {
        let filteredProducts = response.data.filter(
          (item) => item.hout_type === "abvc"
        );
        setState((prev) => ({
          ...prev,
          products: filteredProducts,
          types: passTypes(
            response.data.map((product) => ({
              filter: product.hout_type,
              checked: false,
            }))
          ),
        }));
      } else {
        setState((prev) => ({
          ...prev,
          products: response.data,
        }));
      }
    } catch (error) { }
  };

  const handleAddToCart = async (id, price) => {
    if (id) {
      const res = await addToCart({ id, price });
    }
  };

  const handleAddToWishlist = async (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData, "lklklk");
    if (id) {
      const payload = {
        product_id: id,
        user: userData?.user_id,
      };
      try {
        await axiosWithCredentials.post(`/wishlist/`, payload);

        toast.success("Successfully added to wishlist");
      } catch (error) {
        console.log(error, "lklkl");
      }
    }
  };

  return (
    <>
      <section
        className={
          notRequired
            ? ""
            : "pt-[30px] md:pt-[70px] lg:pt-[100px] xl:pt-[100px] px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px]"
        }
        id="products-section"
      >
        {notRequired ? null : (
          <div className="text-30 md:text-40 lg:text-50 xl:text-60 font-bold text-center pb-[30px] md:pb-[40px] lg:pb-[60px] xl:pb-[60px]">
            {" "}
            Products
          </div>
        )}

        <div
          className={
            isthree
              ? "grid grid-cols-3 sm:grid-cols-2  xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-[30px]  gap-x-8 "
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1240px] mx-auto"
          }
        >
          {state?.products?.slice(0, 4)?.map((item, index) => {
            console.log(item, "items")
            return (
              // JSX code here
              <div key={index} className="">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigate('/wood-page', { state: { data: item } });

                  }}
                >
                  <img
                    src={item?.images_url[0]?.url}
                    className="w-full object-cover h-full sm:h-[310px] lg:h-[310px] xl:h-[310px]"
                  />
                </div>
                <section className="bg-[#F4F5F7] pb-4 px-4">
                  <div className="font-semibold  text-24 pt-[15px]">
                    {item?.name_en}
                  </div>
                  <div className=" font-medium  text-16  text-gray2 pt-[15px]">
                    {item?.type?.map((item_type, index) => {
                      return (
                        <>{ item_type } </>
                      )
                    })}
                  </div>

                  <section className="flex gap-x-3 pt-[15px] pb-[20px] md:gap-x-2">
                    <div>€{item.full_price_ex_vat}</div>
                    <div className="text-gray2 line-through">{item.vat}</div>
                  </section>
                  <section className="flex gap-x-4 items-center justify-between">
                    <div
                      className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3  gap-x-3  add-cart-btn md:text-[12px] lg:text-[12px]"
                      onClick={() => {
                        handleAddToCart(item?.id, item?.price);
                        // navigate("/cart");
                      }}
                    >
                      {/* <img src={item.addToCart} className="bg-red" /> */}
                      <img src={addToCartt} />
                      Add to Cart{" "}
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleAddToWishlist(item.id);
                      }}
                    >
                      <img src={productHeart} />{" "}
                    </div>
                  </section>
                </section>
              </div>
            );
          })}
        </div>
        {isbuttonReqird ? null : (
          <div className="flex  justify-center pt-[30px] md:pt-[40px] lg:pt-[70px] xl:pt-[70px] view-assortment-btn">
            {" "}
            <Button
              btnText="VIEW SHOP"
              paddingX="72px"
              fontbold
              paddingY="22px"
              onClick={() => {
                navigate("/shop-page");
                scrollToTop();
              }}
            />{" "}
          </div>
        )}
      </section>
    </>
  );
};

export default ProductsSection;
