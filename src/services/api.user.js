import api from "../config/axios";
import { toast } from "react-toastify";

// Get all users
export const getUser = async () => {
    try {
        const response = await api.get("Manager"); // Updated endpoint
        return response.data;
    } catch (error) {
        handleApiError(error, "fetching users");
        return null;
    }
};

// Create a new user
export const createUser = async (user) => {
    try {
        const response = await api.post("Manager", user); // Updated endpoint
        toast.success("User created successfully");
        return response.data;
    } catch (error) {
        handleApiError(error, "creating user");
        return null;
    }
};

// Update an existing user
export const updateUser = async (user, id) => {
    try {
        const response = await api.put(`Manager/${id}`, user); // Updated endpoint
        toast.success("User updated successfully");
        return response.data;
    } catch (error) {
        handleApiError(error, "updating user");
        return null;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`Manager/${id}`); // Updated endpoint
        toast.success("User deleted successfully");
        return response.data;
    } catch (error) {
        handleApiError(error, "deleting user");
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