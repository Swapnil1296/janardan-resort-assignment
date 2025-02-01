import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};
