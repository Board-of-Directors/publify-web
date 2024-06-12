import axios from "axios";

const api = axios.create({
    baseURL : "http://158.160.10.240:8080",
    withCredentials : true
})

export default api