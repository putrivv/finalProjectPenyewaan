"use client";
import { useState, useEffect } from "react";

interface Item {
  alat_id: number;
  alat_nama: string;
  alat_kategori_id: number;
  alat_hargaPerhari: number;
  alat_stok: number;
}

export default function RentalListPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Menggunakan relative path '/api/alat' untuk memanfaatkan proxy
        const response = await fetch("api/alat");

        // Periksa apakah respons statusnya OK (200)
        if (!response.ok) {
          throw new Error("Gagal mengambil data.");
        }

        const data = await response.json();

        // Pastikan data sesuai dengan struktur yang kita harapkan
        if (Array.isArray(data.data)) {
          setItems(data.data);
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
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Daftar Barang Penyewaan</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Cari barang..."
        className="input input-bordered w-full mb-4 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading or Error message */}
      {loading && (
        <div className="text-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      {error && (
        <div className="text-center py-4 text-red-500">
          <span>{error}</span>
        </div>
      )}

      {/* Data table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Nama</th>
                <th className="p-3 border">Kategori</th>
                <th className="p-3 border">Harga (IDR)</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr
                    key={item.alat_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border text-center">{item.alat_id}</td>
                    <td className="p-3 border">{item.alat_nama}</td>
                    <td className="p-3 border text-center">
                      {item.alat_kategori_id}
                    </td>
                    <td className="p-3 border text-center font-medium">
                      {item.alat_hargaPerhari.toLocaleString()}
                    </td>
                    <td className="p-3 border text-center">
                      <span
                        className={`px-3 py-1 rounded-md text-white text-sm font-medium ${
                          item.alat_stok > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {item.alat_stok > 0 ? "Tersedia" : "Tidak Tersedia"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Tidak ada barang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
