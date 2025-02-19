import axios from "axios";
import { Item } from "../(loggedin)/Admin/ListAlat/ListAlat.types";
import { Kategori } from "../(loggedin)/Admin/Kategori/kategori.type"; // Sesuaikan path sesuai struktur proyek Anda

// Fungsi untuk login
export const loginUser = async (formData: { admin_username: string; admin_email: string; admin_password: string }) => {
    const response = await axios.post(
      "https://final-project.aran8276.site/api/login",
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  };

  export const registerUser = async (formData: { 
    admin_username: string; 
    admin_email: string; 
    admin_password: string;  
  }) => {
    const response = await axios.post("https://final-project.aran8276.site/api/register", formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

// Fungsi untuk forgot password
export const forgotPassword = async (formData: { email: string }) => {
  const response = await axios.post("https://final-project.aran8276.site/api/reset-password", formData, {
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

// Fungsi untuk mendapatkan data kategori
export const getKategori = async (): Promise<{ success: boolean; message: string; data: Kategori[] }> => {
  try {
    // Ambil token dari local storage (jika diperlukan)
    const token = localStorage.getItem("token");

    const response = await axios.get("https://api-penyewaan.aran8276.site/api/kategori", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Jika endpoint memerlukan token
      },
    });

    // Validasi respons API
    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data;
    } else {
      throw new Error("Respons API tidak sesuai.");
    }
  } catch (error) {
    console.error("Error fetching kategori:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan kategori baru
export const addKategori = async (formData: { kategori_nama: string }) => {
    try {
      // Ambil token dari local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
      }
  
      const response = await axios.post(
        "https://final-project.aran8276.site/api/kategori",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Sertakan token di header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };