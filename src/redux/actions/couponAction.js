import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";

export const getCoupons = async () => {
  try {
    const response = await axiosWithCredentials.get(`/coupons/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export const addCoupon = async (values) => {
  try {
    const response = await axiosWithCredentials.post("/coupons/", values);
    toast.success("Coupon successfuly add");
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      "Failed to add coupon";
    toast.error(errorMessage);

    throw error;
  }
};

export const updateCoupon = async (id, values) => {
  try {
    const response = await axiosWithCredentials.put(`/coupons/${id}/`, values);

    toast.success("Coupon successfuly update");

    return response;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }
};

export const deleteCoupon = async (id) => {
  try {
    await axiosWithCredentials.delete(`/coupons/${id}/`);
    toast.success("Coupon deleted successfully");
  } catch (error) {
    toast.error("Something went wrong ");
    console.log(error, "error");
  }
};
