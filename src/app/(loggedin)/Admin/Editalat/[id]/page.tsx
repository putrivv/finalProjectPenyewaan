"use client";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Item } from "@/app/(loggedin)/Admin/ListAlat/ListAlat.types";
import { updateAlat, getAlatById } from "@/app/utils/api";
import { useParams, useRouter } from "next/navigation";

// Komponen Notifikasi (Portal)
const Notification = ({
  message,
  isError,
  onClose,
}: {
  message: string;
  isError: boolean;
  onClose: () => void;
}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div
        className={`relative p-8 rounded-2xl shadow-lg text-center ${
          isError ? "bg-red-50 text-red-500" : "bg-gray-50 text-green-500"
        }`}
      >
        <div className="mb-4">
          {isError ? (
            <FaExclamationCircle className="text-6xl mx-auto text-red-500" />
          ) : (
            <FaCheckCircle className="text-6xl mx-auto text-green-500" />
          )}
        </div>
        <p className="text-base font-light">{message}</p>
      </div>
    </div>,
    document.body
  );
};

export default function EditAlat() {
  const { id } = useParams();
  const [formData, setFormData] = useState<Item>({
    alat_id: id,
    alat_nama: "",
    alat_kategori_id: 0,
    alat_hargaperhari: 0,
    alat_stok: 0,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAlat = async () => {
      try {
        const result = await getAlatById(Number(id));
        setFormData(result.data);
      } catch (error) {
        setMessage("Gagal mengambil data alat");
        setIsError(true);
      }
    };
    fetchAlat();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "alat_hargaperhari" || name === "alat_stok" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateAlat(Number(id), formData);
      setMessage("Alat berhasil diperbarui!");
      setIsError(false);
      setTimeout(() => {
        setMessage(null);
        router.push("/Admin/ListAlat");
      }, 2000);
    } catch (error) {
      setMessage("Gagal memperbarui alat");
      setIsError(true);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="p-4">
      {message && (
        <Notification
          message={message}
          isError={isError}
          onClose={() => setMessage(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <h1 className="text-3xl font-bold">Edit Alat</h1>
        <div>
          <label className="block text-sm font-medium">ID</label>
          <input type="text" value={id} readOnly className="input input-bordered w-full mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Nama Alat</label>
          <input
            type="text"
            name="alat_nama"
            value={formData.alat_nama}
            onChange={handleChange}
            placeholder="Masukkan Nama Alat"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Harga per Hari (IDR)</label>
          <input
            type="number"
            name="alat_hargaperhari"
            value={formData.alat_hargaperhari}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stok</label>
          <input
            type="number"
            name="alat_stok"
            value={formData.alat_stok}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full bg-[#d1fae5] text-[#050315] hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
          >
            Perbarui Data
          </button>
        </div>
      </form>
    </div>
  );
}
