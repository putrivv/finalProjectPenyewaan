"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { getPelangganById, updatePelanggan } from "@/app/utils/api";
import { PelangganInput } from "@/app/(loggedin)/Admin/AddPelanggan/addpelanggan.type";

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

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
    <div className="container mx-auto p-4">
      {/* Tampilkan Notifikasi */}
      {message && (
        <Notification
          message={message}
          isError={isError}
          onClose={() => setMessage(null)}
        />
      )}

      <h1 className="text-3xl font-bold mb-6">Edit Pelanggan</h1>
      <form onSubmit={handleSubmit} className="rounded-lg max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Nama Pelanggan
          </label>
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
          <label className="block text-sm font-medium mb-2">
            Alamat Pelanggan
          </label>
          <textarea
            name="pelanggan_alamat"
            value={formData.pelanggan_alamat}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
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
          <label className="block text-sm font-medium mb-2">
            Email Pelanggan
          </label>
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
          <button
            type="submit"
            className="btn btn-primary w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
          >
            Perbarui Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPelanggan;
