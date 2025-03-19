import api from "../config/axios";
import { toast } from "react-toastify";

export const checkPaymentSuccess = async (bookingId) => {
  try {
    const response = await api.get("/api/payment/vnpay/success", {
      params: { bookingId },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data || "Failed to verify payment");
    return null;
  }
};

export const createPayment = async (bookingId) => {
    try {
      const response = await api.post("/api/payment/vnpay/create", null, {
        params: { bookingId },
      });
      return response.data; // Giả sử backend trả về URL thanh toán
    } catch (error) {
      toast.error(error.response?.data || "Failed to create payment");
      return null;
    }
  };

  // Thêm hàm gọi API callback
export const handlePaymentCallback = async (params) => {
  try {
    const response = await api.post("/api/payment/vnpay/callback", params);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data || "Failed to process payment callback");
    return null;
  }
};