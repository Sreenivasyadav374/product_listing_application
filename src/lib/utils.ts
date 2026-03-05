import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUniqueBrands = (products) => {
  return [...new Set(products.map((p) => p.brand).filter(Boolean))].sort();
};