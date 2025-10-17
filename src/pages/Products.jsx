import React, { useEffect, useState } from "react";
import editImg from "../assets/DashboardImages/edit.svg";
import dltImg from "../assets/DashboardImages/delete.svg";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "../components/Common/Button";
import ButtonSmall from "../components/Common/Button2";
import DropdownFilter from "../components/Dashboard/DropdownFilter";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/Modals/DeleteModal";
import {
  deleteProduct,
  getProductCategories,
  getProducts,
  generateProductLabel,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { setProductCategories } from "../redux";
import Activebadge from "../assets/DashboardImages/ActiveBadge.svg";
import ActiveTableHead from "../assets/DashboardImages/ActiveTableHead.svg";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Pagination from "../components/Common/Pagination";
import { PRODUCT_PAGE_SIZE } from "../utils/const";
import { scrollDashboardToTop } from "../utils/helper";

const initialState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};

export const Products = () => {
  const { productCategories } = useSelector((state) => state.admin);
  const [searchQuery, setSearchQuery] = useState("");
  const [state, setState] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [labelGenerating, setLabelGenerating] = useState({});
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    group: [],
    type: [],
    material: [],
    profile: [],
    thickness: [],
    width: [],
  });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = PRODUCT_PAGE_SIZE;
  const { t } = useTranslation();

  const fetchProducts = async (selectedOptions, page = currentPage) => {
    try {
      setIsLoading(true);
      // Filter out empty arrays and add pagination parameters
      const filteredOptions = Object.entries(selectedOptions).reduce((acc, [key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const optionsWithPagination = {
        ...filteredOptions,
        page: page + 1, // API uses 1-based indexing
        page_size: pageSize,
      };

      const res = await getProducts(optionsWithPagination);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        await deleteProduct(selectedItem?.id);
        setIsDeleted(!isDeleted);
        // toast.success(t("product_delete_success"));
      }
    } catch (error) {
      console.error("Error fetching user data:");
      toast.error(t("product_delete_fail"));
    }
  };

  useEffect(() => {
    fetchProducts(selectedOptions, currentPage);
  }, [isDeleted, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    scrollDashboardToTop();
  };

  const getTransformedChoices = (name) => {
    const category = productCategories?.find(
      (cat) => cat.name?.toLowerCase() === name.toLowerCase()
    );
    if (!category) return [];

    return category.choices?.map((choice) => ({
      value: choice.id,
      label: choice.name_nl,
    }));
  };

  const onFilterChange = (filterKey, selectedValues) => {
    setSelectedOptions((prev) => {
      const updatedOptions = {
        ...prev,
        [filterKey]: selectedValues,
      };
      setCurrentPage(0); // Reset to first page when filters change
      fetchProducts(updatedOptions, 0);
      return updatedOptions;
    });
  };

  const FilterLabel = ({ type }) => {
    const selected = selectedOptions[type] || [];
    const hasSelectedOptions = selected.length > 0;

    return (
      <div className="relative">
        <FunnelIcon className="h-6 w-6 text-gray-500" />
        {hasSelectedOptions && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400" />
        )}
      </div>
    );
  };
  const filteredProducts =
    state.results?.filter((product) =>
      product.name_en?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenerateLabel = async (productId) => {
    try {
      setLabelGenerating(prev => ({ ...prev, [productId]: true }));
      const response = await generateProductLabel(productId);
      
      console.log("Label generation response:", response); // Debug log
      
      // Try to update the specific product in the state first
      setState(prev => ({
        ...prev,
        results: prev.results.map(product => 
          product.id === productId 
            ? { 
                ...product, 
                label: response?.label || true, // Set label to true if response has label data
                pdf_url: response?.pdf_url || response?.url || response?.file_url || response?.data?.pdf_url // Try different possible URL fields
              }
            : product
        )
      }));
      
      // If there's a PDF URL in the response, open it
      const pdfUrl = response?.pdf_url || response?.url || response?.file_url || response?.data?.pdf_url;
      if (pdfUrl) {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else {
        // If no PDF URL in response, refetch the products to get updated data
        console.log("No PDF URL found in response, refetching products...");
        await fetchProducts(selectedOptions, currentPage);
      }
    } catch (error) {
      console.error("Label generation failed:", error);
      toast.error("Failed to generate label");
    } finally {
      setLabelGenerating(prev => ({ ...prev, [productId]: false }));
    }
  };



  const highlightMatch = (text, query) => {
    if (!query || !text) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    const beforeMatch = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const afterMatch = text.substring(index + query.length);

    return (
      <>
        {beforeMatch}
        <span className="bg-yellow-200">{match}</span>
        {afterMatch}
      </>
    );
  };

  return (
    <>
      <DeleteModal
        description={"Are you sure you want to delete product?"}
        isOpen={open}
        closeModal={() => setOpen(!open)}
        handleDelete={handleDelete}
      />

      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl xl:text-[32px] font-bold">Products</h1>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center w-full min-w-[250px] max-w-[388px] h-10 rounded-full focus-within:shadow-lg bg-white overflow-hidden border-gray	border-[0.5px]">
            <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#fefbeb]  min-w-[50px]">
              <MagnifyingGlassIcon className="h-6 w-6 text-[#00000080]" />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#fefbeb]"
              type="text"
              id="search"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            onClick={() => {
              navigate("/new-product");
            }}
            btnText=" Add New Product"
            textColor="#000000"
            breakpoint="w-full max-w-[282px]"
          />
        </div>
      </div>
      <div className="max-w-screen mx-auto overflow-x-auto">
        <table className="table-auto productsTable w-full min-w-[1154px] min-h-52">
          <thead>
            <tr className="bg-[#F1F4F9] border-b border-[#CACACA33] rounded-tl-lg rounded-tr-lg">
              <th className="px-[10px] py-[12px] text-sm font-semibold rounded-tl-lg">
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
                    onChange={(values) => onFilterChange("thickness", values)}
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
                    onChange={(values) => onFilterChange("material", values)}
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
                <img src={ActiveTableHead} alt="ActiveTableHead" />
              </th>
              <th className="px-[10px] py-[12px]  text-center text-14 font-medium min-h-12">
                Action
              </th>
              <th className="px-[10px] py-[12px] text-center text-14 font-medium min-h-12 rounded-tr-lg">
                Label
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr className="w-full">
                <td
                  colSpan="12"
                  className="text-[14px] text-[#141718] text-center py-[22px]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    <span>Loading products...</span>
                  </div>
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((rowData, index) => (
                <tr
                  key={index}
                  className={`border-b-[0.4px] w-full border-gray ${index % 2 !== 0 ? "bg-[#F1F4F9]" : ""
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
                        {rowData?.images?.length ? (
                          <img
                            src={rowData?.images?.[0]?.image}
                            alt={rowData?.name}
                            className=""
                          />
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[12px] text-left text-14 font-semibold text-gray3">
                    {highlightMatch(rowData?.name_en, searchQuery)}
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
                    <div className="flex flex-col gap-1 items-start">
                      {rowData?.group && rowData.group?.length > 0
                        ? rowData.group?.map((item, index) => (
                          <p key={index}>{item.name_en}</p>
                        ))
                        : "---"}
                    </div>
                  </td>

                  <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                    <div className="flex flex-col gap-1 items-start">
                      {rowData?.product_type && rowData.product_type?.length > 0
                        ? rowData.product_type?.map((item, index) => (
                          <p
                            key={index}
                            className="text-gray-900 whitespace-no-wrap"
                          >
                            {item.name_en}
                          </p>
                        ))
                        : "---"}
                    </div>
                  </td>

                  <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                    <div className="flex flex-col gap-1">
                      {rowData?.material && rowData.material.length > 0
                        ? rowData.material.map((item, index) => (
                          <p
                            key={index}
                            className="text-gray-900 whitespace-no-wrap flex gap-2 items-center"
                          >
                            <span>{item.name_en}</span>
                          </p>
                        ))
                        : "---"}
                    </div>
                  </td>

                  <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                    <div className="flex flex-col gap-1">
                      {rowData?.profile && rowData.profile.length > 0
                        ? rowData.profile.map((item, index) => (
                          <p
                            key={index}
                            className="text-gray-900 whitespace-no-wrap flex gap-2 items-center"
                          >
                            {item.name_en}
                          </p>
                        ))
                        : "---"}
                    </div>
                  </td>

                  <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left text-14 font-semibold text-gray3">
                    <p className="bg-[#FBC7001A] text-[#FBC700] py-1 px-3 rounded-full min-w-[70px]  text-gray-900 flex gap-2 items-center text-nowrap">
                      {rowData?.lengths && rowData.lengths.length > 0
                        ? rowData.lengths.reduce(
                          (total, item) => total + item.stock,
                          0
                        )
                        : 0}{" "}
                      Left
                    </p>
                  </td>
                  <td>
                    {rowData?.is_active_on_goedgeplaatst ? (
                      <div className="border border-[#D0D5DD] rounded-md flex items-center justify-center px-1.5 py-0.5 gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#17B26A] shrink-0"></div>
                        <p className="block shrink-0 text-xs leading-[19px] font-medium text-[#344054]">
                          Active
                        </p>
                      </div>
                    ) : (
                      <div className="border border-[#D0D5DD] rounded-md flex items-center justify-center px-1.5 py-0.5 gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red shrink-0"></div>
                        <p className="block shrink-0 text-xs leading-[19px] font-medium text-[#344054]">
                          Inactive
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="xl:px-[10px] lg:px-[8px] px-[6px] py-[24px] text-left xl:text-14 lg-text-[13px] text-12 font-semibold text-gray3 min-w-[100px]">
                    <div className="flex xl:gap-3 gap-2 items-center justify-center">
                      <div
                        onClick={() => {
                          navigate(`/product/${rowData.id}`);
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
                  <td className="px-[6px] py-[18px] text-center align-middle">
                    <div className="flex flex-col items-center justify-center gap-1">
                      {rowData?.label ? (
                        <>
                          <a
                            href={rowData.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-[13px] hover:text-blue-800 transition"
                          >
                            View PDF
                          </a>
                          <ButtonSmall
                            onClick={() => handleGenerateLabel(rowData.id)}
                            btnText={labelGenerating[rowData.id] ? "Generating..." : "Label"}
                            disabled={labelGenerating[rowData.id]}
                          />
                        </>
                      ) : (
                        <ButtonSmall
                          onClick={() => handleGenerateLabel(rowData.id)}
                          btnText={labelGenerating[rowData.id] ? "Generating..." : "Label"}
                          disabled={labelGenerating[rowData.id]}
                        />
                      )}
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
                  colSpan="12"
                  className="text-[14px] text-[#141718] text-center py-[22px]"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {state.count > pageSize && (
        <div className="mt-6 flex justify-center">
          <Pagination
            pageCount={Math.ceil(state.count / pageSize)}
            onPageChange={handlePageChange}
            forcePage={currentPage}
          />
        </div>
      )}
    </>
  );
};
