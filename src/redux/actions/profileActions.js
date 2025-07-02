import { toast } from "react-toastify";
import {
  axiosApi,
  axiosWithCredentials,
  getRefreshToken,
} from "../../providers";
import { getUserId } from "../slices/authSlice";
import i18n from "i18next";

export const updatePass = async (values, id, { setSubmitting }) => {
  // const id = getUserId();
  try {
    const { oldPassword, newPassword, repeatNewPassword } = values;

    const response = await axiosWithCredentials.put(
      `/accounts/change-password/${id}/`,
      {
        old_password: oldPassword,
        password: newPassword,
        password2: repeatNewPassword,
      }
    );

    toast.success(i18n.t("pa_password_update_success"));
    setSubmitting(false);
  } catch (error) {
    console.log(error, "error");
    if (error?.response?.data?.password) {
      error?.response?.data?.password.map((item) => {
        toast.error(i18n.t("pa_password_update_error"));
      });
    } else if (error?.response?.data?.old_password?.old_password) {
      toast.error(i18n.t("pa_password_update_error"));
    } else {
      toast.error(i18n.t("pa_password_update_error"));
    }
    console.error("Error:", error);
  }
};

export const getProfileInfo = async () => {
  try {
    const response = await axiosWithCredentials.get(`/accounts/retrieve-user/`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateProfile = async (values, id, { setSubmitting }) => {
  // const id = getUserId();
  console.log("id", id);

  try {
    const { first_name, last_name, email, company_name, phone } = values;

    const payload = {
      first_name,
      last_name,
      email,
      company_name: company_name || null,
      phone: phone || null,
    };

    await axiosWithCredentials.put(`/accounts/update-profile/${id}/`, payload);
    toast.success(i18n.t("pa_profile_update_success"));

    setSubmitting(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("pa_profile_update_error"));
    setSubmitting(false);
  }
};

export const resetPasswordLink = async (values, { setSubmitting }) => {
  try {
    const { email } = values;
    const payload = {
      email,
    };
    const response = await axiosApi.post("/accounts/forget_password/", payload);
    setSubmitting(false);
    toast.success(i18n.t("pa_reset_link_sent"));
    return response;
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("pa_reset_link_error"));
  }
};

export const resetPassword = async (values, { setSubmitting }) => {
  try {
    const { password, uid } = values;

    const payload = {
      password,
      password1: password,
    };

    const response = await axiosWithCredentials.post(
      `accounts/forget_password/confirm/${uid}/`,
      payload
    );
    toast.success(i18n.t("pa_password_reset_success"));
    setSubmitting(false);
    return response;
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("pa_password_reset_error"));
    setSubmitting(false);
    throw error;
  }
};

export const updateInvoiceDelivery = async (values, { setSubmitting }) => {
  try {
    const { stNumber, zCode, city, country } = values;

    const payload = {
      stNumber,
      zCode,
      city,
      country: country || null,
    };

    await axiosWithCredentials.post("/update-address/", payload);
    toast.success(i18n.t("pa_invoice_delivery_update_success"));

    setSubmitting(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("pa_invoice_delivery_update_error"));
  }
};

export const uploadProfilePic = async (formData) => {
  try {
    if (!formData) {
      toast.error(i18n.t("pa_no_image_selected"));
      return;
    }

    const response = await axiosWithCredentials.patch(
      "/accounts/update_profile_picture/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success(i18n.t("pa_profile_pic_update_success"));
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error(i18n.t("pa_profile_pic_update_error"));
  }
};

export const getDeliveryAddress = async () => {
  const id = getUserId();

  try {
    const response = await axiosWithCredentials.get(
      `/accounts/update-delivery-address/${id}/`
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateDeliveryAddress = async (values, { setSubmitting }) => {
  const id = getUserId();

  try {
    const { stNumber, zCode, city, country } = values;

    const payload = {
      user: id,
      street_and_number: stNumber,
      zip_code: zCode,
      city,
      country: country || null,
    };

    await axiosWithCredentials.put(
      `/accounts/update-delivery-address/${id}/`,
      payload
    );
    toast.success(i18n.t("pa_delivery_address_update_success"));

    setSubmitting(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("pa_delivery_address_update_error"));
  }
};

export const getInvoiceAddress = async () => {
  const id = getUserId();

  try {
    const response = await axiosWithCredentials.get(
      `/accounts/update-invoice-address/${id}/`
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateInvoiceAddress = async (values) => {
  const id = getUserId();

  try {
    const payload = {
      user: id,
      street_and_number: values.street_and_number,
      zip_code: values.zip_code,
      city: values.city,
      country: values.country || "Netherland",
    };

    const response = await axiosWithCredentials.put(
      `/accounts/update-invoice-address/${id}/`,
      payload
    );
    toast.success(i18n.t("pa_invoice_address_update_success"));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("pa_invoice_address_update_error"));
    throw error;
  }
};
export const updateDeliverAddress = async (values) => {
  const id = getUserId();

  try {
    const payload = {
      user: id,
      street_and_number: values.street_and_number,
      zip_code: values.zip_code,
      city: values.city,
      country: values.country || "Netherland",
    };

    const response = await axiosWithCredentials.put(
      `/accounts/update-delivery-address/${id}/`,
      payload
    );
    toast.success(i18n.t("pa_delivery_address_update_success"));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error(i18n.t("pa_delivery_address_update_error"));
    throw error;
  }
};

export const getAccessFromRefresh = async () => {
  const response = await axiosWithCredentials.post("/accounts/refresh_token/", {
    refresh_token: getRefreshToken(),
  });
  return response.data;
};
