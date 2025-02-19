import axios from "axios";
import { Item } from "../(loggedin)/Admin/ListAlat/ListAlat.types";
import { Kategori } from "../(loggedin)/Admin/Kategori/kategori.type"; // Sesuaikan path sesuai struktur proyek Anda
import { Alat } from "../(loggedin)/Admin/AddAlat/addalat.type";
import { Pelanggan } from "@/app/(loggedin)/Admin/Pelanggan/pelanggan.type";
import { Penyewaan } from "../(loggedin)/Admin/SewaAlat/penyewaan.type";
import { ListBarang } from "../(guest)/listbarang/listbarang.type";

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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
    const response = await axios.get(
      "https://final-project.aran8276.site/api/alat",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await axios.get(
      "https://final-project.aran8276.site/api/kategori",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

//Fungsi untuk editAlat
const API_URL = "https://final-project.aran8276.site/api/alat";

export const getAlatById = async (
  id: number
): Promise<{ success: boolean; message: string; data: Alat }> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching alat by ID:", error);
    throw error;
  }
};

export const updateAlat = async (id: number, formData: Alat) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating alat:", error);
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

//Fungsi Pelanggan
// Fungsi untuk mengambil data pelanggan dari API
export const getPelanggan = async (): Promise<{
  success: boolean;
  message: string;
  data: Pelanggan[];
}> => {
  try {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.get(
      "https://final-project.aran8276.site/api/pelanggan",
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
    console.error("Error fetching pelanggan:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan penyewaan baru
export const addPenyewaan = async (formData: Partial<Penyewaan>) => {
  try {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    // Kirim permintaan POST ke endpoint /api/penyewaan
    const response = await axios.post(
      "https://final-project.aran8276.site/api/penyewaan",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
      }
    );

    return response.data; // Kembalikan respons dari server
  } catch (error) {
    console.error("Error adding penyewaan:", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan data penyewaan
export const getPenyewaan = async (): Promise<{
  success: boolean;
  message: string;
  data: Penyewaan[];
}> => {
  try {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.get(
      "https://final-project.aran8276.site/api/penyewaan",
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
    console.error("Error fetching penyewaan:", error);
    throw error;
  }
};

// Fungsi untuk menghapus penyewaan
export const deletePenyewaan = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
    const response = await axios.delete(
      `https://final-project.aran8276.site/api/penyewaan/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting penyewaan:", error);
    throw error;
  }
};

//Fungsi EditPenyewaan
export const getPenyewaanById = async (
  id: number
): Promise<{ success: boolean; message: string; data: Penyewaan }> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://final-project.aran8276.site/api/penyewaan/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching penyewaan by ID:", error);
    throw error;
  }
};

export const updatePenyewaan = async (id: number, formData: Penyewaan) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://final-project.aran8276.site/api/penyewaan/${id}`,
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
    console.error("Error updating penyewaan:", error);
    throw error;
  }
};
//List Barang Guest
// List Barang Guest dengan fitur filter kategori
export const getBarang = async (
  kategori?: string // Parameter opsional untuk filter kategori
): Promise<{
  success: boolean;
  message: string;
  data: ListBarang[];
}> => {
  try {
    // Pastikan localStorage hanya diakses di sisi klien
    if (typeof window === "undefined") {
      throw new Error("Fungsi ini hanya dapat dijalankan di sisi klien.");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    // Buat URL dengan query parameter kategori jika ada
    const url = new URL("https://final-project.aran8276.site/api/alat");
    if (kategori) {
      url.searchParams.append("kategori", kategori);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Gagal mengambil data barang: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Validasi respons API
    if (!data.success || !Array.isArray(data.data)) {
      throw new Error("Respons API tidak valid atau data tidak ditemukan.");
    }

    return {
      success: data.success,
      message: data.message || "Data berhasil diambil",
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching barang:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat mengambil data barang."
    );
  }
};
