import { toast } from "react-toastify";
import api from "../config/axios";

// Get all tests
export const getTest = async () => {
    try {
        const response = await api.get("tests");
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while fetching tests.");
            console.error("Error fetching tests:", error);
        }
        return null;
    }
};

// Get a test by ID
export const getTestById = async (id) => {
    try {
        const response = await api.get(`tests/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while fetching the test.");
            console.error("Error fetching test:", error);
        }
        return null;
    }
};

// Create a new test by uploading a file
export const createTest = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("tests/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.success("Test created successfully");
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while creating the test.");
            console.error("Error creating test:", error);
        }
        return null;
    }
};

// Delete a test by ID
export const deleteTest = async (id) => {
    try {
        const response = await api.delete(`tests/${id}`);
        toast.success(`Deleted test with ID: ${id}`); // Updated success message
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while deleting the test.");
            console.error("Error deleting test:", error);
        }
        return null;
    }
};