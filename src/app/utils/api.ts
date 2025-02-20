import axios from "axios";
import { Item } from "../(loggedin)/Admin/ListAlat/ListAlat.types";
import { Kategori } from "../(loggedin)/Admin/Kategori/kategori.type"; // Sesuaikan path sesuai struktur proyek Anda
import { Alat } from "../(loggedin)/Admin/AddAlat/addalat.type";
import { Pelanggan } from "@/app/(loggedin)/Admin/Pelanggan/pelanggan.type";
import { Penyewaan } from "../(loggedin)/Admin/SewaAlat/penyewaan.type";
import { ListBarang } from "../(guest)/listbarang/listbarang.type";
import { PelangganResponse } from "../(loggedin)/Admin/AddPelanggan/addpelanggan.type";

// Endpoint API
const BASE_URL = "https://final-project.aran8276.site/api";

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
  try {
    const response = await axios.post(
      "https://final-project.aran8276.site/api/register",
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Pastikan respons dari server valid
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    return response.data; // Kembalikan data dari server
  } catch (error: any) {
    // Tangani error dengan lebih baik
    if (error.response) {
      // Server merespons dengan status code selain 2xx
      console.error("Server Error:", error.response.data);
      throw new Error(error.response.data.message || "Registrasi gagal.");
    } else if (error.request) {
      // Tidak ada respons dari server
      console.error("No response received from server:", error.request);
      throw new Error("Tidak ada respons dari server. Silakan coba lagi.");
    } else {
      // Kesalahan lainnya
      console.error("Error:", error.message);
      throw new Error("Terjadi kesalahan saat mencoba mendaftar.");
    }
  }
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
export const getBarang = async (
  kategori?: string // Filter kategori opsional
): Promise<{
  success: boolean;
  message: string;
  data: ListBarang[];
}> => {
  try {
    if (typeof window === "undefined") {
      return {
        success: false,
        message: "Harus dijalankan di sisi klien.",
        data: [],
      };
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "Token tidak ditemukan. Silakan login.",
        data: [],
      };
    }

    // Buat URL API dengan filter kategori jika tersedia
    const url = new URL("https://final-project.aran8276.site/api/alat");
    if (kategori) {
      url.searchParams.append("kategori_nama", kategori);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      return {
        success: false,
        message: "Token kadaluarsa. Silakan login kembali.",
        data: [],
      };
    }

    if (!response.ok) {
      throw new Error(
        `Gagal mengambil data barang: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data?.success || !Array.isArray(data?.data)) {
      return {
        success: false,
        message: "Respons API tidak valid atau kosong.",
        data: [],
      };
    }

    return {
      success: true,
      message: data.message || "Data berhasil diambil",
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching barang:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengambil data.",
      data: [],
    };
  }
};

export const getDataPelanggan = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.get(
      `https://final-project.aran8276.site/api/data_pelanggan/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Respons API tidak sesuai.");
    }
  } catch (error) {
    console.error("Error fetching data pelanggan:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan pelanggan baru
export const addPelanggan = async (
  formData: FormData
): Promise<PelangganResponse> => {
  try {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    // Kirim permintaan POST ke endpoint /api/pelanggan
    const response = await axios.post(`${BASE_URL}/pelanggan`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Sesuaikan Content-Type untuk FormData
        Authorization: `Bearer ${token}`, // Sertakan token di header
      },
    });

    // Validasi respons API
    if (response.data.success && response.data.data) {
      return response.data; // Kembalikan data pelanggan
    } else {
      throw new Error(response.data.message || "Respons API tidak sesuai.");
    }
  } catch (error) {
    console.error("Error adding pelanggan:", error);
    if (axios.isAxiosError(error)) {
      // Tangani error spesifik dari Axios
      throw new Error(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan pelanggan."
      );
    } else {
      throw error; // Lanjutkan error lainnya
    }
  }
};

//Fungsi EditPelanggan
export const getPelangganById = async (
  id: number
): Promise<{ success: boolean; message: string; data: Pelanggan }> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://final-project.aran8276.site/api/pelanggan/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pelanggan by ID:", error);
    throw error;
  }
};

export const updatePelanggan = async (id: number, formData: Pelanggan) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://final-project.aran8276.site/api/pelanggan/${id}`,
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
    console.error("Error updating pelanggan:", error);
    throw error;
  }
};

//Fungsi deletePelanggan
export const deletePelanggan = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
    const response = await axios.delete(
      `https://final-project.aran8276.site/api/pelanggan/${id}`,
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
