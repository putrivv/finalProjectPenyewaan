"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa"; // Import ikon dari react-icons
import Link from "next/link";
import { Pelanggan } from "@/app/(loggedin)/Admin/Pelanggan/pelanggan.type"; // Import tipe Pelanggan
import { getPelanggan } from "@/app/utils/api"; // Import fungsi getPelanggan

export default function ListPelangganPage() {
  const [search, setSearch] = useState("");
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const result = await getPelanggan(); // Menggunakan fungsi getPelanggan
        // Validasi respons API
        if (result.success && Array.isArray(result.data)) {
          // Filter hanya pelanggan yang valid
          const validPelanggan = result.data.filter(
            (item) =>
              typeof item.pelanggan_id === "number" &&
              typeof item.pelanggan_nama === "string" &&
              typeof item.pelanggan_alamat === "string" &&
              typeof item.pelanggan_notelp === "string" &&
              typeof item.pelanggan_email === "string"
          );
          setPelanggan(validPelanggan);
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
    fetchPelanggan();
  }, []);

  // Filtering items based on the search keyword
  const filteredPelanggan = pelanggan.filter((item) =>
    item.pelanggan_nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Pelanggan</h1>
      <hr className="border-t-2 border-[#d1fae5] mb-4" />

      {/* Search Bar and Button Container */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Cari pelanggan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
        />
        <Link href="/Admin/AddPelanggan">
          <button className="btn flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ml-4">
            <FaPlus /> Tambah Pelanggan
          </button>
        </Link>
      </div>

      {/* Loading or Error message */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Data table */}
      {!loading && !error && (
        <table className="table w-full border-collapse border border-gray-300">
          <thead className="bg-green-100">
            <tr className="text-center">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Alamat</th>
              <th className="p-3 border">No. Telepon</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPelanggan.length > 0 ? (
              filteredPelanggan.map((item) => (
                <tr key={item.pelanggan_id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border text-center">{item.pelanggan_id}</td>
                  <td className="p-3 border">{item.pelanggan_nama}</td>
                  <td className="p-3 border">{item.pelanggan_alamat}</td>
                  <td className="p-3 border">{item.pelanggan_notelp}</td>
                  <td className="p-3 border">{item.pelanggan_email}</td>
                  <td className="p-3 border text-center">
                    <Link href={`/Admin/DataPelanggan/${item.pelanggan_id}`}>
                      <button className="btn btn-sm btn-primary">Lihat</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Tidak ada pelanggan ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}