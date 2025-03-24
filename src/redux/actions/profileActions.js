import { toast } from "react-toastify";
import { axiosApi, axiosWithCredentials } from "../../providers";

export const updatePass = async (values, { setSubmitting }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const { oldPassword, newPassword, repeatNewPassword } = values;

    const response = await axiosWithCredentials.put(
      `/accounts/change-password/${userData?.id}/`,
      {
        old_password: oldPassword,
        password: newPassword,
        password2: repeatNewPassword,
      }
    );

    console.log(response.data, "ressppp");
    toast.success("Successfuly Updated");
    setSubmitting(false);
  } catch (error) {
    console.log(error, "nbbb");
    if (error?.response?.data?.password) {
      error?.response?.data?.password.map((item) => {
        toast.error(item);
      });
    } else if (error?.response?.data?.old_password?.old_password) {
      toast.error(error?.response?.data?.old_password?.old_password);
    } else {
      toast.error("Something went wrong!");
    }
    console.error("Error:", error);
  }
};

export const getProfile = async (user_id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axiosWithCredentials.get(`/accounts/retrieve-user/`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateProfile = async (values, { setSubmitting }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const { first_name, last_name, email, company_name, phone } = values;

    const payload = {
      first_name,
      last_name,
      email,
      company_name: company_name || null,
      phone: phone || null,
    };

    const response = await axiosWithCredentials.put(
      `/accounts/update-profile/${userData?.id}/`,
      payload
    );
    toast.success("Successfully Updated");
    console.log("Response:", response.data);

    setSubmitting(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
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
    toast.success("Reset link sent to your email");
    return response;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error sending password reset link");
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
    toast.success("Your password has been reset successfully");
    setSubmitting(false);
    return response;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
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

    const response = await axiosWithCredentials.post(
      "/update-address/",
      payload
    );
    toast.success("Successfuly Updated");
    console.log("Response:", response.data);

    setSubmitting(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }
};

export const uploadProfilePic = async (formData) => {
  console.log("Imge Data:", formData);
  try {
    if (!formData) {
      toast.error("No image selected.");
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
    toast.success("Successfully updated profile picture");
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Error uploading image");
  }
};

export const getDeliveryAddress = async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axiosWithCredentials.get(
      `/accounts/update-delivery-address/${userData?.id}/`
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateDeliveryAddress = async (values, { setSubmitting }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  try {
    const { stNumber, zCode, city, country } = values;

    const payload = {
      user: userData?.user_id,
      street_and_number: stNumber,
      zip_code: zCode,
      city,
      country: country || null,
    };

    const response = await axiosWithCredentials.put(
      `/accounts/update-delivery-address/${userData?.user_id}/`,
      payload
    );
    toast.success("Successfuly Updated");
    console.log("Response:", response.data);

    setSubmitting(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }
};

export const getInvoiceAddress = async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  try {
    const response = await axiosWithCredentials.get(
      `/accounts/update-invoice-address/${userData?.id}/`
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

// export const updateInvoiceAddress = async (values, { setSubmitting }) => {
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   try {
//     const { stNumber, zCode, city, country } = values;

//     const payload = {
//       user: userData?.id,
//       street_and_number: stNumber,
//       zip_code: zCode,
//       city,
//       country: country || null,
//     };

//     const response = await axiosWithCredentials.put(
//       `/accounts/update-invoice-address/${userData?.id}/`,
//       payload
//     );
//     toast.success("Successfuly Updated");
//     console.log("Response:", response.data);

//     setSubmitting(false);
//   } catch (error) {
//     console.error("Error:", error);
//     toast.error("Something went wrong!");
//   }
// };

export const updateInvoiceAddress = async (values) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  try {
    const payload = {
      user: userData?.id,
      street_and_number: values.street_and_number,
      zip_code: values.zip_code,
      city: values.city,
      country: values.country || "Netherland",
    };

    const response = await axiosWithCredentials.put(
      `/accounts/update-invoice-address/${userData?.id}/`,
      payload
    );
    toast.success("Successfully Updated");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
    throw error;
  }
};
export const updateDeliverAddress = async (values) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  try {
    const payload = {
      user: userData?.id,
      street_and_number: values.street_and_number,
      zip_code: values.zip_code,
      city: values.city,
      country: values.country || "Netherland",
    };

    const response = await axiosWithCredentials.put(
      `/accounts/update-delivery-address/${userData?.id}/`,
      payload
    );
    toast.success("Successfully Updated");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
    throw error;
  }
};
