import { axiosApi } from "../../providers";

export const getHomepageImage = async () => {
  const response = await axiosApi.get(`/images/`);
  return response.data;
}

export const getFeaturedProducts = async () => {
  const response =  await axiosApi.get(`/featured-products-detail`);
  return response.data;
}

export const getOurValues = async () => {
  const response =  await axiosApi.get(`/our-values`);
  return response.data;
}

export const getOurAssortment = async () => {
  const response = await axiosApi.get(`/our-assortment`);
  return response.data;
}

export const getWhyHoutTotal = async () => {
  const response = await axiosApi.get(`/why-hout-total`);
  return response.data;
}

export const submitContactForm = async (payload) => {
  const response = await axiosApi.post(`/contact-form/`,payload);
  return response.data;
}

export const getOpeningHours = async (place = "Hout Totaal") => {
  const response = await axiosApi.get(`/google-opening-hours/?place=${encodeURIComponent(place)}`);
  return response.data;
}

export const subscribeToNewsletter = async (payload) => {
  const response = await axiosApi.post(`/hubspot_subscribe/`, payload);
  return response.data;
};

export const getPrivacyPolicy = async () => {
  const response = await  axiosApi.get("/privacy-policy/");
  return response.data;
};

export const getTermsCondition = async () => {
  const response = await axiosApi.get(`/terms-and-conditions`);
  return response.data;
};


export const getFaqs = async () => {
  const response = await axiosApi.get(`/faqs/`);
  return response.data;
}

export const getProducts = async (queryParams = "") => {
  const response = await axiosApi.get(`/product/?${queryParams}`);
  return response.data;
}

export const getProductsById = async (product_id) => {
  const response = await axiosApi.get(`/product/${product_id}`);
  return response.data;
};