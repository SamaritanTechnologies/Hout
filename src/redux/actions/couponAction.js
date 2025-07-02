import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import i18n from "i18next";

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
    toast.success(i18n.t("coupon_add_success"));
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      i18n.t("coupon_add_fail");
    toast.error(errorMessage);

    throw error;
  }
};

export const updateCoupon = async (id, values) => {
  try {
    const response = await axiosWithCredentials.put(`/coupons/${id}/`, values);

    toast.success(i18n.t("coupon_update_success"));

    return response;
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("coupon_update_fail"));
  }
};

export const deleteCoupon = async (id) => {
  try {
    await axiosWithCredentials.delete(`/coupons/${id}/`);
    toast.success(i18n.t("coupon_delete_success"));
  } catch (error) {
    toast.error(i18n.t("coupon_delete_fail"));
    console.log(error, "error");
  }
};
