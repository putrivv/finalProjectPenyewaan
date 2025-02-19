"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPelangganById, updatePelanggan } from "@/app/utils/api";
import { PelangganInput } from "@/app/(loggedin)/Admin/AddPelanggan/addpelanggan.type";

const EditPelanggan = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<PelangganInput>({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_notelp: "",
    pelanggan_email: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const result = await getPelangganById(Number(id));
        setFormData(result.data);
      } catch (error) {
        setMessage("Gagal mengambil data pelanggan");
        setIsError(true);
      }
    };
    fetchPelanggan();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePelanggan(Number(id), formData);
      setMessage("Data pelanggan berhasil diperbarui!");
      setIsError(false);
      setTimeout(() => {
        setMessage(null);
        router.push("/Admin/Pelanggan");
      }, 2000);
    } catch (error) {
      setMessage("Gagal memperbarui data pelanggan");
      setIsError(true);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Pelanggan</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nama Pelanggan</label>
          <input
            type="text"
            name="pelanggan_nama"
            value={formData.pelanggan_nama}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Alamat Pelanggan</label>
          <textarea
            name="pelanggan_alamat"
            value={formData.pelanggan_alamat}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
          <input
            type="text"
            name="pelanggan_notelp"
            value={formData.pelanggan_notelp}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Email Pelanggan</label>
          <input
            type="email"
            name="pelanggan_email"
            value={formData.pelanggan_email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Perbarui</button>
        </div>
      </form>
      {message && (
        <div className={`alert mt-6 ${isError ? "alert-error" : "alert-success"} max-w-lg mx-auto`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default EditPelanggan;
