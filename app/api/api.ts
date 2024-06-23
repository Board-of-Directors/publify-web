import axios, {AxiosError} from "axios";
import {jwtDecode} from "jwt-decode";

export const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials : true
});

const revalidateToken = async () => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/refresh`,
        null, {
            withCredentials: true
        })

    if (response.data.result !== null) {
        sessionStorage.setItem("ACCESS_TOKEN", response.data.result.accessToken);
    } else console.log("REFRESH ERROR", response.data.exception?.message);
}

api.interceptors.request.use(config => {
    const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
});

api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true
        await revalidateToken();
        return api(originalRequest)
    } else return Promise.reject(error.response.data.exception.message);
});