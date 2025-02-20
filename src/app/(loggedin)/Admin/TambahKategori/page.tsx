"use client"; // Tambahkan ini untuk menandai file sebagai Client Component
import { useState } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import ikon dari react-icons
import { Kategori } from "../TambahKategori/TambahKategori.type"; // Import tipe Kategori
import { addKategori } from "@/app/utils/api"; // Import fungsi addKategori dari api.ts

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

export default function AddKategori() {
  // State untuk menyimpan nilai input
  const [formData, setFormData] = useState<Kategori>({
    kategori_id: 0, // Opsional jika auto-generated
    kategori_nama: "",
  });

  // State untuk menampilkan pesan feedback
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Handler untuk mengubah state saat input berubah
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler untuk submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Kirim data ke API menggunakan fungsi addKategori
      const result = await addKategori(formData);
      console.log("Respon dari server:", result);

      // Tampilkan pesan sukses
      setMessage("Kategori berhasil ditambahkan!");
      setIsError(false);

      // Reset form setelah berhasil
      setFormData({
        kategori_id: 0, // Opsional jika auto-generated
        kategori_nama: "",
      });

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      console.error("Error caught:", error); // Opsional: Untuk debugging
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
    <div className="p-4">
      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#050315]">Tambah Kategori</h2>

          {/* Input untuk nama kategori */}
          <div>
            <label className="block text-sm font-medium text-[#050315]">
              Nama Kategori
            </label>
            <input
              type="text"
              name="kategori_nama"
              value={formData.kategori_nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Kategori"
              className="w-full px-4 py-2 mt-1 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
              required
            />
          </div>

          {/* Tombol Submit */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
            >
              Simpan Data
            </button>
          </div>
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
}