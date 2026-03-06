import { getProductById } from "../services/productService";
import { useFetchWithRetry } from "./useFetchWithRetry";

export const useProduct = (id) => {
  const { data, loading, error, retrying } = useFetchWithRetry(
    (setRetrying) => getProductById(id, setRetrying),
    [id]
  );

  return {
    product: data,
    loading,
    error,
    retrying,
  };
};