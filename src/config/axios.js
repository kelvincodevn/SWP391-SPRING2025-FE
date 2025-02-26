import axios from "axios";

const api = axios.create({
    // baseURL: "http://14.225.207.163:8080/api/"
    baseURL: "http://localhost:8084/api/"
});
//gắn cái link API của project nhóm mình vào (do là cái deploy lên server nó hơi lỗi xài tạm localhost vẫn ok)

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default api;