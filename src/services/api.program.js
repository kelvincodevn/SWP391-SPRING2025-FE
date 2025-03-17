import api from "../config/axios";
import { toast } from "react-toastify";

// Get all programs (filtered by isDeleted: false)
export const getProgram = async () => {
    try {
        const response = await api.get("/api/manager/program");
        return response.data;
    } catch (error) {
        handleApiError(error, "fetching programs");
        return null;
    }
};

// Create or update a program (combined function)
export const createProgram = async (program, id = null) => {
    try {
        let response;
        if (id) {
            response = await api.put(`/api/manager/program/${id}`, program); // PUT for update
        } else {
            response = await api.post("/api/manager/program", program); // POST for create
        }

        toast.success(id ? "Program updated successfully" : "Program created successfully");
        return response.data;
    } catch (error) {
        handleApiError(error, "creating/updating program");
        return null;
    }
};

// Delete a program (sets isDeleted: true)
export const deleteProgram = async (id) => {
    try {
        const response = await api.put(`/api/manager/program/${id}`, { isDeleted: true }); // PUT to update isDeleted
        toast.success("Program deleted successfully");
        return response.data;
    } catch (error) {
        handleApiError(error, "deleting program");
        return null;
    }
};

// Helper function for consistent error handling
const handleApiError = (error, operation) => {
    if (error.response && error.response.data) {
        toast.error(error.response.data);
    } else {
        toast.error(`An error occurred while ${operation}.`);
        console.error(`Error ${operation}:`, error);
    }
};