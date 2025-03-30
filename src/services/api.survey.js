import { toast } from "react-toastify";
import api from "../config/axios";

export const createSurvey = async (surveyData) => {
    try {
        const response = await api.post("/api/manager/survey/create", surveyData);
        toast.success("Survey created successfully");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to create survey";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const updateSurvey = async (id, surveyData) => {
    try {
        const response = await api.put(`/api/manager/survey/${id}`, surveyData);
        toast.success("Survey updated successfully");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to update survey";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const deleteSurvey = async (id) => {
    try {
        const response = await api.delete(`/api/manager/survey/${id}`);
        toast.success("Survey deleted successfully");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to delete survey";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const getAllSurveys = async () => {
    try {
        const response = await api.get("/api/manager/survey");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to fetch surveys";
        toast.error(errorMsg);
        throw new Error(errorMsg);
    }
};

export const getActiveSurveys = async () => {
    try {
        const response = await api.get("/api/user/survey/active");
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data || "Failed to fetch active surveys";
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