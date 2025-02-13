import { axiosApi } from "../../providers";

export const getOurValues = async () => {
  const response =  await axiosApi.get(`/our-values`);
  return response.data;
}

export const getProducts = async () => {
  const response =  await axiosApi.get(`/product`);
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