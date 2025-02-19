"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBarang } from "@/app/utils/api";
import { ListBarang } from "@/app/(guest)/listbarang/listbarang.type";

const BarangCard: React.FC<ListBarang> = ({
  alat_nama,
  alat_deskripsi,
  alat_stok,
  alat_hargaperhari,
  alat_gambar,
}) => {
  return (
    <div className="relative w-72 bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden flex flex-col h-72 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="h-40 flex items-center justify-center bg-gray-200">
        {alat_gambar ? (
          <img
            src={alat_gambar}
            alt={alat_nama}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-lg font-medium">
            📷 Tidak ada gambar
          </span>
        )}
      </div>
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
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBarang();
        console.log("Data fetched:", data);

        if (Array.isArray(data)) {
          setBarang(data);
        } else {
          setError("Format data tidak valid");
        }
      } catch (err: unknown) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    // Pastikan hanya dijalankan di client
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#DFF2EB] min-h-screen">
      {loading && <p className="text-gray-700">Memuat data...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-wrap gap-6 justify-center">
          {barang.length > 0
            ? barang.map((item) => <BarangCard key={item.alat_id} {...item} />)
            : !loading && (
                <p className="text-gray-500">Tidak ada barang tersedia.</p>
              )}
        </div>
      </div>
    </div>
  );
};

export default BarangList;
