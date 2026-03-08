import { fetchWithRetry } from "../lib/utils";

export const getProductById = async (id,onRetry) => {
  return fetchWithRetry(`/api/products/${id}`,{},3,1000,onRetry);
};

export const fetchProducts = async (category, onRetry) => {
  const url = category
    ? `/api/products/category/${category}?limit=100`
    : `/api/products?limit=100`;

  return fetchWithRetry(url, {}, 3, 1000, onRetry);
};