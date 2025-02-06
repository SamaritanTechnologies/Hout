import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";

export const getStats = async () => {
  try {
    const response = await axiosWithCredentials.get(`/dashboard/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
export const getProducts = async () => {
  try {
    const response = await axiosWithCredentials.get(`/product/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const getHomepageImage = async () => {
  try {
    const response = await axiosWithCredentials.get(`/images/`);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching homepage image", error);
    throw error;
  }
}

export const addHomepageImage = async (fileInput) => {
  const formData = new FormData();
  formData.append("title", "homepage");
  formData.append("image", fileInput.files[0]);

  try {
    const response = await axiosWithCredentials.post(`/images/`, formData);
    toast.success("Image added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add image.");
    console.error("Error adding image:", error);
    throw error;
  }
};

export const addHomepageProducts = async (payload) => {
  try {
    const response = await axiosWithCredentials.post(`/web-products/`, payload);
    return response.data;
  } catch (error) {
    toast.error("Failed to add products.");
    console.error("Error adding products:", error);
    throw error;
  }
};

export const getHomepageProducts = async () => {
  try {
    const response = await axiosWithCredentials.get(`/web-products/`);
    return response.data;
  }
  catch (error) {
    toast.error("Error fetching homepage image", error);
    throw error;
  }
};