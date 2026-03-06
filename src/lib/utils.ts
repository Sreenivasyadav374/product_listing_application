import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUniqueBrands = (products) => {
  return [...new Set(products.map((p) => p.brand).filter(Boolean))].sort();
};

export const filterProducts = (
  products,
  minPrice,
  maxPrice,
  selectedBrands
) => {
  return products.filter((p) => {
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
    return true;
  });
};

export const fetchWithRetry = async (
  url,
  options = {},
  retries = 3,
  delay = 1000,
  onRetry
) => {
  const res = await fetch(url, options);

  if (res.status === 429 && retries > 0) {
    onRetry?.(true);

    await new Promise((resolve) => setTimeout(resolve, delay));

    return fetchWithRetry(url, options, retries - 1, delay * 2, onRetry);
  }

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;

    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}

    throw new Error(message);
  }

  onRetry?.(false);

  return res.json();
};