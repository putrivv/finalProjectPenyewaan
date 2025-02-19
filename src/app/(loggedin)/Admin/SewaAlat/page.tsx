"use client"; // Menandai komponen ini sebagai Client Component
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPenyewaan } from "@/app/utils/api"; // Import fungsi getPenyewaan
import { Penyewaan } from "@/app/(loggedin)/Admin/SewaAlat/penyewaan.type"; // Import tipe Penyewaan

const SewaAlat = () => {
  const [search, setSearch] = useState("");
  const [penyewaan, setPenyewaan] = useState<Penyewaan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenyewaan = async () => {
      try {
        const result = await getPenyewaan();
        // Validasi respons API
        if (result.success && Array.isArray(result.data)) {
          // Filter hanya penyewaan yang valid
          const validPenyewaan = result.data.filter(
            (item) =>
              typeof item.penyewaan_id === "number" &&
              typeof item.penyewaan_pelanggan_id === "number" &&
              typeof item.penyewaan_tglsewa === "string" &&
              typeof item.penyewaan_tglkembali === "string" &&
              typeof item.penyewaan_sttspembayaran === "string" &&
              typeof item.penyewaan_sttskembali === "string" &&
              typeof item.penyewaan_totalharga === "number"
          );
          setPenyewaan(validPenyewaan);
        } else {
          throw new Error("Data tidak valid.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPenyewaan();
  }, []);

  // Filtering items based on the search keyword
  const filteredPenyewaan = penyewaan.filter((item) =>
    item.penyewaan_pelanggan_id.toString().includes(search.toLowerCase()) ||
    item.penyewaan_sttspembayaran.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Daftar Penyewaan</h1>

      {/* Search Bar and Button Container */}
      <div className="flex justify-between items-center mt-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari penyewaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        {/* Button Tambah Penyewaan */}
        <Link href="/Admin/AddPenyewaan">
          <button className="btn btn-primary flex items-center gap-2">
            Tambah Penyewaan
          </button>
        </Link>
      </div>

      {/* Loading or Error message */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Data table */}
      {!loading && !error && (
        <table className="table table-zebra w-full mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Pelanggan</th>
              <th>Tanggal Disewa</th>
              <th>Tanggal Kembali</th>
              <th>Status Pembayaran</th>
              <th>Status Kembali</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {filteredPenyewaan.length > 0 ? (
              filteredPenyewaan.map((item) => (
                <tr key={item.penyewaan_id}>
                  <td>{item.penyewaan_id}</td>
                  <td>{item.penyewaan_pelanggan_id}</td>
                  <td>{item.penyewaan_tglsewa}</td>
                  <td>{item.penyewaan_tglkembali}</td>
                  <td>{item.penyewaan_sttspembayaran}</td>
                  <td>{item.penyewaan_sttskembali}</td>
                  <td>{item.penyewaan_totalharga.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  Tidak ada data penyewaan ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SewaAlat;