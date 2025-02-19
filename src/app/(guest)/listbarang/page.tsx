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
      <div className="relative bg-white border border-gray-300 shadow-lg rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 p-4 w-[250px] min-h-[100px] hover:shadow-xl hover:scale-105">
        <h2 className="text-lg font-bold text-gray-900">{alat_nama}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {alat_deskripsi ?? "Deskripsi tidak tersedia"}
        </p>
        <div className="mt-auto text-sm text-gray-700">
          <p>
            Stok:{" "}
            <span className="font-semibold">
              {alat_stok ?? "Tidak tersedia"}
            </span>
          </p>
          <p>
            Harga per hari:{" "}
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
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn m-1 bg-white">
            Kategori
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => setKategori("")}>Semua Kategori</a>
            </li>
            {kategoriList.map((item) => (
              <li key={item.id}>
                <a onClick={() => setKategori(item.nama)}>{item.nama}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {loadingBarang || loadingKategori ? (
        <div className="flex justify-center items-center min-h-screen">
          <span
            className="loading loading-bars loading-xs"
            aria-label="Loading"
          ></span>
        </div>
      ) : null}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {barang.length > 0
          ? barang.map((item, index) => (
              <BarangCard key={item.alat_id ?? index} {...item} />
            ))
          : !loadingBarang && (
              <p className="text-gray-500 text-center w-full">
                Tidak ada barang tersedia.
              </p>
            )}
      </div>
    </div>
  );
};

export default BarangList;
