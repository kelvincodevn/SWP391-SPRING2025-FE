import { toast } from "react-toastify";
import api from "../config/axios";

// Get all tests
export const getTest = async () => {
    try {
        const response = await api.get("tests"); // Update the API endpoint to "tests" or your actual endpoint
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data); // Display error from the server if available
        } else {
            toast.error("An error occurred while fetching tests."); // Generic error message
            console.error("Error fetching tests:", error); // Log the full error for debugging
        }
        return null; // or throw error if you want the component to handle it
    }
};

// Create a new test
export const createTest = async (test, id = null) => { // Added id parameter for updates
    try {
        let response;
        if (id) {
            // Update existing test
            response = await api.put(`tests/${id}`, test); // Use PUT method for updates
        } else {
            // Create new test
            response = await api.post("tests", test);
        }

        // Toast success message AFTER successful API call
        toast.success(id ? "Test updated successfully" : "Test created successfully"); // Conditional message
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while creating/updating the test.");
            console.error("Error creating/updating test:", error);
        }
        return null;
    }
};

// Delete a test
export const deleteTest = async (id) => {
    try {
        const response = await api.delete(`tests/${id}`);
        // Toast success message AFTER successful API call
        toast.success("Test deleted successfully");
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