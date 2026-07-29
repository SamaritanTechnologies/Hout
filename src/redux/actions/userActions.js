import { axiosApi, axiosWithCredentials } from "../../providers";

export const getHomepageImage = async () => {
  const response = await axiosApi.get(`/images/`);
  return response.data;
};

export const getFeaturedProducts = async (config = {}) => {
  const response = await axiosWithCredentials.get(
    `/featured-products-detail/`,
    config
  );
  return response.data;
};

export const getOurValues = async () => {
  const response = await axiosApi.get(`/our-values`);
  return response.data;
};

export const getOurAssortment = async () => {
  const response = await axiosApi.get(`/our-assortment`);
  return response.data;
};

export const getWhyHoutTotal = async () => {
  const response = await axiosApi.get(`/why-hout-total`);
  return response.data;
};

export const submitContactForm = async (payload) => {
  const response = await axiosApi.post(`/contact-form/`, payload);
  return response.data;
};

export const getOpeningHours = async (lang = "en", place = "Hout Totaal") => {
  const response = await axiosApi.get(
    `/google-opening-hours/?place=${encodeURIComponent(
      place
    )}&lang=${encodeURIComponent(lang)}`
  );
  return response.data;
};

export const subscribeToNewsletter = async (payload) => {
  const response = await axiosApi.post(`/hubspot_subscribe/`, payload);
  return response.data;
};

export const getPrivacyPolicy = async () => {
  const response = await axiosApi.get("/privacy-policy/");
  return response.data;
};

export const getTermsCondition = async () => {
  const response = await axiosApi.get(`/terms-and-conditions`);
  return response.data;
};

export const getFaqs = async () => {
  const response = await axiosApi.get(`/faqs/`);
  return response.data;
};

export const getProducts = async (queryParams = "", config = {}) => {
  const response = await axiosWithCredentials.get(
    `/product/?${queryParams}`,
    config
  );
  return response.data;
};

export const getProductsById = async (product_id, config = {}) => {
  const response = await axiosWithCredentials.get(
    `/product/${product_id}/`,
    config
  );
  return response.data;
};

export const getRelatedProducts = async (product_id, config = {}) => {
  const response = await axiosWithCredentials.get(
    `/products/${product_id}/related/`,
    config
  );
  return response.data;
};