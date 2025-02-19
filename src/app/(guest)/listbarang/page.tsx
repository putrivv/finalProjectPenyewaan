"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getBarang, getKategori } from "@/app/utils/api";
import { ListBarang } from "@/app/(guest)/listbarang/listbarang.type";

interface Kategori {
  id: string;
  nama: string;
}

const BarangCard: React.FC<ListBarang> = React.memo(
  ({ alat_nama, alat_deskripsi, alat_stok, alat_hargaperhari }) => {
    return (
      <div className="relative bg-white border border-gray-200 shadow-md rounded-xl flex flex-col w-[260px] h-auto hover:shadow-xl hover:scale-105 transition-all duration-300 p-5 overflow-hidden">
        {/* Nama Barang */}
        <h2 className="text-lg font-semibold text-gray-900 truncate">{alat_nama}</h2>

        {/* Deskripsi */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {alat_deskripsi ?? "Deskripsi tidak tersedia"}
        </p>

        {/* Footer: Stok & Harga */}
        <div className="mt-4 flex flex-col gap-1 text-gray-700 text-sm">
          <p>
            <span className="font-medium">Stok:</span> {alat_stok ?? "Tidak tersedia"}
          </p>
          <p>
            <span className="font-medium">Harga per hari:</span>{" "}
            <span className="text-emerald-600 font-semibold">
              Rp {alat_hargaperhari ?? "Tidak tersedia"}
            </span>
          </p>
        </div>
      </div>
    );
  }
);






const BarangList: React.FC = () => {
  const [barang, setBarang] = useState<ListBarang[]>([]);
  const [loadingBarang, setLoadingBarang] = useState<boolean>(true);
  const [loadingKategori, setLoadingKategori] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [kategori, setKategori] = useState<string>("");
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await getKategori();
        if (response.success) {
          setKategoriList(response.data);
        } else {
          setError(response.message || "Gagal mengambil data kategori.");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data kategori."
        );
      } finally {
        setLoadingKategori(false);
      }
    };
    fetchKategori();
  }, []);

  const fetchData = useCallback(async (kategori?: string) => {
    try {
      const response = await getBarang(kategori);
      if (response.success) {
        const barangWithKategori = response.data.map((item: ListBarang) => ({
          ...item,
          kategori_nama: item.kategori_nama || "Tidak ada kategori",
        }));
        setBarang(barangWithKategori);
      } else {
        setError(response.message || "Gagal mengambil data barang.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data barang."
      );
    } finally {
      setLoadingBarang(false);
    }
  }, []);

  useEffect(() => {
    fetchData(kategori);
  }, [fetchData, kategori]);

  const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKategori = e.target.value;
    setKategori(selectedKategori);
  };

  return (
    <div className="flex flex-col items-center py-8 px-4 bg-gradient-to-br from-[#E8F8F5] to-[#DFF2EB] min-h-screen">
      <div className="mb-6">
        <label htmlFor="kategori" className="mr-2 font-semibold text-gray-700">
          Filter Kategori:
        </label>
        <select
          id="kategori"
          value={kategori}
          onChange={handleKategoriChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm transition-all"
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((item) => (
            <option key={item.id} value={item.nama}>
              {item.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Animation */}
      {(loadingBarang || loadingKategori) && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-bars loading-xs animate-pulse"></span>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}

      {/* Barang Grid */}
      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {barang.length > 0
            ? barang.map((item, index) => (
                <BarangCard key={item.alat_id ?? index} {...item} />
              ))
            : !loadingBarang && (
                <p className="text-gray-500 text-center col-span-full">
                  Tidak ada barang tersedia.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default BarangList;
