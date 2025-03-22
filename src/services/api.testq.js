import { toast } from "react-toastify";
import api from "../config/axios";

// Get all tests
export const getTest = async () => {
    try {
        const response = await api.get("/api/manager/managertests");
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

export const getUserTest = async () => {
    try {
        const response = await api.get("/api/user/usertests");
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
        const response = await api.get(`/api/manager/managertests/${id}`); // Sử dụng path tương đối
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

// Get a test by ID
export const getUserTestById = async (id) => {
    try {
        const response = await api.get(`/api/user/usertests/${id}`); // Sử dụng path tương đối
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

        const response = await api.post("/api/manager/managertests/create", formData, {
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

export const submitAnswers = async (data) => {
    try {
        const response = await api.post("/api/user/usertests/submit-answers", data);
        toast.success("Test submitted successfully.");
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("Failed to submit test.");
            console.error("Error submitting test:", error);
        }
        return null;
    }
};

// Get user test results
export const getAllUserTestResults = async () => {
    try {
        const response = await api.get('/api/user/usertests/results');
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while fetching user test results.");
            console.error("Error fetching user test results:", error);
        }
        return null;
    }
};

export const getUserTestResults = async () => {
    try {
        const response = await api.get('/api/user/usertests/user-results');
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while fetching user test results.");
            console.error("Error fetching user test results:", error);
        }
        return null;
    }
};

// Get user test history by resultId
export const getUserTestHistory = async (resultId) => {
    try {
        const response = await api.get(`/api/user/usertests/history?resultId=${resultId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error("An error occurred while fetching user test history.");
            console.error("Error fetching user test history:", error);
        }
        return null;
    }
};

// Create test scoring for a specific test
export const createTestScoring = async (testId, scoringData) => {
    try {
        const response = await api.post(`/api/manager/managertests/${testId}/scoring`, scoringData);
        return response.data;
    } catch (error) {
        toast.error("Failed to create test scoring");
        return null;
    }
};

// Update test scoring by scoringId
export const updateTestScoring = async (scoringId, scoringData) => {
    try {
        const response = await api.put(`/api/manager/managertests/scoring/${scoringId}`, scoringData);
        return response.data;
    } catch (error) {
        toast.error("Failed to update test scoring");
        return null;
    }
};

// Get test scoring for a specific test
export const getTestScoring = async (testId) => {
    try {
        const response = await api.get(`/api/manager/managertests/${testId}/scoring`);
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch test scoring");
        return null;
    }
};

// Delete test scoring by scoringId
export const deleteTestScoring = async (scoringId) => {
    try {
        const response = await api.delete(`/api/manager/managertests/scoring/${scoringId}`);
        return response.data;
    } catch (error) {
        toast.error("Failed to delete test scoring");
        return null;
    }
};

// Delete a test by ID
export const deleteTest = async (id) => {
    try {
        const response = await api.delete(`/api/manager/managertests/${id}`);
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