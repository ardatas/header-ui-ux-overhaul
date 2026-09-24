import { useEffect } from "react";

export type Appearance = "dark" | "light";
const key = "header-appearance";

export function readAppearance(fallback: Appearance = "dark"): Appearance {
  try {
    const saved = localStorage.getItem(key);
    return saved === "dark" || saved === "light" ? saved : fallback;
  } catch {
    return fallback;
  }
}

export function useApplyAppearance(appearance: Appearance) {
  useEffect(() => {
    document.documentElement.dataset.theme = appearance;
    try {
      localStorage.setItem(key, appearance);
    } catch {
      // Switching still works for the current page when storage is unavailable.
    }
  }, [appearance]);
}
