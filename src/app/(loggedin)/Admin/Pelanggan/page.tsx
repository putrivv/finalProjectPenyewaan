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
              typeof item.pelanggan_notelp === "string" && // Sesuaikan dengan tipe data API
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
    <div className="p-4">
      <h1 className="text-3xl font-bold">Daftar Pelanggan</h1>

      {/* Search Bar and Button Container */}
      <div className="flex justify-between items-center mt-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari pelanggan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        {/* Button Tambah Pelanggan */}
        <Link href="/Admin/AddPelanggan">
          <button className="btn btn-primary flex items-center gap-2">
            <FaPlus /> Tambah Pelanggan
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
              <th>Nama</th>
              <th>Alamat</th>
              <th>No. Telepon</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredPelanggan.length > 0 ? (
              filteredPelanggan.map((item) => (
                <tr key={item.pelanggan_id}>
                  <td>{item.pelanggan_id}</td>
                  <td>{item.pelanggan_nama}</td>
                  <td>{item.pelanggan_alamat}</td>
                  <td>{item.pelanggan_notelp}</td>
                  <td>{item.pelanggan_email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
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