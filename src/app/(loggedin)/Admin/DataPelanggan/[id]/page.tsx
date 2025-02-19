"use client";
import { useRouter } from "next/navigation"; // Gunakan useRouter dari next/navigation
import { useEffect, useState } from "react";
import { getDataPelanggan } from "@/app/utils/api"; // Import fungsi API
import { DataPelanggan } from "@/app/(loggedin)/Admin/DataPelanggan/datapelanggan.type"; // Import tipe DataPelanggan

interface PageProps {
  params: {
    id: string; // ID pelanggan dari URL
  };
}

export default function DetailPelangganPage({ params }: PageProps) {
  const [dataPelanggan, setDataPelanggan] = useState<DataPelanggan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataPelanggan = async () => {
      try {
        const result = await getDataPelanggan(Number(params.id)); // Panggil API untuk mendapatkan data pelanggan berdasarkan ID
        setDataPelanggan(result); // Set data pelanggan ke state
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data detail pelanggan.");
        console.error("Error fetching data pelanggan:", error);
      } finally {
        setLoading(false); // Matikan loading setelah selesai
      }
    };

    fetchDataPelanggan();
  }, [params.id]); // Jalankan ulang jika ID berubah

  if (loading) return <p>Loading...</p>; // Tampilkan pesan loading jika sedang memuat data
  if (error) return <p className="text-red-500">{error}</p>; // Tampilkan pesan error jika terjadi kesalahan

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Detail Pelanggan</h1>
      <hr className="border-t-2 border-[#d1fae5] mb-4" />

      {/* Tampilkan data pelanggan jika tersedia */}
      {dataPelanggan ? (
        <div>
          <p>ID Pelanggan: {dataPelanggan.pelanggan_data_pelanggan_id}</p>
          <p>Data ID: {dataPelanggan.pelanggan_data_id}</p>
          <p>File: {dataPelanggan.pelanggan_data_file}</p>
        </div>
      ) : (
        <p>Data pelanggan tidak ditemukan.</p> // Tampilkan pesan jika data tidak ditemukan
      )}
    </div>
  );
}