import { useEffect, useState } from "react";

export const useFetchWithRetry = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFn(setRetrying);

        if (active) {
          setData(result);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
          setRetrying(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, deps);

  return { data, loading, error, retrying };
};