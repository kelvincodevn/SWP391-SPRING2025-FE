import { toast } from "react-toastify";
import api from "../config/axios";

// Get all surveys
export const getSurvey = async () => {
    try {
        const response = await api.get("/api/manager/surveys");
        return response.data;
    } catch (error) {
        handleApiError(error, "fetching surveys");
        return null;
    }
};

// Create a survey and send it to emails
export const createAndSendSurvey = async (survey) => {
    try {
        const response = await api.post("/api/manager/survey/send", survey);

        toast.success("Survey emails sent successfully.");
        return response.data;
    } catch (error) {
        handleApiError(error, "creating and sending survey");
        return null;
    }
};

// Delete a survey
export const deleteSurvey = async (id) => {
    try {
        const response = await api.delete(`/api/manager/surveys/${id}`);

        toast.success("Survey deleted successfully");
        return response.data;
    } catch (error) {
        handleApiError(error, "deleting survey");
        return null;
    }
};

// Helper function to handle API errors consistently
const handleApiError = (error, operation) => {
    if (error.response && error.response.data) {
        toast.error(error.response.data);
    } else {
        toast.error(`An error occurred while ${operation}.`);
        console.error(`Error ${operation}:`, error);
    }
};