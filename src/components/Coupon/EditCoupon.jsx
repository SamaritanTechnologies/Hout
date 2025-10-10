import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputField from "../Common/InputField";
import { updateCoupon } from "../../redux/actions/couponAction";
import * as yup from "yup";

const couponSchema = yup.object().shape({
  code: yup.string().required("Coupon code is required"),
  discount_value: yup
    .number()
    .required("Discount value is required")
    .positive("Discount value must be positive")
    .when("discount_type", {
      is: "percentage",
      then: (schema) =>
        schema.max(100, "Percentage discount cannot exceed 100%"),
    }),
  discount_type: yup.string().required(),
  expiry_date: yup
    .date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date must be in the future"),
  minimum_order_amount: yup
    .number()
    .required("Minimum order amount is required")
    .positive("Minimum order must be positive"),
  maximum_discount_amount: yup
    .number()
    .positive("Maximum discount must be positive")
    .when(["discount_type", "minimum_order_amount"], {
      is: (discount_type, minimum_order_amount) =>
        discount_type === "percentage",
      then: (schema) =>
        schema
          .required("Maximum discount is required for percentage discounts")
          .test(
            "max-discount",
            "Maximum order amount should be greater than minimum order amount",
            function (value) {
              return value >= this.parent.minimum_order_amount;
            }
          ),
    }),
  is_active: yup.boolean(),
});

const EditCoupon = ({ coupon, setIsEditModalOpen, fetchCoupons }) => {
  const [formData, setFormData] = useState({
    code: "",
    discount_value: "",
    discount_type: "percentage",
    expiry_date: "",
    minimum_order_amount: "",
    maximum_discount_amount: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || "",
        discount_value: coupon.discount_value || "",
        discount_type: coupon.discount_type || "percentage",
        expiry_date: coupon.expiry_date || "",
        minimum_order_amount: coupon.minimum_order_amount || "",
        maximum_discount_amount: coupon.maximum_discount_amount || "",
        is_active: coupon.is_active !== undefined ? coupon.is_active : true,
      });
    }
  }, [coupon]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discount_value: "",
      discount_type: "percentage",
      expiry_date: "",
      minimum_order_amount: "",
      maximum_discount_amount: "",
      is_active: true,
    });
    setErrors({});
  };

  const handleEditCoupon = async (e) => {
    e.preventDefault();

    try {
      await couponSchema.validate(formData, { abortEarly: false });

      setErrors({});
      const response = await updateCoupon(coupon.id, formData);

      if (response) {
        fetchCoupons();
        setIsEditModalOpen(false);
        resetForm();
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        const errorMessage =
          error.response?.data?.code?.[0] ||
          error.response?.data?.message ||
          error.message ||
          "Failed to update coupon";
        console.error("Error updating coupon:", errorMessage);
        setErrors({ form: errorMessage });
      }
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Coupon</h2>
          <button
            onClick={() => {
              setIsEditModalOpen(false);
              resetForm();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        {errors.form && (
          <div className="mb-4 p-2 bg-red-100 rounded-md">
            <span className="text-rose-600 text-sm">{errors.form}</span>
          </div>
        )}
        <form
          onSubmit={handleEditCoupon}
          className="space-y-4 overflow-y-auto px-6 max-h-[calc(100vh-150px)]"
        >
          <div>
            <InputField
              required
              label="Coupon Code"
              placeholder="Enter Coupon Code"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              hasError={!!errors.code}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-rose-600">{errors.code}</p>
            )}
          </div>

          <div>
            <InputField
              label="Discount Value"
              placeholder={`Enter Discount Value (${
                formData.discount_type === "percentage" ? "%" : "€"
              })`}
              type="number"
              name="discount_value"
              value={formData.discount_value}
              onChange={handleInputChange}
              min={formData.discount_type === "percentage" ? "1" : "0.01"}
              max={formData.discount_type === "percentage" ? "100" : ""}
              step={formData.discount_type === "percentage" ? "1" : "0.01"}
              hasError={!!errors.discount_value}
            />
            {errors.discount_value && (
              <p className="mt-1 text-sm text-rose-600">
                {errors.discount_value}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type
            </label>
            <select
              name="discount_type"
              value={formData.discount_type}
              onChange={handleInputChange}
              className="pl-3 pr-10 block w-full font-footer1 placeholder-[#5A5A5A] rounded-md xl:py-3 xl:ps-3 py-2 pe-3 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm input-field"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div>
            <InputField
              label="Expiry Date"
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleInputChange}
              min={getMinDate()}
              hasError={!!errors.expiry_date}
            />
            {errors.expiry_date && (
              <p className="mt-1 text-sm text-rose-600">{errors.expiry_date}</p>
            )}
          </div>

          <div>
            <InputField
              label="Minimum Order Amount (€)"
              type="number"
              name="minimum_order_amount"
              value={formData.minimum_order_amount}
              onChange={handleInputChange}
              min="0.01"
              step="0.01"
              placeholder="Enter Minimum Order"
              hasError={!!errors.minimum_order_amount}
            />
            {errors.minimum_order_amount && (
              <p className="mt-1 text-sm text-rose-600">
                {errors.minimum_order_amount}
              </p>
            )}
          </div>

          <div>
            <InputField
              label="Maximum Order Amount (€)"
              type="number"
              name="maximum_discount_amount"
              value={formData.maximum_discount_amount}
              onChange={handleInputChange}
              placeholder="Enter Max Order Amount"
              min="0.01"
              step="0.01"
              hasError={!!errors.maximum_discount_amount}
            />
            {errors.maximum_discount_amount && (
              <p className="mt-1 text-sm text-rose-600">
                {errors.maximum_discount_amount}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="h-4 w-4 text-[#FBC700] focus:ring-[#FBC700] border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Active Coupon
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#FBC700] rounded-md hover:bg-[#e0b500]"
            >
              Update Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoupon;
