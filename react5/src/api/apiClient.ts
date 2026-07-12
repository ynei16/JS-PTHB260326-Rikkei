import axios, { AxiosInstance } from "axios";

function cleanParams(params: any) {
  if (!params || typeof params !== "object") return undefined;
  const out: any = {};
  Object.keys(params).forEach((k) => {
    const v = params[k];
    if (v !== undefined && v !== null) out[k] = v;
  });
  return Object.keys(out).length ? out : undefined;
}

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3004",
  headers: { "Content-Type": "application/json" },
});

// Ensure response interceptor returns data directly
instance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
);

const apiClient = {
  get: async <T = any>(url: string, params?: any): Promise<T> => {
    return instance.get<T>(url, {
      params: cleanParams(params),
    } as any) as Promise<T>;
  },
  post: async <T = any>(url: string, data?: any): Promise<T> => {
    return instance.post<T>(url, data) as Promise<T>;
  },
  put: async <T = any>(url: string, data?: any): Promise<T> => {
    return instance.put<T>(url, data) as Promise<T>;
  },
  patch: async <T = any>(url: string, data?: any): Promise<T> => {
    return instance.patch<T>(url, data) as Promise<T>;
  },
  remove: async <T = any>(url: string): Promise<T> => {
    return instance.delete<T>(url) as Promise<T>;
  },
};

export default apiClient;
