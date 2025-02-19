"use client"; // Tambahkan ini untuk menandai file sebagai Client Component
import { useState } from "react";
import { Kategori } from "../TambahKategori/TambahKategori.type"; // Import tipe Kategori
import { addKategori } from "@/app/utils/api"; // Import fungsi addKategori dari api.ts

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
    } catch (error) {
      console.error("Error caught:", error); // Opsional: Untuk debugging
      let errorMessage = "Terjadi kesalahan yang tidak diketahui";
      if (error instanceof Error) {
        errorMessage = `Terjadi kesalahan: ${error.message}`;
      }
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Tambah Kategori</h2>

          {/* Menampilkan pesan feedback */}
          {message && (
            <div className={`alert ${isError ? "alert-error" : "alert-success"} mb-4`}>
              {message}
            </div>
          )}

          {/* Input untuk nama kategori */}
          <div>
            <label className="block text-sm font-medium">Nama Kategori</label>
            <input
              type="text"
              name="kategori_nama"
              value={formData.kategori_nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Kategori"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Tombol Submit */}
          <div>
            <button type="submit" className="btn btn-primary w-full">
              Simpan Kategori
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}