import React from "react";
import image1 from "../../assets/LandingPageImages/products/image1.svg";
import image2 from "../../assets/LandingPageImages/products/image2.svg";
import image3 from "../../assets/LandingPageImages/products/image3.svg";
import image4 from "../../assets/LandingPageImages/products/image4.svg";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import addToCart from "../../assets/LandingPageImages/products/addToCart.svg";
import Button from "../Common/Button";
const RelatedProduct = () => {
  const Relatedproductdata = [
    {
      image: image1,
      heading: "Syltherine",
      subheading: "With Oak Wood",
      amount: "€2.500.000",
      subamount: "€3.500.000",
      cartImage: addToCart,
    },
    {
      image: image2,
      heading: "Syltherine",
      subheading: "With Oak Wood",
      amount: "€2.500.000",
      subamount: "€3.500.000",
      cartImage: addToCart,
      heartImage: productHeart,
    },

    {
      image: image3,
      heading: "Syltherine",
      subheading: "With Oak Wood",
      amount: "€2.500.000",
      subamount: "€3.500.000",
      cartImage: addToCart,
      heartImage: productHeart,
    },

    {
      image: image3,
      heading: "Syltherine",
      subheading: "With Oak Wood",
      amount: "€2.500.000",
      subamount: "€3.500.000",
      cartImage: addToCart,
      heartImage: productHeart,
    },
  ];
  return (
    <>
      <section className="px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px] pt-[55px]">
        <h1 className="text-36 font-medium text-center ">Related Products </h1>
        <section className="pt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1240px] mx-auto">
          {Relatedproductdata.map((item, index) => {
            return (
              // JSX code here
              <div key={index} className="">
                <div className="cursor-pointer">
                  <img
                    src={item.image}
                    className="w-full object-cover h-full sm:h-[310px] lg:h-[310px] xl:h-[310px]"
                  />
                </div>
                <section className="bg-[#F4F5F7] pb-4 px-4">
                  <div className="font-semibold  text-24 pt-[15px]">
                    {item.heading}
                  </div>
                  <div className=" font-medium  text-16  text-gray2 pt-[15px]">
                    {item.subheading}
                  </div>
                  <section className="flex gap-x-3 pt-[15px] pb-[20px]">
                    <div>{item.amount}</div>
                    <div className="text-gray2">{item.subamount}</div>
                  </section>
                  <section className="flex gap-x-4 items-center">
                    <div className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3  gap-x-3  add-cart-btn">
                      {/* <img src={item.addToCart} /> */}
                      <img src={addToCart} />
                      Add to Cart{" "}
                    </div>
                    <div>
                      <img src={item.heartImage} />{" "}
                    </div>
                  </section>
                </section>
              </div>
            );
          })}
        </section>
        <div className="pt-[50px] flex justify-center mb-24">
          {" "}
          {/* <Button btnText="Show More" px="100px" py="16px" textColor border /> */}
          <div className="  border-2 border-customYellow">
            {" "}
            <button className="text-customYellow px-10 py-3 font-semibold text-18">
              {" "}
              Show more{" "}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedProduct;
