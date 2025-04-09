import api from "../config/axios";
import { toast } from "react-toastify";

export const getPsychologistSlots = async (psychologistId) => {
    try {
        const response = await api.get("/api/psychologist/slots", {
            params: { psychologistId },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to fetch slots");
        return [];
    }
};

export const createSlot = async (slotData) => {
    try {
        const { date, startTime, endTime, availabilityStatus, psychologistId } = slotData;
        const response = await api.post("/api/psychologist/slots/create", null, {
            params: {
                psychologistId,
                date,
                startTime,
                endTime,
                availabilityStatus,
            },
        });
        toast.success("Slot created successfully");
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data || "Failed to create slot";
        toast.error(errorMessage);
        throw error;
    }
};

export const updateSlot = async (slotData, slotId) => {
    try {
        const { date, startTime, endTime, availabilityStatus, psychologistId } = slotData;
        const response = await api.put("/api/psychologist/slots/update", null, {
            params: {
                psychologistId,
                slotId,
                date,
                startTime,
                endTime,
                availabilityStatus,
            },
        });
        toast.success("Slot updated successfully");
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data || "Failed to update slot";
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteSlot = async (psychologistId, slotId) => {
    try {
        const response = await api.delete("/api/psychologist/slots/delete", {
            params: { psychologistId, slotId },
        });
        toast.success("Slot deleted successfully");
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to delete slot");
        throw error;
    }
};