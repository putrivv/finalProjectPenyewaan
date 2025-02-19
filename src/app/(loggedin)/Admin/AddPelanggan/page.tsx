"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

interface FormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  guaranteeType: string;
  file: FileList;
}

export default function AddPelanggan() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Simulasi pengiriman data ke API
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("guaranteeType", data.guaranteeType);
      formData.append("file", data.file[0]);

      // Kirim data ke server (gunakan endpoint sesuai kebutuhan)
      const response = await fetch("/api/pelanggan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan pelanggan.");
      }

      setSuccessMessage("Pelanggan berhasil ditambahkan!");
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat menambahkan pelanggan.");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Tambah Pelanggan</h1>
      <hr className="border-t-2 border-[#d1fae5] mb-4" />

      {/* Success or Error Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nama
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Nama wajib diisi." })}
            className="input input-bordered w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Alamat */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Alamat
          </label>
          <textarea
            id="address"
            {...register("address", { required: "Alamat wajib diisi." })}
            className="input input-bordered w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Nomor Telepon */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Nomor telepon wajib diisi.",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Nomor telepon tidak valid.",
              },
            })}
            className="input input-bordered w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email wajib diisi.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format email tidak valid.",
              },
            })}
            className="input input-bordered w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Jenis Jaminan */}
        <div>
          <label htmlFor="guaranteeType" className="block text-sm font-medium mb-1">
            Jenis Jaminan
          </label>
          <select
            id="guaranteeType"
            {...register("guaranteeType", { required: "Jenis jaminan wajib dipilih." })}
            className="input input-bordered w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
          >
            <option value="">Pilih jenis jaminan</option>
            <option value="KTP">KTP</option>
            <option value="SIM">SIM</option>
            <option value="Passport">Passport</option>
          </select>
          {errors.guaranteeType && (
            <p className="text-red-500 text-sm mt-1">{errors.guaranteeType.message}</p>
          )}
        </div>

        {/* Unggah File */}
        <div>
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Unggah File Jaminan
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register("file", { required: "File jaminan wajib diunggah." })}
              className="file-input file-input-bordered w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-green-200"
            />
            <FaUpload className="text-green-500 text-xl" />
          </div>
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`btn px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}