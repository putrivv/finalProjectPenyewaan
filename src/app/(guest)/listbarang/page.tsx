"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBarang, getKategori } from "@/app/utils/api";
import { ListBarang } from "@/app/(guest)/listbarang/listbarang.type";

const BarangCard: React.FC<ListBarang> = ({
  alat_id,
  alat_nama,
  alat_deskripsi,
  alat_stok,
  alat_hargaperhari,
}) => {
  return (
    <div className="relative w-72 bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden flex flex-col h-72 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="p-4 flex flex-col flex-grow">
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
    </div>
  );
};

const BarangList: React.FC = () => {
  const [barang, setBarang] = useState<ListBarang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [kategori, setKategori] = useState<string>("");
  const [kategoriList, setKategoriList] = useState<
    { id: string; nama: string }[]
  >([]);

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
      }
    };
    fetchKategori();
  }, []);

  const fetchData = async (kategori?: string) => {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKategori = e.target.value;
    setKategori(selectedKategori);
    fetchData(selectedKategori);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-[#DFF2EB] min-h-screen">
      <div className="mb-6">
        <label htmlFor="kategori" className="mr-2 font-semibold text-gray-700">
          Filter Kategori:
        </label>
        <select
          id="kategori"
          value={kategori}
          onChange={handleKategoriChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((item) => (
            <option key={item.id} value={item.nama}>
              {item.nama}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-700">Memuat data...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-wrap gap-6 justify-center">
          {barang.length > 0
            ? barang.map((item, index) => (
                <BarangCard key={item.alat_id ?? index} {...item} />
              ))
            : !loading && (
                <p className="text-gray-500">Tidak ada barang tersedia.</p>
              )}
        </div>
      </div>
    </div>
  );
};

export default BarangList;