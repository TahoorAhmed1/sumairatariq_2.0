import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

API.GetProductInfo = (id) => {
  if (id) {
    return API.get(`/GetProductInfoWebsite/${id}`);
  }
};
API.SliderImages = () => {
  return API.get(`/GetAllBannerImages`);
};

API.SliderResImages = () => {
  return API.get(`/GetAllResBannerImages`);
};

API.GetSliderProducts = () => {
  return API.get(`/GetSliderProducts`);
};

API.GetAllCategoriesWithImages = () => {
  return API.get(`/GetAllCategoriesWithImages`);
};

API.getSize = () => {
  return API.get(`/GetAllSizes`);
};

API.getAllCategories = () => {
  return API.get(`/GetAllCategories`);
};

API.createGuest = (payload) => {
  return API.post(`/CreateGuest`, payload);
};
API.updatePassword = (payload) => {
  return API.post(`/UpdatePassword`, payload);
};
API.updateCustomer = (payload) => {
  return API.post(`/UpdateCustomer`, payload);
};

API.createSale = (payload) => {
  return API.post(`/CreateSale`, payload);
};
API.getCustomerSale = (id) => {
  return API.get(`/GetCustomerSale/${id}`);
};
API.getSaleInfo = (id) => {
  return API.get(`/GetSaleInfo/${id}`);
};
API.getCustomerInfo = (id) => {
  return API.get(`/GetCustomerInfo/${id}`);
};

API.getAllMultipleProducts = (payload) => {
  return API.post(`/getMultipleItems`, payload);
};
API.resetPassword = (payload) => {
  return API.post(`/reset-password`, payload);
};

API.GetFilterProduct = ({
  color,
  category,
  subcategory,
  tags,
  minPrice,
  maxPrice,
  page,
}) => {
  return API.get(
    `/filterProduct?${color ? `Color=${color}` : ""}${
      category ? `&Category=${category}` : ""
    }${subcategory ? `&SubCategory=${subcategory}` : ""}${
      tags ? `&size=${tags}` : ""
    }${minPrice ? `&minPrice=${minPrice}` : ""}${
      maxPrice ? `&maxPrice=${maxPrice}` : ""
    }&page=${page}&pageSize=9`
  );
};

API.register = (payload) => {
  return API.post(`/SignupCustomer`, payload);
};
API.login = (payload) => {
  return API.post(`/LoginCustomer`, payload);
};
API.forgetPassword = (payload) => {
  return API.post(`/forget-password`, payload);
};
API.subscribeByEmail = (payload) => {
  return API.post(`/SubscribeByEmail`, payload);
};
API.getReviews = (productId) => {
  return API.get(`/GetRatingInfo/${productId}`);
};
API.createRating = (payload) => {
  return API.post(`/CreateRating`, payload);
};
API.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");
    config.headers.token = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export { API };
