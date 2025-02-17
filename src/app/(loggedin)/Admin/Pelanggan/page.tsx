"use client"
import { useState, useEffect } from "react";

interface Pelanggan {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export default function ListPelangganPage() {
  const [search, setSearch] = useState("");
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const response = await fetch("/api/pelanggan"); 
        const data = await response.json();
        setPelanggan(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPelanggan();
  }, []);

  const filteredPelanggan = pelanggan.filter((pelanggan) =>
    pelanggan.name.toLowerCase().includes(search.toLowerCase()) ||
    pelanggan.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Daftar Pelanggan</h1>
      <input
        type="text"
        placeholder="Cari pelanggan..."
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
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPelanggan.length > 0 ? (
                filteredPelanggan.map((pelanggan) => (
                  <tr key={pelanggan.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border text-center">{pelanggan.id}</td>
                    <td className="p-3 border">{pelanggan.name}</td>
                    <td className="p-3 border">{pelanggan.email}</td>
                    <td className="p-3 border text-center">
                      <span
                        className={`px-3 py-1 rounded-md text-white text-sm font-medium ${
                          pelanggan.active ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {pelanggan.active ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="p-3 border text-center">
                      <button className="btn btn-sm btn-warning mr-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Hapus</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Tidak ada pelanggan ditemukan
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
