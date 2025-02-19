"use client"; // Menandai komponen ini sebagai Client Component
import React, { useState } from "react";
import { addPenyewaan } from "@/app/utils/api"; // Import fungsi addPenyewaan
import { Penyewaan } from "@/app/(loggedin)/Admin/AddPenyewaan/addpenyewaan.type"; // Import tipe Penyewaan

const AddAlat = () => {
  const [formData, setFormData] = useState<Partial<Penyewaan>>({
    penyewaan_pelanggan_id: 0,
    penyewaan_tglsewa: "",
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "Belum Lunas",
    penyewaan_sttskembali: "Belum Kembali",
    penyewaan_totalharga: 0,
  });
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
        ? Number(value) // Konversi ke angka untuk field numerik
        : value,
    });
  };

  // Handler untuk submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Debugging: Cetak payload yang dikirim
      console.log("Payload yang dikirim:", formData);
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
    } catch (error) {
      console.error("Error caught:", error);
      let errorMessage = "Terjadi kesalahan yang tidak diketahui";
      if (error instanceof Error) {
        errorMessage = `Terjadi kesalahan: ${error.message}`;
      }
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Form Penyewaan Alat</h1>

      {/* Form Penyewaan */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nama Pelanggan */}
        <div className="mb-4">
          <label className="block text-sm font-medium">ID Pelanggan</label>
          <input
            type="number"
            name="penyewaan_pelanggan_id"
            value={formData.penyewaan_pelanggan_id}
            onChange={handleChange}
            placeholder="Masukkan ID Pelanggan"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Tanggal Disewa & Tanggal Kembali */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Tanggal Disewa</label>
            <input
              type="date"
              name="penyewaan_tglsewa"
              value={formData.penyewaan_tglsewa}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tanggal Kembali</label>
            <input
              type="date"
              name="penyewaan_tglkembali"
              value={formData.penyewaan_tglkembali}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
        </div>

        {/* Checkbox Sudah Dibayar */}
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.penyewaan_sttspembayaran === "Lunas"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  penyewaan_sttspembayaran: e.target.checked ? "Lunas" : "Belum Lunas",
                })
              }
            />
            Sudah Dibayar
          </label>
        </div>

        {/* Checkbox Sudah Kembali */}
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.penyewaan_sttskembali === "Sudah Kembali"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  penyewaan_sttskembali: e.target.checked ? "Sudah Kembali" : "Belum Kembali",
                })
              }
            />
            Sudah Kembali
          </label>
        </div>

        {/* Total Harga */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Total Harga</label>
          <input
            type="number"
            name="penyewaan_totalharga"
            value={formData.penyewaan_totalharga}
            onChange={handleChange}
            placeholder="Masukkan Total Harga"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-end gap-4">
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>

      {/* Pesan Feedback */}
      {message && (
        <div className={`alert ${isError ? "alert-error" : "alert-success"} mt-4`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddAlat;