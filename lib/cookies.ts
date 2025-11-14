"use server";

import { getCookie, setCookie, deleteCookie } from "cookies-next";

// Set a cookie (for user preferences, theme, etc.)
export const setUserPreference = (name: string, value: string) => {
  setCookie(name, value, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
};

// Get a cookie value
export const getUserPreference = (name: string): string | null => {
  const cookie = getCookie(name);
  return cookie ? String(cookie) : null;
};

// Delete a cookie
export const removeUserPreference = (name: string) => {
  deleteCookie(name);
};
