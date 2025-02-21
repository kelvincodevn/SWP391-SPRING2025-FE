import { toast } from "react-toastify";
import api from "../config/axios";

// Get all surveys
export const getSurvey = async () => {
    try {
        const response = await api.get("surveys"); // Update endpoint if needed
        return response.data;
    } catch (error) {
        handleApiError(error, "fetching surveys");
        return null;
    }
};

// Create or update a survey
export const createSurvey = async (survey, id = null) => {
    try {
        let response;
        if (id) {
            response = await api.put(`surveys/${id}`, survey); // PUT for update
        } else {
            response = await api.post("surveys", survey); // POST for create
        }

        toast.success(id ? "Survey updated successfully" : "Survey created successfully");
        return response.data;
    } catch (error) {
        handleApiError(error, "creating/updating survey");
        return null;
    }
};

// Delete a survey
export const deleteSurvey = async (id) => {
    try {
        const response = await api.delete(`surveys/${id}`);

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
