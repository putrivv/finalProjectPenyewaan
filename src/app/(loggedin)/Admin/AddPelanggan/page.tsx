"use client";
import React, { useState } from "react";
import { addPelanggan } from "@/app/utils/api";
import { PelangganInput } from "@/app/(loggedin)/Admin/AddPelanggan/addpelanggan.type";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import ikon dari react-icons
import ReactDOM from "react-dom"; // Import ReactDOM untuk membuat portal

// Komponen Notifikasi (Portal)
const Notification = ({
  message,
  isError,
  onClose,
}: {
  message: string;
  isError: boolean;
  onClose: () => void;
}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Notifikasi Box */}
      <div
        className={`relative p-8 rounded-2xl shadow-lg text-center ${
          isError ? "bg-red-50 text-red-500" : "bg-gray-50 text-green-500"
        }`}
      >
        {/* Ikon Besar */}
        <div className="mb-4">
          {isError ? (
            <FaExclamationCircle className="text-6xl mx-auto text-red-500" />
          ) : (
            <FaCheckCircle className="text-6xl mx-auto text-green-500" />
          )}
        </div>
        {/* Pesan */}
        <p className="text-base font-light">{message}</p>
      </div>
    </div>,
    document.body // Tempatkan notifikasi di dalam body
  );
};

const AddPelanggan = () => {
  const [formData, setFormData] = useState<PelangganInput>({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_notelp: "",
    pelanggan_email: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !formData.pelanggan_nama ||
        !formData.pelanggan_alamat ||
        !formData.pelanggan_notelp ||
        !formData.pelanggan_email
      ) {
        throw new Error("Semua field harus diisi.");
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const result = await addPelanggan(formDataToSend);
      console.log("Respon dari server:", result);

      setMessage("Data pelanggan berhasil disimpan!");
      setIsError(false);

      setFormData({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_notelp: "",
        pelanggan_email: "",
      });

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
      if (error instanceof Error) {
        errorMessage = error.message;
        if (
          errorMessage.includes("Akses ditolak") ||
          errorMessage.includes("Token tidak valid")
        ) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      }
      setMessage(errorMessage);
      setIsError(true);

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tambah Pelanggan</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="pelanggan_nama" className="block text-sm font-medium mb-2">
            Nama Pelanggan
          </label>
          <input
            type="text"
            id="pelanggan_nama"
            name="pelanggan_nama"
            value={formData.pelanggan_nama}
            onChange={handleChange}
            placeholder="Masukkan Nama Pelanggan"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pelanggan_alamat" className="block text-sm font-medium mb-2">
            Alamat Pelanggan
          </label>
          <textarea
            id="pelanggan_alamat"
            name="pelanggan_alamat"
            value={formData.pelanggan_alamat}
            onChange={handleChange}
            placeholder="Masukkan Alamat Pelanggan"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="pelanggan_notelp" className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <input
            type="text"
            id="pelanggan_notelp"
            name="pelanggan_notelp"
            value={formData.pelanggan_notelp}
            onChange={handleChange}
            placeholder="Masukkan Nomor Telepon"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="pelanggan_email" className="block text-sm font-medium mb-2">
            Email Pelanggan
          </label>
          <input
            type="email"
            id="pelanggan_email"
            name="pelanggan_email"
            value={formData.pelanggan_email}
            onChange={handleChange}
            placeholder="Masukkan Email Pelanggan"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-ou">
            Simpan Data
          </button>
        </div>
      </form>

      {/* Render Notifikasi (Portal) */}
      {message && (
        <Notification
          message={message}
          isError={isError}
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
};

export default AddPelanggan;