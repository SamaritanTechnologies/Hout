import React, { useState } from "react";
import ProductDetailTable from "../components/CustomWood/ProductDetailTable";
import RelatedProduct from "../components/CustomWood/RelatedProduct";
import rightArrow from "../assets/customWoodPage/rightArrow.svg";
import wood1 from "../assets/customWoodPage/wood1.svg";
import wood2 from "../assets/customWoodPage/wood2.svg";
import wood3 from "../assets/customWoodPage/wood3.svg";
import wood4 from "../assets/customWoodPage/wood4.svg";
import bigOak from "../assets/customWoodPage/bigOak.svg";
import starGroup from "../assets/customWoodPage/starGroup.svg";
import line from "../assets/customWoodPage/line.svg";
import whatspp from "../assets/customWoodPage/whatspp.svg";
import facebook from "../assets/customWoodPage/facebook.svg";
import pintrest from "../assets/customWoodPage/pintrest.svg";
import twitter from "../assets/customWoodPage/twitter.svg";
import linkdln from "../assets/customWoodPage/linkdln.svg";
import email from "../assets/customWoodPage/email.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const CustomWoodPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  console.log(location, "location")

  const [state, setState] = useState({
    product: location.state?.data
  })

  const [productInfo, setProductInfo] = useState([
    {
      itemName: "Hout Type",
      type: "Hardhout",
    },
    {
      itemName: "Timber",
      type: "Angelim red",
    },
    {
      itemName: "Enduring",
      type: "Untreated",
    },
    {
      itemName: "Form",
      type: "Square",
    },
    {
      itemName: "Woodworking",
      type: "Created",
    },
    {
      itemName: "Pointed",
      type: "No",
    },
    {
      itemName: "Extra Treament",
      type: "N.v.t",
    },
    {
      itemName: "Package",
      type: "Per stuk of per vol package",
    },
    {
      itemName: "Freight",
      type: "Major Transport",
    },
  ]);

  return (
    <>
      <section className="px-[30px] md:px-[80px] lg:px-[100px] bg-[#F4F5F7]">
        <tr className="xs:gap-x-3 gap-x-6 flex  items-center  py-[40px]">
          <td className="text-[#9F9F9F] xs:text-14 sm:text-15 text-16 cursor-pointer" onClick={() => navigate('/')}>
            Home{" "}
          </td>
          <td>
            <img src={rightArrow} />
          </td>
          <td className="text-[#9F9F9F] xs:text-14 sm:text-15 text-16 cursor-pointer" onClick={() => navigate('/shop-page')}>
            {" "}
            Shop
          </td>
          <td>
            <img src={rightArrow} />
          </td>
          <td className="h-[px] font-bold text-[#9F9F9F] xs:text-14 sm:text-15 text-16">
            |{" "}
          </td>
          <td>{state.product.name_en}</td>
        </tr>
      </section>

      <section className="px-[30px] max-w-[1240px] mx-auto grid pt-[55px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <section className="">
          <section className="flex  gap-x-7">
            <div className="flex-col">
              <div className="">
                <img src={wood1} />
              </div>
              <div className="pt-[32px]">
                <img src={wood2} />
              </div>
              <div className="pt-[32px]">
                <img src={wood3} />
              </div>
              <div className="pt-[32px]">
                <img src={wood4} />
              </div>
            </div>

            <div className="flex-grow">
              {" "}
              <img src={bigOak} className="w-full" />{" "}
            </div>
          </section>

          <div className=" xl:hidden lg:hidden md:hidden mt-20">
            <h1 className="text-20 font-bold">
              {state.product.name_en}
            </h1>
            <div className="flex gap-x-6 pt-6">
              <div>
                <img src={starGroup} />
              </div>
              <div>
                {" "}
                <img src={line} />
              </div>
              <div className="text-18"> 5 Customer Review</div>
            </div>

            <div className="pt-6 text-44">€ 2,50</div>

            <div className="flex items-center gap-x-4 pt-5 border-b-2 border-[#D9D9D9] pb-[26px]    ">
              <div className="text-14">SHARE THIS PAGE:</div>
              <div>
                <img src={whatspp} />
              </div>
              <div>
                <img src={facebook} />
              </div>
              <div>
                <img src={twitter} />
              </div>
              <div>
                <img src={linkdln} />
              </div>
              <div>
                <img src={pintrest} />
              </div>

              <div>
                <img src={email} />
              </div>
            </div>
          </div>

          <section className=" xl:pt-[60px] lg:pt-[50px] md:pt-[40px] pt-[30px]">
            <span className="xl:text-24 lg:text-22 md:text-20 sm:text-18 text-[17px] font-bold border-b-3 border-customYellow">

              Description
            </span>
            <div className="pt-5 text-18 text-start xs:text-15 sm:text-15">
              {" "}
              {state.product.description_en}
            </div>
          </section>
        </section>

        {/* Right side Content  */}
        <section>
          <h1 className="xl:text-38 lg:text-36 md:text-32 text-28 font-bold">
          {state.product.name_en}
          </h1>
          <div className="flex items-center gap-x-6 xl:pt-6 lg:pt-5 pt-4">
            <div>
              <img src={starGroup} />
            </div>
            <div>
              {" "}
              <img src={line} />
            </div>
            <div className="xl:text-18 lg:text-16 md:text-14 text-[13px]
"> 5 Customer Review</div>
          </div>

          <div className="pt-6 xl:text-44 lg:text-40 md:text-36 sm:text-32 text-28">{state.product.full_price_ex_vat}</div>

          <div className="flex items-center gap-x-4 pt-5 border-b-2 border-[#D9D9D9] pb-[26px]    ">
            <div className="text-14">SHARE THIS PAGE:</div>
            <div>
              <img src={whatspp} />
            </div>
            <div>
              <img src={facebook} />
            </div>
            <div>
              <img src={twitter} />
            </div>
            <div>
              <img src={linkdln} />
            </div>
            <div>
              <img src={pintrest} />
            </div>

           
          </div>
          {/* product specfication  section  */}
          <section className=" bg-[#F8F8F8] xl:px-[25px] lg:px-[20px] md:px-[16px] sm:px-[10px] xl:mt-[35px] lg:mt-[30px] md:mt-[25px] mt-[20px] ml-2">
            <div className="xl:text-18 lg:text-16 md:text-14 text-[13px] font-bold pt-[15px]">
              Product specifications
            </div>

            {productInfo.map((item) => {
              return (
                <div className="flex items-center pt-5 border-b pb-2">

                  <div className="text-16 font-bold w-[60%]">
                    {item.itemName}
                  </div>
                  <div className=" text-[#333333] w-[60%] text-16">

                    
                    <div className=" text-[#333333] w-[60%] xl:text-16 lg:text-15 text-14">

                      {" "}
                      {item.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </section>
      <div>
        {" "}
        <ProductDetailTable />
      </div>

      <div>
        <RelatedProduct />
      </div>
    </>
  );
};