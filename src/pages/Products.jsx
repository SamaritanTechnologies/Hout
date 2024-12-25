import React, { useEffect, useState } from "react";
// import sampleProductImg from "../assets/DashboardImages/sampleProductImg.svg";
import productName from "../assets/DashboardImages/productName.svg";
import woodImg from "../assets/DashboardImages/woodImg.svg";
// import editImg from "../assets/DashboardImages/editImg.svg";
import editImg from "../assets/DashboardImages/edit.svg";
import dltImg from "../assets/DashboardImages/delete.svg";
import filterImg from "../assets/DashboardImages/filter-funnel.svg";
import dots from "../assets/DashboardImages/dotsvertical.svg";
import Button from "../components/Common/Button";
import DropdownFilter from "../components/Dashboard/DropdownFilter";
import cartButton from "../assets/addToCart/cartButton.svg";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../components/Modals/DeleteModal";
import {
  deleteProduct,
  getProductCategories,
  getProducts,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { setProductCategories } from "../redux";

const initialState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};

export const Products = () => {
  const dispatch = useDispatch();
  const { productCategories } = useSelector((state) => state.admin);

  const [state, setState] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    group: [],
    type: [],
    material: [],
    profile: [],
    thickness: [],
    width: [],
  });

  const fetchProducts = async (selectedOptions) => {
    try {
      const res = await getProducts(selectedOptions);
      setState((prev) => ({
        ...prev,
        results: res.results || [],
        count: res.count || 0,
        next: res.next || null,
        previous: res.previous || null,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setState(initialState);
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

  const getTransformedChoices = (name) => {
    const category = productCategories?.find(
      (cat) => cat.name.toLowerCase() === name.toLowerCase()
    );
    if (!category) return [];

    return category.choices.map((choice) => ({
      value: choice.id,
      label: choice.name_en,
    }));
  };

  const onFilterChange = (filterKey, selectedValues) => {
    setSelectedOptions((prev) => {
      const updatedOptions = {
        ...prev,
        [filterKey]: selectedValues,
      };
      fetchProducts(updatedOptions);
      return updatedOptions;
    });
  };

  const FilterLabel = ({ type }) => {
    const selected = selectedOptions[type] || [];
    const hasSelectedOptions = selected.length > 0;

    return (
      <div className="relative">
        <img src={filterImg} alt="Filter" />
        {hasSelectedOptions && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400" />
        )}
      </div>
    );
  };

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
            <table className="table-auto productsTable w-full min-w-[1154px] min-h-52">
              <thead>
                <tr className="bg-[#F1F4F9]">
                  <th className="px-[10px] py-[12px]  text-left text-14 font-bold  rounded-l-2xl	">
                    Product ID
                  </th>

                  <th className="px-[10px] py-[12px]  text-left text-14 font-medium min-h-12">
                    Image
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-medium min-h-12">
                    Name
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-medium min-h-12">
                    <div className="flex items-center gap-2">
                      <span>Thickness</span>
                      <DropdownFilter
                        options={getTransformedChoices("thickness")}
                        selected={selectedOptions.thickness}
                        onChange={(values) =>
                          onFilterChange("thickness", values)
                        }
                        label={<FilterLabel type="thickness" />}
                      />
                    </div>
                  </th>
                  <th className="px-[10px] py-[12px] text-left text-14 font-medium min-h-12">
                    <div className="flex items-center gap-2">
                      <span>Width</span>
                      <DropdownFilter
                        options={getTransformedChoices("width")}
                        selected={selectedOptions.width}
                        onChange={(values) => onFilterChange("width", values)}
                        label={<FilterLabel type="width" />}
                      />
                    </div>
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-medium min-h-12">
                    <div className="flex items-center gap-2">
                      <span>Group</span>
                      <DropdownFilter
                        options={getTransformedChoices("group")}
                        selected={selectedOptions.group}
                        onChange={(values) => onFilterChange("group", values)}
                        label={<FilterLabel type="group" />}
                      />
                    </div>
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-medium min-h-12">
                    <div className="flex items-center gap-2">
                      <span>Type</span>
                      <DropdownFilter
                        options={getTransformedChoices("type")}
                        selected={selectedOptions.type}
                        onChange={(values) => onFilterChange("type", values)}
                        label={<FilterLabel type="type" />}
                      />
                    </div>
                  </th>
                  <th className="px-[10px] py-[12px]  text-left text-14 font-medium min-h-12">
                    <div className="flex items-center gap-2">
                      <span>Material</span>
                      <DropdownFilter
                        options={getTransformedChoices("material")}
                        selected={selectedOptions.material}
                        onChange={(values) =>
                          onFilterChange("material", values)
                        }
                        label={<FilterLabel type="material" />}
                      />
                    </div>
                  </th>

                  <th className="px-[10px] py-[12px]  text-center text-14 font-medium min-h-12">
                    <div className="flex items-center gap-2">
                      <span>Profile</span>
                      <DropdownFilter
                        options={getTransformedChoices("profile")}
                        selected={selectedOptions.profile}
                        onChange={(values) => onFilterChange("profile", values)}
                        label={<FilterLabel type="profile" />}
                      />
                    </div>
                  </th>

                  <th className="px-[10px] py-[12px]  text-center text-14 font-medium min-h-12">
                    Stock
                  </th>
                  <th className="px-[10px] py-[12px]  text-center text-14 font-medium min-h-12">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {state?.results?.length > 0 ? (
                  state.results.map((rowData, index) => (
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
                      colSpan="10"
                      className="text-[14px] text-[#141718] text-center py-[22px]"
                    >
                      No products found
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
