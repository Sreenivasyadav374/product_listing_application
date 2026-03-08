import { useFetchWithRetry } from "./useFetchWithRetry";
import {fetchProducts} from '../services/productService';

export const useProducts = (category) => {
  const { data, loading, error, retrying } = useFetchWithRetry(
    (setRetrying) => fetchProducts(category, setRetrying),
    [category]
  );

  return {
    products: data?.products || [],
    total: data?.total || 0,
    loading,
    error,
    retrying,
  };
};