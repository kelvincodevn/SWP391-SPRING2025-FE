import { toast } from "react-toastify";
import api from "../config/axios";

export const createSurveyFromExcel = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/api/manager/survey/create", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Survey created successfully");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to create survey";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const getAllSurveys = async () => {
    try {
        const response = await api.get("/api/user/survey");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to fetch surveys";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const getSurveyById = async (id) => {
    try {
        const response = await api.get(`/api/user/survey/${id}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to fetch survey details";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const submitSurveyResponse = async (id, responseData) => {
    try {
        const response = await api.post(`/api/user/survey/${id}/submit`, responseData);
        toast.success("Survey submitted successfully");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to submit survey";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const getUserSurveyHistory = async () => {
    try {
        const response = await api.get("/api/user/survey/history");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to fetch survey history";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const getSurveyHistoryDetails = async (responseId) => {
    try {
        const response = await api.get(`/api/user/survey/history/${responseId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to fetch survey history details";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

// Thêm hàm getSurveyDetails để lấy chi tiết survey cho manager
export const getSurveyDetails = async (surveyId) => {
    try {
        const response = await api.get(`/api/manager/survey/${surveyId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to fetch survey details";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};