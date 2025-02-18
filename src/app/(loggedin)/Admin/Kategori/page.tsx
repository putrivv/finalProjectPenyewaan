"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Kategori } from "./kategori.type"; // Import tipe data Kategori
import { getKategori } from "@/app/utils/api"; // Sesuaikan path sesuai struktur proyek Anda

const KategoriPage = () => {
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getKategori(); // Gunakan fungsi getKategori
        setCategories(result.data);
      } catch (err: any) {
        console.error("Error fetching categories:", err); // Debugging
        setError(err.message || "Gagal mengambil data kategori");
      }
    };
    fetchCategories();
  }, []);

  return (
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Kategori Alat
        </h1>

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
                {/* Replace with actual icon or image */}
                <span className="text-4xl text-gray-400">📦</span>
              </div>

              {/* Category Name */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
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