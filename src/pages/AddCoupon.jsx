import React, { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import InputField from "../components/Common/InputField";

const AddCoupon = () => {
  // Sample coupon data
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SUMMER20",
      discount: 20,
      type: "percentage",
      expiryDate: "2023-12-31",
      minOrder: 50,
      maxDiscount: 100,
      isActive: true,
    },
    {
      id: 2,
      code: "FLAT50",
      discount: 50,
      type: "fixed",
      expiryDate: "2023-11-30",
      minOrder: 100,
      maxDiscount: null,
      isActive: true,
    },
    {
      id: 3,
      code: "WELCOME10",
      discount: 10,
      type: "percentage",
      expiryDate: "2023-10-15",
      minOrder: 0,
      maxDiscount: 50,
      isActive: false,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    expiryDate: "",
    minOrder: "",
    maxDiscount: "",
    isActive: true,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add new coupon
  const handleAddCoupon = (e) => {
    e.preventDefault();
    const newCoupon = {
      id: coupons.length + 1,
      ...formData,
      discount: parseFloat(formData.discount),
      minOrder: parseFloat(formData.minOrder),
      maxDiscount: formData.maxDiscount
        ? parseFloat(formData.maxDiscount)
        : null,
    };
    setCoupons([...coupons, newCoupon]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit coupon
  const handleEditCoupon = (e) => {
    e.preventDefault();
    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === currentCoupon.id
        ? {
            ...coupon,
            ...formData,
            discount: parseFloat(formData.discount),
            minOrder: parseFloat(formData.minOrder),
            maxDiscount: formData.maxDiscount
              ? parseFloat(formData.maxDiscount)
              : null,
          }
        : coupon
    );
    setCoupons(updatedCoupons);
    setIsEditModalOpen(false);
    resetForm();
  };

  // Delete coupon
  const handleDeleteCoupon = () => {
    const updatedCoupons = coupons.filter(
      (coupon) => coupon.id !== currentCoupon.id
    );
    setCoupons(updatedCoupons);
    setIsDeleteModalOpen(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      code: "",
      discount: "",
      type: "percentage",
      expiryDate: "",
      minOrder: "",
      maxDiscount: "",
      isActive: true,
    });
  };

  // Open edit modal with coupon data
  const openEditModal = (coupon) => {
    setCurrentCoupon(coupon);
    setFormData({
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      expiryDate: coupon.expiryDate,
      minOrder: coupon.minOrder,
      maxDiscount: coupon.maxDiscount || "",
      isActive: coupon.isActive,
    });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (coupon) => {
    setCurrentCoupon(coupon);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {/* Coupons Table */}
      <div className="xl:p-[30px] lg:p-[24px] p-[20px] bg-[#fafafa]">
        <div className="myCard bg-[#fff]">
          <div className="flex justify-between items-center xl:mb-[35px] lg:mb-[28px] mb-[20px]">
            <h5 className="xl:text-24 lg:text-22 text-20  font-bold">
              Coupon Management
            </h5>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-customYellow text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusIcon className="h-5 w-5 text-white" />
              Add Coupon
            </button>
          </div>
          <div className="w-full rounded-lg overflow-x-auto">
            <table className="w-full leading-normal">
              <thead>
                <tr className="bg-[#F1F4F9]">
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap rounded-l-2xl">
                    Code
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Discount
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Type
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Expiry Date
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Min Order
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Max Discount
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap">
                    Status
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold	text-nowrap rounded-r-2xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray">
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                      {coupon.code}
                    </td>
                    <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                      {coupon.discount}
                      {coupon.type === "percentage" ? "%" : "$"}
                    </td>
                    <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3 capitalize">
                      {coupon.type}
                    </td>
                    <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                      {coupon.expiryDate}
                    </td>
                    <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                      ${coupon.minOrder}
                    </td>
                    <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                      {coupon.maxDiscount ? `$${coupon.maxDiscount}` : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          coupon.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {coupon.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => openEditModal(coupon)}
                          className="text-customYellow"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(coupon)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Coupon</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={handleAddCoupon}
               className="space-y-4 overflow-y-auto px-6 max-h-[calc(100vh-150px)]"
            >
              <InputField
                required
                label="Coupon Code"
                placeholder="Enter Coupon Code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
              />
              <InputField
                label="Discount Value"
                placeholder="Enter Discount Value"
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="pl-3 pr-10 block w-full font-footer1 placeholder-[#5A5A5A] rounded-md xl:py-3 xl:ps-3 py-2 pe-3 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm input-field"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <InputField
                label="Expiry Date"
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
              <InputField
                label="Minimum Order Amount ($)"
                type="number"
                name="minOrder"
                value={formData.minOrder}
                onChange={handleInputChange}
                required
                placeholder="Enter Minimum Order"
              />

              {formData.type === "percentage" && (
                <InputField
                  label="Maximum Discount Amount ($)"
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleInputChange}
                  placeholder="Enter Max Discount"
                />
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#FBC700] focus:ring-[#FBC700] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Active Coupon
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#FBC700] rounded-md "
                >
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4 px-6">
              <h2 className="text-xl font-semibold">Edit Coupon</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleEditCoupon}
              className="space-y-4 overflow-y-auto px-6 max-h-[calc(100vh-150px)]"
            >
              <InputField
                label="Coupon Code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />
              <InputField
                label="Discount Value"
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="pl-3 pr-10 block w-full font-footer1 placeholder-[#5A5A5A] rounded-md xl:py-3 xl:ps-3 py-2 pe-3 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm input-field"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <InputField
                label="Expiry Date"
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
              <InputField
                label="Minimum Order Amount ($)"
                type="number"
                name="minOrder"
                value={formData.minOrder}
                onChange={handleInputChange}
                required
              />
              {formData.type === "percentage" && (
                <InputField
                  label="Maximum Discount Amount ($)"
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleInputChange}
                />
              )}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Active Coupon
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#FBC700] rounded-md "
                >
                  Update Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Delete Coupon</h2>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-6">
              Are you sure you want to delete the coupon{" "}
              <span className="font-semibold">{currentCoupon?.code}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCoupon}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCoupon;
