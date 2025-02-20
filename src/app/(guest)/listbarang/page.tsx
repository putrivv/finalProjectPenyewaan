"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getBarang, getKategori } from "@/app/utils/api";
import { ListBarang } from "@/app/(guest)/listbarang/listbarang.type";

interface Kategori {
  id: string;
  nama: string;
}

const BarangCard: React.FC<ListBarang> = React.memo(
  ({ alat_id, alat_nama, alat_deskripsi, alat_stok, alat_hargaperhari }) => {
    return (
      <div className="card w-64 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Card Body */}
        <div className="card-body">
          {/* Nama Barang */}
          <h2 className="card-title text-lg font-semibold text-gray-900 truncate">
            {alat_nama}
          </h2>
          {/* Deskripsi */}
          <p className="text-sm text-gray-600 line-clamp-2">
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
        setBarang(response.data);
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

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-100 to-blue-100 min-h-screen">
      <div className="mb-6 w-full flex justify-end">
        
      </div>

      {/* Loading Animation */}
      {(loadingBarang || loadingKategori) && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-bars loading-lg" aria-label="Loading"></span>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {barang.length > 0 ? (
          barang.map((item, index) => (
            <BarangCard key={item.alat_id ?? index} {...item} />
          ))
        ) : !loadingBarang && (
          <p className="text-gray-500 text-center w-full">
            Tidak ada barang tersedia.
          </p>
        )}
      </div>
    </div>
  );
};

export default BarangList;