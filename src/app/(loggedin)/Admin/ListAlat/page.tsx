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
        <h2 className="text-lg font-bold text-gray-800 mb-4">Konfirmasi Penghapusan</h2>
        {/* Pesan */}
        <p className="text-sm text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus barang ini? Tindakan ini tidak dapat dibatalkan.
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
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id?: number }>({ isOpen: false });

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
    <div className="p-4">
      <h1 className="text-3xl font-bold">Daftar Barang Penyewaan</h1>

      {/* Search Bar and Button Container */}
      <div className="flex justify-between items-center mt-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari barang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        {/* Button Tambah Alat */}
        <Link href="/Admin/AddAlat">
          <button className="btn btn-primary flex items-center gap-2">
            <FaPlus /> Tambah Alat
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
              <th>Nama Alat</th>
              <th>Kategori</th>
              <th>Harga (IDR)</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.alat_id}>
                  <td>{item.alat_id}</td>
                  <td>{item.alat_nama}</td>
                  <td>{item.kategori?.kategori_nama || "Tidak Diketahui"}</td>
                  <td>{item.alat_hargaperhari.toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.alat_stok > 0 ? "badge-success" : "badge-error"
                      }`}
                    >
                      {item.alat_stok > 0 ? "Tersedia" : "Tidak Tersedia"}
                    </span>
                  </td>
                  <td>
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {/* Edit Button */}
                      <Link href={`/Admin/Editalat/${item.alat_id}`}>
                        <button className="btn btn-sm btn-primary">
                          <FaEdit className="text-sm" />
                        </button>
                      </Link>
                      {/* Delete Button */}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => setDeleteModal({ isOpen: true, id: item.alat_id })}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  Tidak ada barang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
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