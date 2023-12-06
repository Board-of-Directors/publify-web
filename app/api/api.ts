import axios from "axios";

const api = axios.create({
    baseURL : "http://80.89.192.250:8080",
    withCredentials : true
})

export default api