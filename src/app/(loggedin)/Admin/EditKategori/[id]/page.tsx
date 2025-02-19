"use client";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import ikon dari react-icons
import { Kategori } from "@/app/(loggedin)/Admin/TambahKategori/TambahKategori.type";
import { updateKategori, getKategoriById } from "@/app/utils/api";
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
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Notifikasi Box */}
      <div
        className={`relative p-8 rounded-2xl shadow-lg text-center ${
          isError ? "bg-red-50 text-red-500" : "bg-gray-50 text-green-500"
        }`}
      >
        {/* Ikon Besar */}
        <div className="mb-4">
          {isError ? (
            <FaExclamationCircle className="text-6xl mx-auto text-red-500" />
          ) : (
            <FaCheckCircle className="text-6xl mx-auto text-green-500" />
          )}
        </div>
        {/* Pesan */}
        <p className="text-base font-light">{message}</p>
      </div>
    </div>,
    document.body // Tempatkan notifikasi di dalam body
  );
};

export default function EditKategori() {
  const { id } = useParams();
  const [formData, setFormData] = useState<Kategori>({
    kategori_id: id,
    kategori_nama: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Kategori ID:", id); // Debugging
    const fetchKategori = async () => {
      try {
        const result = await getKategoriById(id);
        console.log("Data kategori yang diambil:", result.data); // Debugging
        setFormData(result.data);
      } catch (error) {
        console.error("Error fetching kategori:", error); // Debugging
        setMessage("Gagal mengambil data kategori");
        setIsError(true);
      }
    };
    fetchKategori();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateKategori(formData);
      setMessage("Kategori berhasil diperbarui!");
      setIsError(false);

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => {
        setMessage(null);
        router.push("/Admin/Kategori");
      }, 2000);
    } catch (error) {
      setMessage("Gagal memperbarui kategori");
      setIsError(true);

      // Hilangkan notifikasi setelah 2 detik
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="p-4">
      {/* Render Notifikasi (Portal) */}
      {message && (
        <Notification
          message={message}
          isError={isError}
          onClose={() => setMessage(null)}
        />
      )}


      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Edit Kategori</h1>
          <div>
            <label className="block text-sm font-medium">ID</label>
            <input
              type="text"
              value={id}
              readOnly
              className="input input-bordered w-full mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama Kategori</label>
            <input
              type="text"
              name="kategori_nama"
              value={formData.kategori_nama || ""}
              onChange={handleChange}
              placeholder="Masukkan Nama Kategori"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full bg-[#d1fae5] text-[#050315] hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
            >
              Perbarui Kategori
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}