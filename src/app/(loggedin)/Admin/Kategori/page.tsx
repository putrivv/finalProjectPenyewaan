"use client";
import React, { useEffect, useState } from "react";
import { Kategori } from "./kategori.type"; // Import tipe data Kategori
import { getKategori, deleteKategori } from "@/app/utils/api"; // Import fungsi getKategori & deleteKategori
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const KategoriPage = () => {
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;
    try {
      await deleteKategori(id);
      setCategories(categories.filter((kategori) => kategori.kategori_id !== id));
    } catch (err: any) {
      console.error("Error deleting category:", err);
      setError(err.message || "Gagal menghapus kategori");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kategori Alat</h1>
        <Link href="/Admin/TambahKategori">
          <button className="btn flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
            <FaPlus /> Tambah Kategori
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((kategori) => (
          <div
            key={kategori.kategori_id}
            className="group bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* Icon or Image Placeholder */}
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
            {/* Category Name */}
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {kategori.kategori_nama}
              </h2>
              <div className="flex gap-2">
                <Link href={`/Admin/EditKategori/${kategori.kategori_id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </Link>
                <button onClick={() => handleDelete(kategori.kategori_id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KategoriPage;
