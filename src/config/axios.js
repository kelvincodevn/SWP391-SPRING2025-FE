// import axios from "axios";

// const api = axios.create({
//     // baseURL: "http://14.225.207.163:8080/api/"
//     baseURL: "http://localhost:8082/api/"
// });
// //gắn cái link API của project nhóm mình vào (do là cái deploy lên server nó hơi lỗi xài tạm localhost vẫn ok)

// api.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; 
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

// export default api;

import axios from "axios";
import { jwtDecode } from "jwt-decode"

// const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8082/api/";

const api = axios.create({
    baseURL: "http://localhost:8082"
});

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token && token !== "null" && token !== "undefined") {
            config.headers.Authorization = `Bearer ${token}`;
            const decodedToken = jwtDecode(token);
            config.headers.psychologistId = decodedToken.userID || decodedToken.psychologistId; // Giả sử userID hoặc psychologistId nằm trong token
        }
        return config;
    },
    function (error) {
        console.error("Axios request error:", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            // window.location.href = "/login";
            console.error("Token expired:", error);
        }
        return Promise.reject(error);
    }
);

// Hàm tiện ích để lấy psychologistId từ token
export const getPsychologistIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
        const decodedToken = jwtDecode(token);
        return decodedToken.userID || decodedToken.psychologistId; // Điều chỉnh tên trường dựa trên payload token
    }
    return null;
};

export default api;