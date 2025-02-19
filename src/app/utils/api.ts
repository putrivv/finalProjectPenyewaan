import axios from "axios";
import { Item } from "../(loggedin)/Admin/ListAlat/ListAlat.types";
import { Kategori } from "../(loggedin)/Admin/Kategori/kategori.type"; // Sesuaikan path sesuai struktur proyek Anda
import { Alat } from "../(loggedin)/Admin/AddAlat/addalat.type";
import { Pelanggan } from "@/app/(loggedin)/Admin/Pelanggan/pelanggan.type";

// Fungsi untuk login
export const loginUser = async (formData: {
  admin_username: string;
  admin_email: string;
  admin_password: string;
}) => {
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
  const response = await axios.post(
    "https://final-project.aran8276.site/api/register",
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};
// Fungsi untuk forgot password
export const forgotPassword = async (formData: { email: string }) => {
  const response = await axios.post(
    "https://final-project.aran8276.site/api/reset-password",
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};
// Fungsi untuk mendapatkan data alat
export const getAlat = async (): Promise<{ success: boolean; message: string; data: Item[] }> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
    const response = await axios.get("https://final-project.aran8276.site/api/alat", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
export const getKategori = async (): Promise<{
  success: boolean;
  message: string;
  data: Kategori[];
}> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://final-project.aran8276.site/api/kategori", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
// Fungsi untuk menghapus kategori
export const deleteKategori = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
    const response = await axios.delete(
      `https://final-project.aran8276.site/api/kategori/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting kategori:", error);
    throw error;
  }
};
// Fungsi Edit Kategori
export const getKategoriById = async (
  id: number
): Promise<{ success: boolean; message: string; data: Kategori }> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://final-project.aran8276.site/api/kategori/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching kategori by ID:", error);
    throw error;
  }
};
export const updateKategori = async (formData: Kategori) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://final-project.aran8276.site/api/kategori/${formData.kategori_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating kategori:", error);
    throw error;
  }
};
// Fungsi untuk menambahkan alat baru
export const addAlat = async (formData: Alat) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
    const response = await axios.post(
      "https://final-project.aran8276.site/api/alat",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding alat:", error);
    throw error;
  }
};
// Fungsi untuk menghapus alat
export const deleteAlat = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
    const response = await axios.delete(
      `https://final-project.aran8276.site/api/alat/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting alat:", error);
    throw error;
  }
};