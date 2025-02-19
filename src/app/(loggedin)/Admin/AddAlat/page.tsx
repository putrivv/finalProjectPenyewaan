"use client"; // Tambahkan ini untuk menandai file sebagai Client Component
import { useState } from "react";

export default function AddAlat() {
  // State untuk menyimpan nilai input
  const [formData, setFormData] = useState({
    alat_id: 0,
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaPerhari: "",
    alat_stok: 0,
    alat_kategori_id: 0,
  });

  // State untuk menampilkan pesan feedback
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Handler untuk mengubah state saat input berubah
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // Kirim data ke API menggunakan fetch
      const response = await fetch("https://final-project.aran8276.site/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Cek apakah respons berhasil
      if (!response.ok) {
        throw new Error("Gagal mengirim data ke server");
      }

      const result = await response.json();
      console.log("Respon dari server:", result);

      // Tampilkan pesan sukses
      setMessage("Data berhasil disimpan!");
      setIsError(false);

      // Reset form setelah berhasil
      setFormData({
        alat_id: 0,
        alat_nama: "",
        alat_deskripsi: "",
        alat_hargaPerhari: "",
        alat_stok: 0,
        alat_kategori_id: 0,
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
    <div className="p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Input Data Alat</h1>

          {message && (
            <div className={`alert ${isError ? "alert-error" : "alert-success"} mb-4`}>
              {message}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">ID Alat</label>
            <input
              type="number"
              name="alat_id"
              value={formData.alat_id}
              onChange={handleChange}
              placeholder="Masukkan ID Alat"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Nama Alat</label>
            <input
              type="text"
              name="alat_nama"
              value={formData.alat_nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Alat"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Deskripsi Alat</label>
            <textarea
              name="alat_deskripsi"
              value={formData.alat_deskripsi}
              onChange={handleChange}
              placeholder="Masukkan Deskripsi Alat"
              className="textarea textarea-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">ID Kategori</label>
            <input
              type="number"
              name="alat_kategori_id"
              value={formData.alat_kategori_id}
              onChange={handleChange}
              placeholder="Masukkan ID Kategori"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Harga Per Hari</label>
            <input
              type="number"
              name="alat_hargaPerhari"
              value={formData.alat_hargaPerhari}
              onChange={handleChange}
              placeholder="Masukkan Harga Per Hari"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Stok Alat</label>
            <input
              type="number"
              name="alat_stok"
              value={formData.alat_stok}
              onChange={handleChange}
              placeholder="Masukkan Stok Alat"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Simpan Data
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
