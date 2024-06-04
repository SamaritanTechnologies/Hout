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
import { useNavigate } from "react-router-dom";
import { axiosWithCredentials } from "../providers";
import { getProducts } from "../redux/actions/orderActions";
import DeleteModal from "../components/Modals/DeleteModal";
import { deleteProduct } from "../redux/actions/productActions";

export const Products = () => {
  const [state, setState] = useState({
    productsData: [],
  });
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const productData = [
    {
      id: "#123456",
      productName: "Product Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: productName,
      code: "QAk",
      category: "Standard",
      condition: "Sanded",
      quantity: {
        amount: 120,
        status: "80 Left",
      },
      price: "$1,500.00",
      editLink: "/customized-product",
      deleteLink: "#",
      dropdownMenuLink: "#",
    },

    {
      id: "#123456",
      productName: "Product Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: productName,
      code: "QAk",
      category: "Standard",
      condition: "Sanded",
      quantity: {
        amount: 120,
        status: "80 Left",
      },
      price: "$1,500.00",
      editLink: "/customized-product",
      deleteLink: "#",
      dropdownMenuLink: "#",
    },

    {
      id: "#123456",
      productName: "Product Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: productName,
      code: "QAk",
      category: "Standard",
      condition: "Sanded",
      quantity: {
        amount: 120,
        status: "80 Left",
      },
      price: "$1,500.00",
      editLink: "/customized-product",
      deleteLink: "#",
      dropdownMenuLink: "#",
    },

    {
      id: "#123456",
      productName: "Product Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: productName,
      code: "QAk",
      category: "Standard",
      condition: "Sanded",
      quantity: {
        amount: 120,
        status: "80 Left",
      },
      price: "$1,500.00",
      editLink: "/customized-product",
      deleteLink: "#",
      dropdownMenuLink: "#",
    },

    {
      id: "#123456",
      productName: "Product Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: productName,
      code: "QAk",
      category: "Standard",
      condition: "Sanded",
      quantity: {
        amount: 120,
        status: "80 Left",
      },
      price: "$1,500.00",
      editLink: "/customized-product",
      deleteLink: "#",
      dropdownMenuLink: "#",
    },

    {
      id: "#123456",
      productName: "Product Name",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: productName,
      code: "QAk",
      category: "Standard",
      condition: "Sanded",
      quantity: {
        amount: 120,
        status: "80 Left",
      },
      price: "$1,500.00",
      editLink: "/customized-product",
      deleteLink: "#",
      dropdownMenuLink: "#",
    },
  ];

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
        const res = await deleteProduct({ id: selectedItem });
        console.log(res, "fetchUser");
        setIsDeleted(!isDeleted);
      }
    } catch (error) {
      console.error("Error fetching user data:");
    }
  };

  console.log(state?.productsData, "state");

  useEffect(() => {
    fetchProducts();
  }, [isDeleted]);

  console.log(open, "state");

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
              <div class="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                      />
                    </svg>
                    Filters
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <div class="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Date
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
            </div>
          </div>

          {/* order details table  */}
          <div className=" max-w-screen mx-auto overflow-x-auto">
            <table className="table-auto productsTable">
              <thead>
                <tr className="bg-[#F1F4F9]">
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold  rounded-l-2xl	">
                    ID
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold  	">
                    Image/Name
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Description
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Wood Type
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Hanging
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Sanded
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold	">
                    Stock
                  </th>

                  <th className="px-[10px] py-[12px]  text-center text-14 font-bold">
                    Price
                  </th>

                  <th className="px-[10px] py-[12px]  text-center text-14 font-bold">
                    After Discount
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
                      className={`border-b-[0.4px] border-gray ${
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
                            <img
                              src={rowData?.images_url?.[0]}
                              alt={rowData?.name}
                              className=""
                            />
                          </div>
                          <div className="">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {rowData?.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3 w-[12%]">
                        <p className="text-gray-900 overflow-hidden whitespace-normal line-clamp-3 min-w-[120px]">
                          {rowData?.description}
                        </p>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                        <div className="flex gap-2 items-center">
                          <div className="flex-shrink-0 w-[38.64px] h-[38.64px]">
                            <img
                              src={rowData?.image}
                              alt={rowData?.productName}
                            />
                          </div>
                          <div className="min-w-[40px]">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {rowData?.code}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                        <div className="flex gap-3 items-center">
                          <div className="">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {rowData?.hangings}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex xl:gap-3 gap-2 items-center">
                          <div className="">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {rowData?.sanded}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex gap-3 items-center">
                          <div className="">
                            <p className="text-gray-900 whitespace-no-wrap flex gap-2 items-center">
                              {rowData?.stock}{" "}
                              <span className="bg-[#FBC7001A] text-[#FBC700] p-[8px] rounded-full inline-block min-w-[70px] text-center">
                                {rowData.quantity.status}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex gap-3 items-center justify-center">
                          <div className="">
                            <p className="text-14 text-center">
                              ${rowData?.price}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                        <div className="flex xl:gap-3 gap-2 items-center justify-center">
                          <p className="xl:text-14 lg-text-[13px] text-12 text-center">
                            N/A
                          </p>
                        </div>
                      </td>
                      <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left xl:text-14 lg-text-[13px] text-12 font-semibold text-gray3 min-w-[100px]">
                        <div className="flex xl:gap-3 gap-2 items-center justify-center">
                          <a href={rowData?.editLink}>
                            <img src={editImg} alt="edit icon image" />
                          </a>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedItem(rowData?.id);
                              setOpen(true);
                            }}
                          >
                            <img src={dltImg} alt="Delete icon image" />
                          </div>
                          <a href={rowData?.dropdownMenuLink}>
                            <img src={dots} alt="vertical drop down dot img" />
                          </a>
                        </div>
                      </td>
                      {/* <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                      <div className="flex xl:gap-3 gap-2 items-center justify-center">
                       
                      </div>
                    </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-[14px] text-[#141718] text-center py-[22px]"
                    >
                      No items
                    </td>
                  </tr>
                )}
              </tbody>

              {/* PRODUCT TABLE FIRST ROW  */}
              {/* <tr className="border-b-[0.4px] border-gray">
                <td className="px-[10px] py-[12px]  text-left text-14 font-semibold text-gray3">
                  <div className="">
                    <p className="text-gray-900 whitespace-no-wrap">#123456</p>
                  </div>
                </td>
                <td className="px-[10px] py-[12px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-2 items-center">
                    <div className="flex-shrink-0 w-[60px] h-[60px]">
                      <img src={productName} alt="sample Product Name" />
                    </div>
                    <div className="min-w-[100px]">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Product Name
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-[10px] py-[12px]  text-left text-14 font-semibold text-gray3 w-[12%]">
                  <p className="text-gray-900 overflow-hidden whitespace-normal line-clamp-3 min-w-[120px]">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </td>
                <td className="px-[10px] py-[12px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-2 items-center">
                    <div className="flex-shrink-0 w-[38.64px] h-[38.64px]">
                      <img src={woodImg} alt="sample Product Name" />
                    </div>
                    <div className="min-w-[40px]">
                      <p className="text-gray-900 whitespace-no-wrap">QAk</p>
                    </div>
                  </div>
                </td>
                <td className="px-[10px] py-[12px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-3 items-center">
                    <div className="">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Standard
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-[24px] py-[24px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-3 items-center">
                    <div className="">
                      <p className="text-gray-900 whitespace-no-wrap">Sanded</p>
                    </div>
                  </div>
                </td>
                <td className="px-[10px] py-[24px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-3 items-center">
                    <div className="">
                      <p className="text-gray-900 whitespace-no-wrap flex gap-2 items-center">
                        120{" "}
                        <span
                          className="bg-[#FBC7001A] text-[#FBC7001A
] p-[8px] rounded-full inline-block min-w-[70px] text-center"
                        >
                          80 Left
                        </span>
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-[10px] py-[24px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-3 items-center justify-center">
                    <div className="">
                      <p className=" text-14 text-center">$1,500.00</p>
                    </div>
                  </div>
                </td>
                <td className="px-[10px] py-[24px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-3 items-center justify-center">
                    <p className=" text-14 text-center">N/A</p>
                  </div>
                </td>
                <td className="px-[10px] py-[24px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-3 items-center justify-center">
                    <a href="#">
                      <img src={editImg} alt="edit icon image" />
                    </a>
                    <a href="#">
                      <img src={dltImg} alt="Delete icon image" />
                    </a>
                  </div>
                </td>
                <td className="px-[10px] py-[24px]  text-left text-14 font-semibold text-gray3">
                  <div className="flex gap-3 items-center justify-center">
                    <a href="#">
                      <img src={dots} alt="vertical drop down dot img" />
                    </a>
                  </div>
                </td>
              </tr> */}
            </table>
          </div>
          {/* order details table end */}

          <div
            onClick={() => {
              navigate("/new-product");
            }}
            className="w-full xl:mt-[60px] lg:mt-[40px] mt-[25px] flex justify-end"
          >
            {/* <button className="bg-[#FBC700] block text-black text-center py-[14px] px-[20px] w-[26%] font-semibold mb-[23px] text-20 ">
            Add New Product
          </button> */}

            <Button
              btnText=" Add New Product"
              breakpoint="xl:w-[282px] lg:w-[240px] w-[200px] "
            />
          </div>
        </div>
      </div>
    </>
  );
};
