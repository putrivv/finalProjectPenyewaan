"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { Pelanggan } from "@/app/(loggedin)/Admin/Pelanggan/pelanggan.type";
import { getPelanggan, deletePelanggan } from "@/app/utils/api";

export default function ListPelangganPage() {
  const [search, setSearch] = useState("");
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const result = await getPelanggan();
        if (result.success && Array.isArray(result.data)) {
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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus pelanggan ini?"
    );
    if (confirmDelete) {
      try {
        await deletePelanggan(id);
        setPelanggan(pelanggan.filter((item) => item.pelanggan_id !== id));
      } catch (error) {
        console.error("Gagal menghapus pelanggan:", error);
      }
    }
  };

  const filteredPelanggan = pelanggan.filter((item) =>
    item.pelanggan_nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Pelanggan</h1>
      <hr className="border-t-2 border-[#4ac786] mb-4" />
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Cari pelanggan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
        />
        <Link href="/Admin/AddPelanggan">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow-md hover:shadow-lg transition duration-300">
            <FaPlus className="text-xs" /> Tambah Pelanggan
          </button>
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-bars loading-xs"></span>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto text-sm">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
            <thead className="bg-green-100">
              <tr className="text-center">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Nama</th>
                <th className="p-3 border">Alamat</th>
                <th className="p-3 border">No. Telepon</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Detail</th>
                <th className="p-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPelanggan.length > 0 ? (
                filteredPelanggan.map((item) => (
                  <tr
                    key={item.pelanggan_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border text-center">
                      {item.pelanggan_id}
                    </td>
                    <td className="p-3 border">{item.pelanggan_nama}</td>
                    <td className="p-3 border">{item.pelanggan_alamat}</td>
                    <td className="p-3 border">{item.pelanggan_notelp}</td>
                    <td className="p-3 border">{item.pelanggan_email}</td>
                    <td className="p-3 border text-center">
                      <Link href={`/Admin/DataPelanggan/${item.pelanggan_id}`}>
                        <button className="btn btn-sm btn-outline">
                          <FaEllipsisV className="text-gray-700" size={10} />
                        </button>
                      </Link>
                    </td>
                    <td className="p-3 border text-center flex justify-center gap-3">
                      <Link href={`/Admin/EditPelanggan/${item.pelanggan_id}`}>
                        <FaEdit
                          className="text-yellow-500 cursor-pointer"
                          size={18}
                        />
                      </Link>
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        size={18}
                        onClick={() => handleDelete(item.pelanggan_id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
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
