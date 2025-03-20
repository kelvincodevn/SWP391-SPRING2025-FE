// api.program.js
import api from "../config/axios";
import { toast } from "react-toastify";

// Get all programs
export const getProgram = async () => {
    try {
        const response = await api.get("/api/manager/program");
        return response.data;
    } catch (error) {
        handleApiError(error, "fetching programs");
        return [];
    }
};

// Get program details
export const getProgramDetails = async (id) => {
    try {
        const response = await api.get(`/api/manager/program/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error, "fetching program details");
        return null;
    }
};

// Create program
export const createProgram = async (program) => {
    try {
        const response = await api.post("/api/manager/program", program);
        return response.data;
    } catch (error) {
        handleApiError(error, "creating program");
        return null;
    }
};

// Update program
export const updateProgram = async (id, program) => {
    try {
        const response = await api.put(`/api/manager/program/${id}`, program);
        return response.data;
    } catch (error) {
        handleApiError(error, "updating program");
        return null;
    }
};

// Delete program
export const deleteProgram = async (id) => {
    try {
        const response = await api.delete(`/api/manager/program/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error, "deleting program");
        return null;
    }
};

// Error handling
const handleApiError = (error, operation) => {
    if (error.response && error.response.data) {
        toast.error(error.response.data);
    } else {
        toast.error(`An error occurred while ${operation}.`);
        console.error(`Error ${operation}:`, error);
    }
};