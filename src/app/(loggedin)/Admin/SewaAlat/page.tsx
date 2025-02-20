"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPenyewaan, deletePenyewaan } from "@/app/utils/api";
import { Penyewaan } from "@/app/(loggedin)/Admin/SewaAlat/penyewaan.type";
import { FaPlus, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";

const SewaAlat = () => {
  const [search, setSearch] = useState("");
  const [penyewaan, setPenyewaan] = useState<Penyewaan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPenyewaan = async () => {
      try {
        const result = await getPenyewaan();
        if (result.success && Array.isArray(result.data)) {
          setPenyewaan(result.data);
        } else {
          throw new Error("Data tidak valid.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPenyewaan();
  }, []);

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deletePenyewaan(deleteId);
      setPenyewaan((prev) =>
        prev.filter((item) => item.penyewaan_id !== deleteId)
      );
      alert("Data berhasil dihapus!");
    } catch (error) {
      alert("Gagal menghapus data. Pastikan Anda memiliki izin.");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredPenyewaan = penyewaan.filter((item) =>
    item.penyewaan_id.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Penyewaan</h1>
      <hr className="border-t-2 border-[#4ac786] mb-4" />
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Cari penyewaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
        />
        <Link href="/Admin/AddPenyewaan">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow-md hover:shadow-lg transition duration-300">
            <FaPlus className="text-xs" /> Tambah Penyewaan
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
        <div className="overflow-x-auto text-xs text-center">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
            <thead className="bg-green-100">
              <tr className="text-center">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">ID Pelanggan</th>
                <th className="p-3 border">Tanggal Disewa</th>
                <th className="p-3 border">Tanggal Kembali</th>
                <th className="p-3 border">Status Pembayaran</th>
                <th className="p-3 border">Status Kembali</th>
                <th className="p-3 border">Total Harga</th>
                <th className="p-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPenyewaan.length > 0 ? (
                filteredPenyewaan.map((item) => (
                  <tr
                    key={item.penyewaan_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border text-center">
                      {item.penyewaan_id}
                    </td>
                    <td className="p-3 border text-center">
                      {item.penyewaan_pelanggan_id}
                    </td>
                    <td className="p-3 border">{item.penyewaan_tglsewa}</td>
                    <td className="p-3 border">{item.penyewaan_tglkembali}</td>
                    <td className="p-3 border">
                      {item.penyewaan_sttspembayaran}
                    </td>
                    <td className="p-3 border">{item.penyewaan_sttskembali}</td>
                    <td className="p-3 border">
                      {item.penyewaan_totalharga.toLocaleString()}
                    </td>
                    <td className="p-3 border text-center flex justify-center gap-3">
                      <Link href={`/Admin/EditPenyewaan/${item.penyewaan_id}`}>
                        <FaEdit
                          className="text-yellow-500 cursor-pointer"
                          size={18}
                        />
                      </Link>
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        size={18}
                        onClick={() => setDeleteId(item.penyewaan_id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-500">
                    Tidak ada penyewaan ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteId(null)}
              >
                Batal
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SewaAlat;
