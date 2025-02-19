"use client";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Penyewaan } from "@/app/(loggedin)/Admin/SewaAlat/penyewaan.type";
import { getPenyewaanById, updatePenyewaan } from "@/app/utils/api";
import { useParams, useRouter } from "next/navigation";

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

export default function EditPenyewaan() {
  const { id } = useParams();
  const [formData, setFormData] = useState<Penyewaan>({
    penyewaan_id: Number(id),
    penyewaan_pelanggan_id: 0,
    penyewaan_tglsewa: "",
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "",
    penyewaan_sttskembali: "",
    penyewaan_totalharga: 0,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPenyewaan = async () => {
      try {
        const result = await getPenyewaanById(Number(id));
        setFormData(result.data);
      } catch (error) {
        setMessage("Gagal mengambil data penyewaan");
        setIsError(true);
      }
    };
    fetchPenyewaan();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "penyewaan_totalharga" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePenyewaan(Number(id), formData);
      setMessage("Penyewaan berhasil diperbarui!");
      setIsError(false);
      setTimeout(() => {
        setMessage(null);
        router.push("/Admin/SewaAlat");
      }, 2000);
    } catch (error) {
      setMessage("Gagal memperbarui penyewaan");
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
        <h1 className="text-3xl font-bold">Edit Penyewaan</h1>
        <div>
          <label className="block text-sm font-medium">ID</label>
          <input type="text" value={id} readOnly className="input input-bordered w-full mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">ID Pelanggan</label>
          <input
            type="number"
            name="penyewaan_pelanggan_id"
            value={formData.penyewaan_pelanggan_id}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tanggal Disewa</label>
          <input
            type="date"
            name="penyewaan_tglsewa"
            value={formData.penyewaan_tglsewa}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tanggal Kembali</label>
          <input
            type="date"
            name="penyewaan_tglkembali"
            value={formData.penyewaan_tglkembali}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Total Harga</label>
          <input
            type="number"
            name="penyewaan_totalharga"
            value={formData.penyewaan_totalharga}
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
            Perbarui Penyewaan
          </button>
        </div>
      </form>
    </div>
  );
}