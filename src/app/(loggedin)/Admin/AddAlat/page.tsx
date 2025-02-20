"use client"; // Tambahkan ini untuk menandai file sebagai Client Component
import { useState, useEffect } from "react";
import { addAlat, getKategori } from "@/app/utils/api"; // Import fungsi addAlat dan getKategori
import { Alat } from "./addalat.type"; // Import tipe Alat
import { Kategori } from "../Kategori/kategori.type"; // Import tipe Kategori

export default function AddAlat() {
  // State untuk menyimpan nilai input
  const [formData, setFormData] = useState<Alat>({
    alat_kategori_id: 0,
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaperhari: 0,
    alat_stok: 0,
  });

  // State untuk menampilkan pesan feedback
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // State untuk menyimpan daftar kategori
  const [categories, setCategories] = useState<Kategori[]>([]);

  // Fetch data kategori saat halaman dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getKategori();
        setCategories(result.data); // Simpan data kategori ke state
      } catch (err) {
        console.error("Error fetching categories:", err);
        setMessage("Gagal mengambil data kategori.");
        setIsError(true);
      }
    };
    fetchCategories();
  }, []);

  // Handler untuk mengubah state saat input berubah
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Konversi nilai ke angka untuk field numerik
    setFormData({
      ...formData,
      [name]: name === "alat_kategori_id" || name === "alat_hargaperhari" || name === "alat_stok"
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

      // Kirim data ke API menggunakan fungsi addAlat
      const result = await addAlat(formData);
      console.log("Respon dari server:", result);

      // Tampilkan pesan sukses
      setMessage("Data berhasil disimpan!");
      setIsError(false);

      // Reset form setelah berhasil
      setFormData({
        alat_kategori_id: 0,
        alat_nama: "",
        alat_deskripsi: "",
        alat_hargaperhari: 0,
        alat_stok: 0,
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

          {/* Menampilkan pesan feedback */}
          {message && (
            <div className={`alert ${isError ? "alert-error" : "alert-success"} mb-4`}>
              {message}
            </div>
          )}

          {/* Dropdown untuk memilih kategori */}
          <div>
            <label className="block text-sm font-medium">Kategori</label>
            <select
              name="alat_kategori_id"
              value={formData.alat_kategori_id}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((kategori) => (
                <option key={kategori.kategori_id} value={kategori.kategori_id}>
                  {kategori.kategori_nama}
                </option>
              ))}
            </select>
          </div>

          {/* Input untuk alat_nama */}
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

          {/* Input untuk alat_deskripsi */}
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

          {/* Input untuk alat_hargaperhari */}
          <div>
            <label className="block text-sm font-medium">Harga Per Hari</label>
            <input
              type="number"
              name="alat_hargaperhari"
              value={formData.alat_hargaperhari}
              onChange={handleChange}
              placeholder="Masukkan Harga Per Hari"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Input untuk alat_stok */}
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

          {/* Tombol Submit */}
          <div>
            <button type="submit" 
            className="btn btn-primary w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-ou">
              Simpan Data
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}