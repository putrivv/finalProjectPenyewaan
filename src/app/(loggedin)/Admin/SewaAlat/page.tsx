"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPenyewaan, deletePenyewaan } from "@/app/utils/api";
import { Penyewaan } from "@/app/(loggedin)/Admin/SewaAlat/penyewaan.type";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

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
      setPenyewaan((prev) => prev.filter((item) => item.penyewaan_id !== deleteId));
      alert("Data berhasil dihapus!");
    } catch (error) {
      alert("Gagal menghapus data. Pastikan Anda memiliki izin.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Daftar Penyewaan</h1>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Cari penyewaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <Link href="/Admin/AddPenyewaan">
          <button className="btn btn-primary">Tambah Penyewaan</button>
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
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
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penyewaan.length > 0 ? (
              penyewaan.map((item) => (
                <tr key={item.penyewaan_id}>
                  <td>{item.penyewaan_id}</td>
                  <td>{item.penyewaan_pelanggan_id}</td>
                  <td>{item.penyewaan_tglsewa}</td>
                  <td>{item.penyewaan_tglkembali}</td>
                  <td>{item.penyewaan_sttspembayaran}</td>
                  <td>{item.penyewaan_sttskembali}</td>
                  <td>{item.penyewaan_totalharga.toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link href={`/Admin/EditPenyewaan/${item.penyewaan_id}`}>
                      <PencilIcon className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700" />
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setDeleteId(item.penyewaan_id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  Tidak ada data penyewaan ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn btn-danger" onClick={handleDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SewaAlat;
