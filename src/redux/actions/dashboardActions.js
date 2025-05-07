import { axiosWithCredentials } from "../../providers";

export const getStats = async () => {
  const response = await axiosWithCredentials.get(`/dashboard/`);
  return response.data;
};
export const getProducts = async () => {
  const response = await axiosWithCredentials.get(`/product`);
  return response.data;
};

//Get Home Wallpaper

export const getHomepageImage = async () => {
  const response = await axiosWithCredentials.get(`/images`);
  return response.data;
};

//Get Privacypolicy Wallpaper
export const getPrivacyPolicyImage = async () => {
  const response = await axiosWithCredentials.get(`/images/privacypolicy`);
  return response.data;
};

//Get tems and condition Wallpaper
export const getTermAndConditionsImage = async () => {
  const response = await axiosWithCredentials.get(`/images/termAndconditions`);
  return response.data;
};

//Get about Wallpaper
export const getAboutImage = async () => {
  const response = await axiosWithCredentials.get(`/images/about`);
  return response.data;
};

//Get Webshop Wallpaper
export const getWebshopImage = async () => {
  const response = await axiosWithCredentials.get(`/images/webshop`);
  return response.data;
};

//Get SignIn Wallpaper
export const getSigninImage = async () => {
  const response = await axiosWithCredentials.get(`/images/signin`);
  return response.data;
};

//Get Signup Wallpaper
export const getSignupImage = async () => {
  const response = await axiosWithCredentials.get(`/images/signup`);
  return response.data;
};

//Get Forgot Wallpaper
export const getForgotImage = async () => {
  const response = await axiosWithCredentials.get(`/images/forgot`);
  return response.data;
};

//Get Reset Wallpaper
export const getResetImage = async () => {
  const response = await axiosWithCredentials.get(`/images/reset`);
  return response.data;
};

// export const getAboutImage = async () => {
//   const response = await axiosWithCredentials.get(`/images/about`);
//   return response.data;
// };
// Home page

export const addHomepageImage = async (payload) => {
  const response = await axiosWithCredentials.post(`/images/`, payload);
  return response.data;
};

export const addHomepageProducts = async (payload) => {
  const response = await axiosWithCredentials.post(
    `/featured-products/`,
    payload
  );
  return response.data;
};

export const getHomepageProducts = async () => {
  const response = await axiosWithCredentials.get(`/featured-products`);
  return response.data;
};

export const addOurValues = async (payload) => {
  const response = await axiosWithCredentials.post(`/our-value/`, payload);
  return response.data;
};

export const getOurValues = async () => {
  const response = await axiosWithCredentials.get(`/our-value`);
  return response.data;
};

export const addOurAssortment = async (payload) => {
  const response = await axiosWithCredentials.post(`/our-assortment/`, payload);
  return response.data;
};

export const getOurAssortment = async () => {
  const response = await axiosWithCredentials.get(`/our-assortment`);
  return response.data;
};

export const createWhyHoutTotal = async (payload) => {
  const response = await axiosWithCredentials.post(`/why-hout-total/`, payload);
  return response.data;
};

export const fetchWhyHoutTotal = async () => {
  const response = await axiosWithCredentials.get(`/why-hout-total`);
  return response.data;
};

export const addPrivacyPolicies = async (payload) => {
  const response = await axiosWithCredentials.post(`/privacy-policy/`, payload);
  return response.data;
};

export const getPrivacyPolicy = async () => {
  const response = await axiosWithCredentials.get(`/privacy-policy`);
  return response.data;
};

export const addTermsCondition = async (payload) => {
  const response = await axiosWithCredentials.post(
    `/terms-and-conditions/`,
    payload
  );
  return response.data;
};

export const getTermsCondition = async () => {
  const response = await axiosWithCredentials.get(`/terms-and-conditions`);
  return response.data;
};

export const updateCategories = async (payload) => {
  const response = await axiosWithCredentials.post(
    `/product/category-choice-update/`,
    payload
  );
  return response.data;
};

export const addAboutUs = async (payload) => {
  const response = await axiosWithCredentials.post(`/about-us/`, payload);
  return response.data;
};

export const getAboutUs = async () => {
  const response = await axiosWithCredentials.get(`/about-us`);
  return response.data;
};

export const addFaqs = async (payload) => {
  const response = await axiosWithCredentials.post(`/faqs/`, payload);
  return response.data;
};

export const getFaqs = async () => {
  const response = await axiosWithCredentials.get("/faqs");
  return response.data;
};
