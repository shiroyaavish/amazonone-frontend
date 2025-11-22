// lib/axios.ts (Advanced Version)
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";  // <-- add this

// Types
interface ApiError {
    message: string;
    status: number;
    data?: unknown;
}

interface RetryConfig extends InternalAxiosRequestConfig {
    url: any;
    headers: any;
    _retry?: boolean;
}

// Create axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },

    // 🔥 FIX: Serialize arrays as repeated params
    // category=['a','b'] => category=a&category=b
    paramsSerializer: {
        serialize: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
    },
});

// Helper: Get auth token
const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
};

// Helper: Remove auth token
const removeToken = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    }
};

// Helper: Refresh token
const refreshAuthToken = async (): Promise<string | null> => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return null;

        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
            { refreshToken }
        );

        localStorage.setItem("token", data.accessToken);
        return data.accessToken;
    } catch {
        removeToken();
        return null;
    }
};

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Prevent GET caching
        if (config.method === "get") {
            config.params = {
                ...config.params,
                _t: Date.now(),
            };
        }

        if (process.env.NODE_ENV === "development") {
            console.log(process.env.NODE_ENV)
            console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, {
                params: config.params,
                data: config.data,
            });
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        if (process.env.NODE_ENV === "development") {
            console.log(`✅ [${response.status}] ${response.config.url}`);
        }
        return response;
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as RetryConfig;

        // Handle 401 refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newToken = await refreshAuthToken();
            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            }

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }

        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || "An error occurred",
            status: error.response?.status || 500,
            data: error.response?.data,
        };

        if (process.env.NODE_ENV === "development") {
            console.error(`❌ [${apiError.status}] ${originalRequest?.url}`, apiError);
        }

        return Promise.reject(apiError);
    }
);

// API Helper Methods
export const apiHelpers = {
    get: <T>(url: string, params?: object) =>
        api.get<T>(url, { params }).then((res) => res.data),

    post: <T>(url: string, data?: object) =>
        api.post<T>(url, data).then((res) => res.data),

    put: <T>(url: string, data?: object) =>
        api.put<T>(url, data).then((res) => res.data),

    patch: <T>(url: string, data?: object) =>
        api.patch<T>(url, data).then((res) => res.data),

    delete: <T>(url: string) =>
        api.delete<T>(url).then((res) => res.data),
};

export default api;
