"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import ikon dari react-icons
import { Kategori } from "./kategori.type"; // Import tipe data Kategori
import { getKategori, deleteKategori } from "@/app/utils/api"; // Import fungsi getKategori & deleteKategori
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

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
        className={`relative p-6 rounded-lg shadow-lg text-center ${
          isError ? "bg-red-50 text-red-500" : "bg-gray-50 text-green-500"
        }`}
      >
        {/* Ikon Besar */}
        <div className="mb-4">
          {isError ? (
            <FaExclamationCircle className="text-5xl mx-auto text-red-500" />
          ) : (
            <FaCheckCircle className="text-5xl mx-auto text-green-500" />
          )}
        </div>
        {/* Pesan */}
        <p className="text-sm font-light">{message}</p>
      </div>
    </div>,
    document.body // Tempatkan notifikasi di dalam body
  );
};

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
          Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.
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

const KategoriPage = () => {
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; isError: boolean } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id?: number }>({ isOpen: false });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getKategori(); // Panggil fungsi getKategori
        setCategories(result.data); // Simpan data kategori ke state
      } catch (err: any) {
        console.error("Error fetching categories:", err); // Debugging
        setError(err.message || "Gagal mengambil data kategori");
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      // Simulasi delay sebelum penghapusan dimulai
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay 1 detik

      await deleteKategori(deleteModal.id);
      setCategories(categories.filter((kategori) => kategori.kategori_id !== deleteModal.id));

      // Tampilkan notifikasi sukses
      setNotification({ message: "Kategori berhasil dihapus!", isError: false });

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setNotification(null), 2000);
    } catch (err: any) {
      console.error("Error deleting category:", err);

      // Tampilkan notifikasi error
      setNotification({ message: "Gagal menghapus kategori", isError: true });

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setNotification(null), 2000);
    } finally {
      setDeleteModal({ isOpen: false }); // Tutup modal setelah proses selesai
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Render Notifikasi (Portal) */}
      {notification && (
        <Notification
          message={notification.message}
          isError={notification.isError}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Render Modal Konfirmasi (Portal) */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDelete}
      />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kategori Alat</h1>
        <Link href="/Admin/TambahKategori">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow-md hover:shadow-lg transition duration-300">
            <FaPlus className="text-xs" /> Tambah Kategori
          </button>
        </Link>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
          <span>{error}</span>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((kategori) => (
          <div
            key={kategori.kategori_id}
            className="group bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl relative"
          >
            {/* Icon Actions (Edit & Delete) */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Link href={`/Admin/EditKategori/${kategori.kategori_id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit className="text-base" />
                </button>
              </Link>
              <button
                onClick={() => setDeleteModal({ isOpen: true, id: kategori.kategori_id })}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="text-base" />
              </button>
            </div>
            {/* Icon or Image Placeholder */}
            <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-5xl text-blue-500">📦</span>
            </div>
            {/* Category Name */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {kategori.kategori_nama}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KategoriPage;