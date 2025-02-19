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
export const getAlat = async (): Promise<{
  success: boolean;
  message: string;
  data: Item[];
}> => {
  try {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.get(
      "https://final-project.aran8276.site/api/alat",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
      }
    );

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
export const getKategori = async (): Promise<{
  success: boolean;
  message: string;
  data: Kategori[];
}> => {
  try {
    // Ambil token dari local storage (jika diperlukan)
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://final-project.aran8276.site/api/kategori",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Jika endpoint memerlukan token
        },
      }
    );

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

//Fungsi Edit Kategori
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
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    // Kirim permintaan POST ke endpoint /api/alat
    const response = await axios.post(
      "https://final-project.aran8276.site/api/alat",
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
    console.error("Error adding alat:", error);
    throw error;
  }
};

//Fungsi Pelanggan
// Fungsi untuk mengambil data pelanggan dari API
export const getPelanggan = async (): Promise<{
  success: boolean;
  data: Pelanggan[];
}> => {
  try {
    const response = await fetch(
      "https://final-project.aran8276.site/api/pelanggan"
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data pelanggan.");
    }

    const data = await response.json();

    // Pastikan data adalah array dan sesuai dengan tipe Pelanggan
    if (Array.isArray(data)) {
      return { success: true, data };
    } else {
      throw new Error("Data tidak valid.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, data: [] };
  }
};
