"use client";
import { useState, useEffect } from "react";
import { Kategori } from "@/app/(loggedin)/Admin/TambahKategori/TambahKategori.type";
import { updateKategori, getKategoriById } from "@/app/utils/api";
import { useParams, useRouter } from "next/navigation";

export default function EditKategori({}) {
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
      router.push("/Admin/Kategori");
    } catch (error) {
      setMessage("Gagal memperbarui kategori");
      setIsError(true);
    }
  };

  return (
    <div className="p-4">
  {message && (
    <div
      className={`alert ${isError ? "alert-error" : "alert-success"} mb-4`}
    >
      {message}
    </div>
  )}
  <form onSubmit={handleSubmit} className="w-full max-w-lg">
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Edit Kategori</h1>

      <div>
        <label className="block text-sm font-medium">ID</label>
        <input
          type="text"
          value={id}
          readOnly
          className="input input-bordered"
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
        <button type="submit" className="btn btn-primary w-full">
          Perbarui Kategori
        </button>
      </div>
    </div>
  </form>
</div>

  );
}
