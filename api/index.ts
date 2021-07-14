import axios from "axios";

const api = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_PROD_URL // For Temporary use
      : process.env.NEXT_PUBLIC_PROD_URL,
  withCredentials: false,
  headers: getHeaders(),
});

api.defaults.headers.common = getAuthHeader();

export default api;

function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
  };

  return { ...headers };
}

export function getAuthHeader() {
  if (typeof window !== "undefined") {
    const token: string | null = localStorage.getItem("access-token");

    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return {};
}
