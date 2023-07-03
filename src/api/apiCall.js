import axiosInstance from "./axiosConfig";

export const postRequest = async ({ url, data }) => {
  const response = await axiosInstance.post(url, data);
  return response?.data || response;
};

export const getRequest = async ({ url }) => {
  const response = await axiosInstance.get(url);
  return response?.data || response;
};
