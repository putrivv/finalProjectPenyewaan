"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getAlat, deleteAlat } from "@/app/utils/api"; // Import fungsi getAlat & deleteAlat
import { Item } from "@/app/(loggedin)/Admin/ListAlat/ListAlat.types"; // Import tipe Item
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import ikon dari react-icons
import Link from "next/link";

// Komponen Modal Konfirmasi (Portal)
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Modal Box */}
      <div className="relative p-6 bg-white rounded-lg shadow-lg text-center max-w-md w-full">
        {/* Header */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Konfirmasi Penghapusan
        </h2>
        {/* Pesan */}
        <p className="text-sm text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus barang ini? Tindakan ini tidak dapat
          dibatalkan.
        </p>
        {/* Tombol Aksi */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>,
    document.body // Tempatkan modal di dalam body
  );
};

export default function RentalListPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id?: number;
  }>({ isOpen: false });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getAlat();
        // Validasi respons API
        if (result.success && Array.isArray(result.data)) {
          // Filter hanya item yang valid
          const validItems = result.data.filter(
            (item) =>
              typeof item.alat_id === "number" &&
              typeof item.alat_nama === "string" &&
              typeof item.alat_kategori_id === "number" &&
              typeof item.alat_hargaperhari === "number" &&
              typeof item.alat_stok === "number"
          );
          setItems(validItems);
        } else {
          throw new Error("Data tidak valid.");
        }
      } catch (err: any) {
        setError("Terjadi kesalahan saat mengambil data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      await deleteAlat(deleteModal.id); // Panggil fungsi deleteAlat
      setItems(items.filter((item) => item.alat_id !== deleteModal.id)); // Update state
    } catch (err: any) {
      setError("Gagal menghapus barang.");
      console.error("Error deleting item:", err);
    } finally {
      setDeleteModal({ isOpen: false }); // Tutup modal setelah proses selesai
    }
  };

  // Filtering items based on the search keyword
  const filteredItems = items.filter((item) =>
    item.alat_nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Alat</h1>
      <hr className="border-t-2 border-[#4ac786] mb-4" />
      <div className="flex items-center justify-between mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari barang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
        />
        {/* Button Tambah Alat */}
        <Link href="/Admin/AddAlat">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow-md hover:shadow-lg transition duration-300">
            <FaPlus className="text-xs" /> Tambah Alat
          </button>
        </Link>
      </div>

      {/* Loading or Error message */}
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-bars loading-xs"></span>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* Data table */}
      {!loading && !error && (
        <div className="overflow-x-auto text-xs">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
            <thead className="bg-green-100">
              <tr className="text-center">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Nama Alat</th>
                <th className="p-3 border">Kategori</th>
                <th className="p-3 border">Harga (IDR)</th>
                <th className="p-3 border">Stok</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr
                    key={item.alat_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border text-center">{item.alat_id}</td>
                    <td className="p-3 border">{item.alat_nama}</td>
                    <td className="p-3 border">
                      {item.kategori?.kategori_nama || "Tidak Diketahui"}
                    </td>
                    <td className="p-3 border">
                      {item.alat_hargaperhari.toLocaleString()}
                    </td>
                    <td className="p-3 border">{item.alat_stok}</td>
                    <td className="p-3 border text-center">
                      <span
                        className={`badge ${
                          item.alat_stok > 0 ? "badge-success" : "badge-error"
                        }`}
                      >
                        {item.alat_stok > 0 ? "Tersedia" : "Tidak Tersedia"}
                      </span>
                    </td>
                    <td className="p-3 border text-center flex justify-center gap-3">
                      <Link href={`/Admin/Editalat/${item.alat_id}`}>
                        <FaEdit
                          className="text-yellow-500 cursor-pointer"
                          size={18}
                        />
                      </Link>
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        size={18}
                        onClick={() =>
                          setDeleteModal({ isOpen: true, id: item.alat_id })
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Tidak ada barang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Render Modal Konfirmasi (Portal) */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDelete}
      />
    </div>
  );
}
