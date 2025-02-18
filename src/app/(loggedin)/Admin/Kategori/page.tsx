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
    <>
      <Head>
        <title>Kategori</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Kategori</h1>
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((kategori) => (
            <div
              key={kategori.kategori_id}
              className="card bg-base-200 shadow-xl p-4 flex flex-col items-center text-center"
            >
              <div className="card-icon mb-2">
                {/* Assuming you have icon classes */}
              </div>
              <h2 className="text-lg font-semibold">{kategori.kategori_nama}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default KategoriPage;