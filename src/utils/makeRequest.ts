import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { logout } from "@/redux/actions/authActions";

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let queue: { resolve: () => void; reject: (e: any) => void }[] = [];

const processQueue = (error: any = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  queue = [];
};

// Axios Response Interceptor
makeRequest.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve: () => resolve(makeRequest(original)), reject });
        });
      }

      isRefreshing = true;
      try {
        // Call refresh endpoint (cookies automatically sent)
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        processQueue();
        return makeRequest(original); // retry
      } catch (e) {
        processQueue(e);
        store.dispatch(logout()); // log user out
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
