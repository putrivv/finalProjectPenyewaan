"use client";
import React, { useState } from "react";
import { addPenyewaan } from "@/app/utils/api"; // Import fungsi addPenyewaan
import { Penyewaan } from "@/app/(loggedin)/Admin/SewaAlat/penyewaan.type"; // Import tipe Penyewaan

const AddPenyewaanForm = () => {
  const [formData, setFormData] = useState<Partial<Penyewaan>>({
    penyewaan_pelanggan_id: 0,
    penyewaan_tglsewa: "",
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "Belum Lunas",
    penyewaan_sttskembali: "Belum Kembali",
    penyewaan_totalharga: 0,
  });
  const [message, setMessage] = useState<string | null>(null);

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

      // Reset form setelah berhasil
      setFormData({
        penyewaan_pelanggan_id: 0,
        penyewaan_tglsewa: "",
        penyewaan_tglkembali: "",
        penyewaan_sttspembayaran: "Belum Lunas",
        penyewaan_sttskembali: "Belum Kembali",
        penyewaan_totalharga: 0,
      });
    } catch (error) {
      console.error("Error caught:", error);
      let errorMessage = "Terjadi kesalahan yang tidak diketahui";
      if (error instanceof Error) {
        errorMessage = `Terjadi kesalahan: ${error.message}`;
      }
      setMessage(errorMessage);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-[#050315] text-center">
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
          Simpan
        </button>
      </form>
      {/* Pesan Feedback */}
      {message && (
        <p className="mt-4 text-center text-sm text-[#050315]">{message}</p>
      )}
    </div>
  );
};

export default AddPenyewaanForm;