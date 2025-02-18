import axios from "axios";
import { Item } from "../(loggedin)/Admin/ListAlat/types";

// Fungsi untuk login
export const loginUser = async (formData: { email: string; password: string }) => {
  const response = await axios.post("https://api-penyewaan.aran8276.site/api/login", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Fungsi untuk registrasi
export const registerUser = async (formData: { 
  name: string; 
  email: string; 
  password: string; 
  password_confirmation: string; 
}) => {
  const response = await axios.post("https://api-penyewaan.aran8276.site/api/register", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Fungsi untuk forgot password
export const forgotPassword = async (formData: { email: string }) => {
  const response = await axios.post("https://api-penyewaan.aran8276.site/api/forgot-password", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Fungsi untuk mendapatkan data alat
export const getAlat = async (): Promise<{ success: boolean; message: string; data: Item[] }> => {
    try {
      // Ambil token dari local storage
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
      }
  
      const response = await axios.get("https://api-penyewaan.aran8276.site/api/alat", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
      });
  
      // Validasi respons API
      if (response.data.success && Array.isArray(response.data.data)) {
        return response.data;
      } else {
        throw new Error("Respons API tidak sesuai.");
      }
    } catch (error) {
      console.error("Error fetching alat:", error);
      throw error;
    }
  };

  //Fungsi untuk form penyewaan
  