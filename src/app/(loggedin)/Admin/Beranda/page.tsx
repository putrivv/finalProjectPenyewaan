"use client";
import { getAlat, getPelanggan } from "@/app/utils/api";
import React, { useEffect, useState } from "react";

// Komponen Card untuk menampilkan statistik
const StatCard = ({ title, value, bgColor, textColor }) => {
  return (
    <div
      className="rounded-lg p-6 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 shadow-md flex-1"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
};

const Beranda = () => {
  const [alat, setAlat] = useState<number | null>(null);
  const [pelanggan, setPelanggan] = useState<number | null>(null);
  const [pelangganData, setPelangganData] = useState([]); // Menyimpan data detail pelanggan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pelangganResponse, alatResponse] = await Promise.all([
          getPelanggan(),
          getAlat(),
        ]);

        if (pelangganResponse.success && alatResponse.success) {
          setAlat(alatResponse.data.length);
          setPelanggan(pelangganResponse.data.length);
          setPelangganData(pelangganResponse.data); // Simpan data detail pelanggan
        } else {
          throw new Error("Data tidak valid.");
        }
      } catch (err) {
        setError(err.message || "Gagal mengambil data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current text-white"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome To Dashboard</h1>
            <h6 className="font-bold text-xl text-white">ADMIN</h6>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-bars loading-xs"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Card Container */}
      {!loading && !error && (
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          {/* Card Total Alat */}
          <StatCard
            title="Total Alat"
            value={alat ?? "N/A"}
            bgColor="#B9E5E8"
            textColor="#050315"
          />
          {/* Card Total Pelanggan */}
          <StatCard
            title="Total Pelanggan"
            value={pelanggan ?? "N/A"}
            bgColor="#7AB2D3"
            textColor="#050315"
          />
        </div>
      )}

      {/* Data Pelanggan */}
      {!loading && !error && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-[#050315] mb-4">Data Pelanggan</h2>
          {pelangganData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-[#B9E5E8] text-[#050315]">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold">Nama Pelanggan</th>
                    <th className="py-3 px-4 text-left font-semibold">Email</th>
                    <th className="py-3 px-4 text-left font-semibold">No. Telepon</th>
                    <th className="py-3 px-4 text-left font-semibold">Alamat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pelangganData.map((pelanggan, index) => (
                    <tr
                      key={pelanggan.pelanggan_id} // Gunakan ID unik sebagai key
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-3 px-4">{pelanggan.pelanggan_nama}</td>
                      <td className="py-3 px-4">{pelanggan.pelanggan_email}</td>
                      <td className="py-3 px-4">{pelanggan.pelanggan_notelp}</td>
                      <td className="py-3 px-4">{pelanggan.pelanggan_alamat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4 bg-gray-100 rounded-lg shadow-sm">
              Belum ada data pelanggan.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Beranda;