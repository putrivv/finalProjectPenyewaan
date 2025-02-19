"use client"; // Menandai komponen ini sebagai Client Component
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPenyewaan } from "@/app/utils/api"; // Import fungsi getPenyewaan
import { Penyewaan } from "@/app/(loggedin)/Admin/SewaAlat/penyewaan.type"; // Import tipe Penyewaan

<<<<<<< Updated upstream
const SewaAlat = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaBarang: "",
    namaPelanggan: "",
    tanggalDisewa: "",
    tanggalKembali: "",
    sudahKembali: false,
    sudahDibayar: false,
  });
=======
const SewaAlat = () => {
  const [search, setSearch] = useState("");
  const [penyewaan, setPenyewaan] = useState<Penyewaan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
>>>>>>> Stashed changes

  useEffect(() => {
    const fetchPenyewaan = async () => {
      try {
        const result = await getPenyewaan();
        // Validasi respons API
        if (result.success && Array.isArray(result.data)) {
          // Filter hanya penyewaan yang valid
          const validPenyewaan = result.data.filter(
            (item) =>
              typeof item.penyewaan_id === "number" &&
              typeof item.penyewaan_pelanggan_id === "number" &&
              typeof item.penyewaan_tglsewa === "string" &&
              typeof item.penyewaan_tglkembali === "string" &&
              typeof item.penyewaan_sttspembayaran === "string" &&
              typeof item.penyewaan_sttskembali === "string" &&
              typeof item.penyewaan_totalharga === "number"
          );
          setPenyewaan(validPenyewaan);
        } else {
          throw new Error("Data tidak valid.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPenyewaan();
  }, []);

  // Filtering items based on the search keyword
  const filteredPenyewaan = penyewaan.filter((item) =>
    item.penyewaan_pelanggan_id.toString().includes(search.toLowerCase()) ||
    item.penyewaan_sttspembayaran.toLowerCase().includes(search.toLowerCase())
  );

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = () => {
    onSave(formData); // Kirim data ke komponen induk melalui prop `onSave`
    closeModal();
  };

  return (
<<<<<<< Updated upstream
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-[#050315] text-center">
        Form Penyewaan Alat
      </h1>
      <hr className="border-t-2 border-[#d1fae5] mb-6" />
      {/* Form */}
      <form className="space-y-4">
        {/* Nama Barang */}
        <div>
          <label className="block text-sm font-medium text-[#050315] mb-2">
            Nama Barang
          </label>
          <input
            type="text"
            name="namaBarang"
            placeholder="Nama Barang"
            value={formData.namaBarang}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
          />
        </div>
        {/* Nama Pelanggan */}
        <div>
          <label className="block text-sm font-medium text-[#050315] mb-2">
            Nama Pelanggan
          </label>
          <input
            type="text"
            name="namaPelanggan"
            placeholder="Nama Pelanggan"
            value={formData.namaPelanggan}
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
              name="tanggalDisewa"
              value={formData.tanggalDisewa}
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
              name="tanggalKembali"
              value={formData.tanggalKembali}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
            />
          </div>
        </div>
        {/* Checkbox Sudah Kembali */}
        <div>
          <label className="flex items-center gap-2 text-sm text-[#050315]">
            <input
              type="checkbox"
              name="sudahKembali"
              checked={formData.sudahKembali}
              onChange={handleChange}
              className="rounded border-[#d1fae5] text-[#7AB2D3] focus:ring-[#7AB2D3] focus:ring-offset-2"
            />
            Sudah Kembali
          </label>
        </div>
        {/* Checkbox Sudah Dibayar */}
        <div>
          <label className="flex items-center gap-2 text-sm text-[#050315]">
            <input
              type="checkbox"
              name="sudahDibayar"
              checked={formData.sudahDibayar}
              onChange={handleChange}
              className="rounded border-[#d1fae5] text-[#7AB2D3] focus:ring-[#7AB2D3] focus:ring-offset-2"
            />
            Sudah Dibayar
          </label>
        </div>
        {/* Tombol Simpan */}
        <button
          type="button"
          className="w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
          onClick={openModal}
        >
          Simpan
        </button>
      </form>
      {/* Modal (Portal) */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-bold text-[#050315] mb-4 text-center">
                Konfirmasi Penyewaan
              </h3>
              <p className="text-sm text-[#050315] mb-6 text-center">
                Apakah Anda yakin ingin menyimpan data penyewaan ini?
              </p>
              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-gray-300 text-[#050315] font-medium rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
=======
    <div className="p-4">
      <h1 className="text-3xl font-bold">Daftar Penyewaan</h1>

      {/* Search Bar and Button Container */}
      <div className="flex justify-between items-center mt-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari penyewaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        {/* Button Tambah Penyewaan */}
        <Link href="/Admin/AddPenyewaan">
          <button className="btn btn-primary flex items-center gap-2">
            Tambah Penyewaan
          </button>
        </Link>
      </div>

      {/* Loading or Error message */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Data table */}
      {!loading && !error && (
        <table className="table table-zebra w-full mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Pelanggan</th>
              <th>Tanggal Disewa</th>
              <th>Tanggal Kembali</th>
              <th>Status Pembayaran</th>
              <th>Status Kembali</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {filteredPenyewaan.length > 0 ? (
              filteredPenyewaan.map((item) => (
                <tr key={item.penyewaan_id}>
                  <td>{item.penyewaan_id}</td>
                  <td>{item.penyewaan_pelanggan_id}</td>
                  <td>{item.penyewaan_tglsewa}</td>
                  <td>{item.penyewaan_tglkembali}</td>
                  <td>{item.penyewaan_sttspembayaran}</td>
                  <td>{item.penyewaan_sttskembali}</td>
                  <td>{item.penyewaan_totalharga.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  Tidak ada data penyewaan ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
>>>>>>> Stashed changes
    </div>
  );
};

export default SewaAlat;