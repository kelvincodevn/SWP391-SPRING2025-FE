import api from "../config/axios";
import { toast } from "react-toastify";

// Create a booking
export const createBooking = async (userId, bookingRequest) => {
    try {
      const response = await api.post(`/api/bookings/create?userId=${userId}`, bookingRequest);
      return response.data;
    } catch (error) {
      handleApiError(error, "creating booking");
      return null;
    }
  };

export const getUserBookings = async (userId) => {
    try {
        const response = await api.get(`/api/bookings/user`, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to fetch bookings");
        return [];
    }
};

export const getPsychologistBookings = async (psychologistId) => {
    try {
        const response = await api.get(`/api/bookings/psychologist`, {
            params: { psychologistId },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to fetch bookings");
        return [];
    }
};

export const cancelBooking = async (userId, bookingId) => {
    try {
        const response = await api.post(`/api/bookings/${bookingId}/cancel`, null, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to cancel booking");
        return null;
    }
};

// Thêm API để lấy chi tiết booking
export const getBookingDetails = async (bookingId) => {
    try {
        const response = await api.get(`/api/bookings/${bookingId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to fetch booking details");
        return null;
    }
};

export const completeBooking = async (psychologistId, bookingId, file) => {
    try {
        const formData = new FormData();
        formData.append("bookingId", bookingId);
        formData.append("file", file);

        const response = await api.post(`/api/psychologist/bookings/complete`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, "completing booking");
        return null;
    }
};

export const confirmBooking = async (userId, bookingId) => {
    try {
        const response = await api.post(`/api/bookings/${bookingId}/confirm`, null, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to confirm booking");
        return null;
    }
};

export const getRecommendedPsychologists = async (userId) => {
    try {
        const response = await api.get(`/api/bookings/recommend-psychologists`, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to fetch recommended psychologists");
        return [];
    }
};


// Helper function for consistent error handling
const handleApiError = (error, operation) => {
    if (error.response && error.response.data) {
      toast.error(`Error ${operation}: ${error.response.data.error || error.response.data}`);
    } else {
      toast.error(`An error occurred while ${operation}.`);
      console.error(`Error ${operation}:`, error);
    }
  };