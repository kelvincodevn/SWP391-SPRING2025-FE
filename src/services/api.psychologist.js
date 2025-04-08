import api from "../config/axios";
import { toast } from "react-toastify";

export const getAllPsychologists = async () => {
    try {
        const response = await api.get("/api/psychologists");
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to fetch psychologists");
        return [];
    }
};

export const getPsychologistSlots = async (psychologistId) => {
    try {
        const response = await api.get("/api/slots/available", {
            params: { psychologistId },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data || "Failed to fetch slots");
        return [];
    }
};

export const getPsychologistStats = async (psychologistId) => {
    try {
      const response = await api.get(`/api/psychologists/${psychologistId}/stats`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || "Failed to fetch psychologist stats");
      throw error;
    }
  };

  export const getPsychologistClients = async (psychologistId) => {
    try {
      const response = await api.get(`/api/psychologists/${psychologistId}/clients`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || "Failed to fetch psychologist clients");
      throw error;
    }
  };

  export const getPsychologistProfile = async () => {
    try {
      const response = await api.get(`/api/psychologists/profile`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || "Failed to fetch psychologist profile");
      throw error;
    }
  };

  export const updatePsychologistProfile = async (psychologistData) => {
    try {
      const response = await api.put(`/api/psychologists/profile`, psychologistData);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || "Failed to update psychologist profile");
      throw error;
    }
  };

  // Thêm hàm createPsychologist
export const createPsychologist = async (psychologistData) => {
  try {
      const response = await api.post("/api/manager/create-psychologist", psychologistData);
      toast.success("Psychologist created successfully");
      return response.data;
  } catch (error) {
      toast.error(error.response?.data || "Failed to create psychologist");
      throw error;
  }
};

// Thêm hàm updatePsychologist (nếu cần)
export const updatePsychologist = async (psychologistId, psychologistData) => {
  try {
      const response = await api.put(`/api/manager/${psychologistId}`, psychologistData);
      toast.success("Psychologist updated successfully");
      return response.data;
  } catch (error) {
      toast.error(error.response?.data || "Failed to update psychologist");
      throw error;
  }
};

// Cập nhật hàm deletePsychologist để gọi endpoint mới
export const deletePsychologist = async (psychologistId) => {
  try {
      const response = await api.delete(`/api/manager/psychologists/${psychologistId}`);
      toast.success("Psychologist deleted successfully");
      return response.data;
  } catch (error) {
      toast.error(error.response?.data || "Failed to delete psychologist");
      throw error;
  }
};

// Thêm hàm để lấy chi tiết psychologist
export const getPsychologistDetails = async (psychologistId) => {
  try {
      const response = await api.get(`/api/manager/${psychologistId}/details`);
      return response.data;
  } catch (error) {
      toast.error(error.response?.data || "Failed to fetch psychologist details");
      throw error;
  }
};