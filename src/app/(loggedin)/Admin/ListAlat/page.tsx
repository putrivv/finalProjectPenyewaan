"use client";

import { useState, useEffect } from "react";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
}

export default function RentalListPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Daftar Barang Penyewaan</h1>
      <input
        type="text"
        placeholder="Cari barang..."
        className="input input-bordered w-full mb-4 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="text-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
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
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border text-center">{item.id}</td>
                    <td className="p-3 border">{item.name}</td>
                    <td className="p-3 border text-center">{item.category}</td>
                    <td className="p-3 border text-center font-medium">
                      {item.price.toLocaleString()}
                    </td>
                    <td className="p-3 border text-center">
                      <span
                        className={`px-3 py-1 rounded-md text-white text-sm font-medium ${
                          item.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {item.available ? "Tersedia" : "Tidak Tersedia"}
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
