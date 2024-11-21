import React, { useEffect, useState } from "react";
// import sampleProductImg from "../assets/DashboardImages/sampleProductImg.svg";
import productName from "../assets/DashboardImages/productName.svg";
import woodImg from "../assets/DashboardImages/woodImg.svg";
// import editImg from "../assets/DashboardImages/editImg.svg";
import editImg from "../assets/DashboardImages/edit.svg";
import dltImg from "../assets/DashboardImages/delete.svg";
import dots from "../assets/DashboardImages/dotsvertical.svg";
import Button from "../components/Common/Button";
import cartButton from "../assets/addToCart/cartButton.svg";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../components/Modals/DeleteModal";
import { deleteProduct, getProducts } from "../redux/actions/productActions";

export const Products = () => {
  const [state, setState] = useState({
    productsData: [],
  });
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setState((prev) => ({
        ...prev,
        productsData: res,
      }));
      console.log(res, "fetchUser");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        await deleteProduct({
          id: selectedItem?.product_id,
          parentId: selectedItem?.parent_product_id,
        });
        setIsDeleted(!isDeleted);
      }
    } catch (error) {
      console.error("Error fetching user data:");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isDeleted]);

  return (
    <>
      <DeleteModal
        isOpen={open}
        closeModal={() => setOpen(!open)}
        handleDelete={handleDelete}
      />
     
      <div>
        <div className="xl:py-[24px] lg:py-[20px] py-[16px] xl:px-[20px] lg:px-[16px] px-[10px] bg-[#fafafa] h-full min-h-[86vh]">
          <div className="flex justify-between">
            <h1 className="xl:text-32 lg:text-28 text-26 font-bold xl:mb-[30px] lg:mb-[22px] mb-[14px] ">
              Products
            </h1>

            <div className="flex gap-4">
              <div>
                <Button
                  onClick={() => {
                    navigate("/new-product");
                  }}
                  btnText=" Add New Product"
                  breakpoint="xl:w-[282px] lg:w-[240px] w-[200px] "
                />
              </div>
            </div>
          </div>

          <div className=" max-w-screen mx-auto overflow-x-auto">
            <table className="table-auto productsTable w-full">
              <thead>
                <tr className="bg-[#F1F4F9]">
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold  rounded-l-2xl	">
                    ID
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold  	">
                    Image
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold  	">
                    Name
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Thickness
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Width
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Group
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Type
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Material
                  </th>

                  <th className="px-[10px] py-[12px]  text-center text-14 font-bold">
                    Profile
                  </th>

                  <th className="px-[10px] py-[12px]  text-center text-14 font-bold">
                    Stock
                  </th>
                  <th className="px-[10px] py-[12px]  text-center text-14 font-bold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {state?.productsData?.length > 0 ? (
                  state.productsData.map((rowData, index) => (
                    <tr
                      key={index}
                      className={`border-b-[0.4px] w-full border-gray ${
                        index % 2 !== 0 ? "bg-[#F1F4F9]" : "bg-[#fff]"
                      }`}
                    >
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                        <div className="">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {rowData?.id}
                          </p>
                        </div>
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                        <div className="flex gap-1 items-center">
                          <div className="block xl:w-[60px] lg:w-[50px] w-[45px]">
                            {rowData?.images_url?.length ? (
                              <img
                                src={rowData?.images_url?.[0]?.url}
                                alt={rowData?.name}
                                className=""
                              />
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                        {rowData?.name_en}
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3 w-[12%]">
                        <p className="text-gray-900 overflow-hidden whitespace-normal line-clamp-3 min-w-[120px]">
                          {rowData?.thickness}
                        </p>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                        <div className="flex gap-2 items-center">
                          <div className="min-w-[40px]">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {rowData?.width}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                        <div className="flex flex-col gap-1 items-center">
                          {rowData?.group && rowData.group.length > 0
                            ? rowData.group.map((item, index) => (
                                <p key={index}>{item}</p>
                              ))
                            : "---"}
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex flex-col gap-1 items-center">
                          {rowData?.type && rowData.type.length > 0
                            ? rowData.type.map((item, index) => (
                                <p
                                  key={index}
                                  className="text-gray-900 whitespace-no-wrap"
                                >
                                  {item}
                                </p>
                              ))
                            : "---"}
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex flex-col gap-1 items-center">
                          {rowData?.material && rowData.material.length > 0
                            ? rowData.material.map((item, index) => (
                                <p
                                  key={index}
                                  className="text-gray-900 whitespace-no-wrap flex gap-2 items-center"
                                >
                                  <span className="bg-[#FBC7001A] text-[#FBC700] py-1 px-3 rounded-full inline-block min-w-[70px] text-center">
                                    {item}
                                  </span>
                                </p>
                              ))
                            : "---"}
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex flex-col gap-1 items-center justify-center">
                          {rowData?.profile && rowData.profile.length > 0
                            ? rowData.profile.map((item, index) => (
                                <p
                                  key={index}
                                  className="text-gray-900 whitespace-no-wrap flex gap-2 items-center"
                                >
                                  {item}
                                </p>
                              ))
                            : "---"}
                        </div>
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex xl:gap-3 gap-2 items-center justify-center">
                          <p className="text-gray-900 whitespace-no-wrap flex gap-2 items-center">
                            {rowData?.stock}
                          </p>
                        </div>
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left xl:text-14 lg-text-[13px] text-12 font-semibold text-gray3 min-w-[100px]">
                        <div className="flex xl:gap-3 gap-2 items-center justify-center">
                          <div
                            onClick={() => {
                              navigate(`/product/${rowData.parent_product_id}`);
                            }}
                            className="cursor-pointer"
                          >
                            <img src={editImg} alt="edit icon image" />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedItem(rowData);
                              setOpen(true);
                            }}
                          >
                            <img src={dltImg} alt="Delete icon image" />
                          </div>
                        </div>
                      </td>
                      {/* <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                      <div className="flex xl:gap-3 gap-2 items-center justify-center">
                       
                      </div>
                    </td> */}
                    </tr>
                  ))
                ) : (
                  <tr className="w-full">
                    <td
                      colSpan="5"
                      className="text-[14px] text-[#141718] text-center py-[22px]"
                    >
                      No items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
