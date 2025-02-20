"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import ikon dari react-icons
import { addPenyewaan } from "@/app/utils/api"; // Import fungsi addPenyewaan
import { Penyewaan } from "@/app/(loggedin)/Admin/SewaAlat/penyewaan.type"; // Import tipe Penyewaan

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

const AddPenyewaanForm = () => {
  const [formData, setFormData] = useState<Partial<Penyewaan>>({
    penyewaan_pelanggan_id: 0,
    penyewaan_tglsewa: "",
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "Belum Lunas", // Default value
    penyewaan_sttskembali: "Belum Kembali",
    penyewaan_totalharga: 0,
  });

  // State untuk menampilkan pesan feedback
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Handler untuk mengubah state saat input berubah
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Konversi nilai ke angka untuk field numerik
    setFormData({
      ...formData,
      [name]: name === "penyewaan_pelanggan_id" || name === "penyewaan_totalharga"
        ? Number(value)
        : value,
    });
  };

  // Handler untuk submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Kirim data ke API menggunakan fungsi addPenyewaan
      const result = await addPenyewaan(formData);
      console.log("Respon dari server:", result);

      // Tampilkan pesan sukses
      setMessage("Data penyewaan berhasil disimpan!");
      setIsError(false);

      // Reset form setelah berhasil
      setFormData({
        penyewaan_pelanggan_id: 0,
        penyewaan_tglsewa: "",
        penyewaan_tglkembali: "",
        penyewaan_sttspembayaran: "Belum Lunas",
        penyewaan_sttskembali: "Belum Kembali",
        penyewaan_totalharga: 0,
      });

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      console.error("Error caught:", error);
      let errorMessage = "Terjadi kesalahan yang tidak diketahui";
      if (error instanceof Error) {
        errorMessage = `Terjadi kesalahan: ${error.message}`;
      }
      setMessage(errorMessage);
      setIsError(true);

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-[#050315]">
        Form Penyewaan Alat
      </h1>
      <hr className="border-t-2 border-[#d1fae5] mb-6" />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Pelanggan */}
        <div>
          <label className="block text-sm font-medium text-[#050315] mb-2">
            ID Pelanggan
          </label>
          <input
            type="number"
            name="penyewaan_pelanggan_id"
            placeholder="ID Pelanggan"
            value={formData.penyewaan_pelanggan_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
          />
        </div>

        {/* Tanggal Disewa & Tanggal Kembali */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#050315] mb-2">
              Tanggal Disewa
            </label>
            <input
              type="date"
              name="penyewaan_tglsewa"
              value={formData.penyewaan_tglsewa}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#050315] mb-2">
              Tanggal Kembali
            </label>
            <input
              type="date"
              name="penyewaan_tglkembali"
              value={formData.penyewaan_tglkembali}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
            />
          </div>
        </div>

        {/* Status Pembayaran */}
        <div>
          <label className="block text-sm font-medium text-[#050315] mb-2">
            Status Pembayaran
          </label>
          <select
            name="penyewaan_sttspembayaran"
            value={formData.penyewaan_sttspembayaran}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
          >
            <option value="Belum Lunas">Belum Lunas</option>
            <option value="Lunas">Lunas</option>
          </select>
        </div>

        {/* Total Harga */}
        <div>
          <label className="block text-sm font-medium text-[#050315] mb-2">
            Total Harga
          </label>
          <input
            type="number"
            name="penyewaan_totalharga"
            placeholder="Total Harga"
            value={formData.penyewaan_totalharga}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
          />
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
        >
          Simpan Data
        </button>
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

export default AddPenyewaanForm;