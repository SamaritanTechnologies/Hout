import React, { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { deleteCoupon, getCoupons } from "../redux/actions/couponAction";
import { toast } from "react-toastify";
import EditCoupon from "../components/Coupon/EditCoupon";
import AddCouponModal from "../components/Coupon/AddCouponModal";

const AddCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons();
      setCoupons(res);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error to fetch coupons");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDeleteCoupon = async () => {
    try {
      console.log("id", currentCoupon.id);
      const res = await deleteCoupon(currentCoupon.id);
      fetchCoupons();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const openDeleteModal = async (coupon) => {
    setIsDeleteModalOpen(true);
    setCurrentCoupon(coupon);
  };

  return (
    <>
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
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap rounded-l-2xl">
                    Code
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    Discount
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    Type
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    Expiry Date
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    Min Order
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    Max Order
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap">
                    Status
                  </th>
                  <th className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-bold text-nowrap rounded-r-2xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray">
                {coupons.length > 0 ? (
                  coupons.map((coupon) => (
                    <tr key={coupon.id}>
                      <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                        {coupon.code}
                      </td>
                      <td className="xl:px-[24px] lg:px-[20px] px-[12px] xl:py-[16px] lg:py-[14px] py-[12px] text-left xl:text-15 text-14 font-semibold text-gray3">
                        {Number(coupon.discount_value).toFixed(1)}
                        {coupon.discount_type === "percentage" ? "%" : "$"}
                      </td>
                      <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3 capitalize">
                        {coupon.discount_type}
                      </td>
                      <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                        {
                          new Date(coupon.expiry_date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>
                      <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                        ${Number(coupon.minimum_order_amount).toFixed(1)}
                      </td>
                      <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                        {coupon.maximum_discount_amount
                          ? `$${Number(coupon.maximum_discount_amount).toFixed(
                              1
                            )}`
                          : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            coupon.is_active === true
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {coupon.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="xl:px-[24px] lg:px-[16px] px-[8px] xl:py-[16px] lg:py-[14px] py-[12px] text-left font-semibold text-gray3">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => {
                              setCurrentCoupon(coupon);
                              setIsEditModalOpen(true);
                            }}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <AddCouponModal
          setIsAddModalOpen={setIsAddModalOpen}
          fetchCoupons={fetchCoupons}
        />
      )}

      {/* Edit Coupon Modal */}
      {isEditModalOpen && (
        <EditCoupon
          coupon={currentCoupon}
          setIsEditModalOpen={setIsEditModalOpen}
          fetchCoupons={fetchCoupons}
        />
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
                className="px-4 py-2 bg-[#FBD232]  rounded-md text-sm font-medium text-white "
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCoupon}
                className="px-4 py-2 bg-[#FBD232]  rounded-md text-sm font-medium text-white"
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
