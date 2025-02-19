"use client";
import { useState, useEffect } from "react";
import { getAlat } from "@/app/utils/api"; // Import fungsi getAlat
import { Item } from "@/app/(loggedin)/Admin/ListAlat/ListAlat.types"; // Import tipe Item
import { FaPlus } from "react-icons/fa"; // Import ikon dari react-icons
import Link from "next/link";

export default function RentalListPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getAlat();
        // Validasi respons API
        if (result.success && Array.isArray(result.data)) {
          // Filter hanya item yang valid
          const validItems = result.data.filter(
            (item) =>
              typeof item.alat_id === "number" &&
              typeof item.alat_nama === "string" &&
              typeof item.alat_kategori_id === "number" &&
              typeof item.alat_hargaperhari === "number" &&
              typeof item.alat_stok === "number"
          );
          setItems(validItems);
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
    fetchItems();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  // Filtering items based on the search keyword
  const filteredItems = items.filter((item) =>
    item.alat_nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Daftar Barang Penyewaan</h1>

      {/* Search Bar and Button Container */}
      <div className="flex justify-between items-center mt-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari barang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        {/* Button Tambah Alat */}
        <Link href="/admin/add-alat">
          <button className="btn btn-primary flex items-center gap-2">
            <FaPlus /> Tambah Alat
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
              <th>Nama Alat</th>
              <th>Kategori</th>
              <th>Harga (IDR)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.alat_id}>
                  <td>{item.alat_id}</td>
                  <td>{item.alat_nama}</td>
                  <td>{item.kategori.kategori_nama}</td>
                  <td>{item.alat_hargaperhari.toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.alat_stok > 0 ? "badge-success" : "badge-error"
                      }`}
                    >
                      {item.alat_stok > 0 ? "Tersedia" : "Tidak Tersedia"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  Tidak ada barang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}