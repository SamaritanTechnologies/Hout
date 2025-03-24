import React from "react";
import InputField from "../components/Common/InputField";
// import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import PlusCircle from "../assets/DashboardImages/plusCricle.svg";
import Textarea from "../components/Common/Textarea";
import Button from "../components/Common/Button";
import Dropzone from "../components/Common/Dropzone";
import addImg from "../assets/DashboardImages/add.svg";
import WoodTOne from "../assets/DashboardImages/woodTOne.svg";
import WoodTTwo from "../assets/DashboardImages/woodTTwo.svg";
import WoodTThree from "../assets/DashboardImages/woodTThree.svg";
import WoodTFour from "../assets/DashboardImages/woodTFour.svg";
import WoodTFive from "../assets/DashboardImages/woodTFive.svg";
import WoodTSix from "../assets/DashboardImages/woodTSix.svg";
import WoodTSeven from "../assets/DashboardImages/woodTSeven.svg";
import WoodTEight from "../assets/DashboardImages/woodTEight.svg";
import WoodTNine from "../assets/DashboardImages/woodTNine.svg";

export const CustomizedProduct = () => {
  return (
    <div>
      <div>
        <form action="">
          <div className="flex lg:flex-col md:flex-col xl:gap-[20px] gap:[10px] bg-[rgb(250,250,250)] h-full px-[20px]">
            <div className="xl:w-2/4 w-full xl:pt-[30px] pt-[20px] xl:pb-[20px] pb-[14px] ">
              {/* <div className="flex gap-2 items-center mb-[49px]">
              <img src={ArrowBack} alt="" />
              <h5 className="xl:text-32 lg:text-28 text-26 font-bold">Customized Product</h5>
            </div> */}
              {/* user profile card section */}
              {/* account detail card  */}
              <div className="myCard rounded-[4px] xl:mb-[30px] lg:mb-[15px] mb-[5px] px-[15px] h-full">
                <div className="formSec">
                  <div className=" mb-[24px]">
                    <div className="w-full md:mb-0">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="prodname"
                      >
                        Product Name
                      </label>
                      <InputField placeholder="Plank" id="prodname" />
                      <small
                        style={{
                          fontSize: "13px",
                          color: "#4C5B66",
                          marginTop: "13px",
                          display: "inline-block",
                        }}
                      >
                        Do not exceed 20 characters when entering the product
                        name.
                      </small>
                    </div>
                  </div>
                  <div
                    className=" flex gap-[20px] xl:mb-[25px] mb-[12px]"
                    style={{ overflowX: "auto" }}
                  >
                    <div className="w-full  mb-[12px]">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="name"
                      >
                        Wood Type
                      </label>
                      <div className="flex justify-between gap-[5px] w-[100%]">
                        <label className="box">
                          <input type="radio" name="box" value="box1" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTOne} alt="" />

                            <p className="text-10 mt-[7px] text-center">OAK</p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box2" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTTwo} alt="" />
                            <p className="text-10 mt-[7px] text-center">
                              THERMO HOUT
                            </p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box3" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTThree} alt="" />
                            <p className="text-10 mt-[7px] text-center">FIRE</p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box3" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTFour} alt="" />
                            <p className="text-10 mt-[7px] text-center">
                              HARDWOOD
                            </p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box3" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTFive} alt="" />
                            <p className="text-10 mt-[7px] text-center">
                              BEACON
                            </p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box3" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTSix} alt="" />
                            <p className="text-10 mt-[7px] text-center">
                              MAHOGANY
                            </p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box3" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTSeven} alt="" />
                            <p className="text-10 mt-[7px] text-center">
                              BRAZILIAN NUTS
                            </p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box3" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTEight} alt="" />
                            <p className="text-10 mt-[7px] text-center">
                              IRON STORE
                            </p>
                          </span>
                        </label>
                        <label className="box">
                          <input type="radio" name="box" value="box3" />
                          <span className="box-content flex flex-col">
                            <img src={WoodTNine} alt="" />
                            <p className="text-10 mt-[7px] text-center">
                              PARASOLS
                            </p>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="Hangings"
                      >
                        Hangings
                      </label>
                      <InputField
                        placeholder="Select Hangings"
                        id="Hangings"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="Sandeed"
                      >
                        Sanded
                      </label>
                      <InputField
                        placeholder="Select Sanded"
                        id="Sandeed"
                      />
                    </div>
                  </div>
                  <div className=" flex gap-[20px] mb-[24px]">
                    <div className="w-1/2 md:mb-0">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="typeProd"
                      >
                        To Color
                      </label>
                      <InputField
                        placeholder="Select Color"
                        id="typeProd"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="durability"
                      >
                        Price
                      </label>
                      <InputField placeholder="USD" id="durability" />
                    </div>
                  </div>
                  <div className=" flex  mb-[24px]">
                    <div className="w-full md:mb-0">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="planks"
                      >
                        Planks Inventory
                      </label>
                      <InputField placeholder="5000" id="planks" />
                    </div>
                  </div>

                  <div className=" flex mb-[5px]">
                    <div className="w-full md:mb-0">
                      <label
                        className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                        for="pDescrp"
                      >
                        Description
                      </label>
                      <Textarea />
                      <small
                        style={{
                          fontSize: "13px",
                          color: "#4C5B66",
                          marginTop: "3px",
                          display: "inline-block",
                        }}
                      >
                        Do not exceed 100 characters when entering the product
                        Description.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* add new product price table row  */}
            <div className="xl:w-2/4 w-full pt-[30px] pb-[20px] h-full">
              <div className="myCard rounded-[4px] px-[15px]">
                <div className=" flex gap-[20px] mb-[24px]">
                  <div className="w-full md:mb-0 relative">
                    <label
                      className=" text-black text-xs font-semibold xl:mb-[12px] mb-[8px] block"
                      for="weight"
                    >
                      Product Image
                      <br />
                      {/* <span className="text-[#6C7275] font-normal text-12">
                        You can Upload Multiple Images of product in different
                        dimensions
                      </span> */}
                    </label>
                    {/* dropzone sec  */}
                    <div className="flex xl:flex-row lg:flex-row flex-col gap-[8px] ">
                      <div className="prodImgLeft xl:w-[55%] lg:w-[58%] md:w-[100%] flex gap-[8px]">
                        <Dropzone width={'220px'}/>
                        <Dropzone width={'220px'}/>
                      </div>
                      <div className="xl:w-[39%] lg:w-[41%] w-[100%] flex flex-col gap-[8px] overflow-auto">
                        <Dropzone width={'100%'} height={"103px"}/>
                        <Dropzone width={'100%'} height={"103px"}/>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#4C5B66",
                        lineHeight: "21px",
                        marginTop: "14px",
                      }}
                    >
                      You need to add at least 4 images. Pay attention to the
                      quality of the pictures you add, comply with the
                      background color standards. picture must be in certain
                      dimensions. Notice that the product shows all the details
                    </p>
                    {/* dropzone sec end  */}
                  </div>
                </div>
                <div className="xl:mt-[440] mt-[120px]">
                  <Button
                    btnText="Cancel"
                    paddingX="20px"
                    breakpoint="xl:w-[220px] w-[200px]"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};