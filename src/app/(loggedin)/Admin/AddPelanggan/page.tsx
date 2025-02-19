"use client";
import React, { useState } from "react";
import { addPelanggan } from "@/app/utils/api";
import { PelangganInput } from "@/app/(loggedin)/Admin/AddPelanggan/addpelanggan.type";

const AddPelanggan = () => {
  const [formData, setFormData] = useState<PelangganInput>({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_notelp: "",
    pelanggan_email: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validasi input
      if (
        !formData.pelanggan_nama ||
        !formData.pelanggan_alamat ||
        !formData.pelanggan_notelp ||
        !formData.pelanggan_email
      ) {
        throw new Error("Semua field harus diisi.");
      }

      // Siapkan FormData untuk dikirim
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Kirim data ke server
      const result = await addPelanggan(formDataToSend);
      console.log("Respon dari server:", result);

      // Tampilkan pesan sukses
      setMessage("Data pelanggan berhasil disimpan!");
      setIsError(false);

      // Reset form
      setFormData({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_notelp: "",
        pelanggan_email: "",
      });
    } catch (error) {
      let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
      if (error instanceof Error) {
        errorMessage = error.message;

        // Handle token tidak valid atau kedaluwarsa
        if (
          errorMessage.includes("Akses ditolak") ||
          errorMessage.includes("Token tidak valid")
        ) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      }
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tambah Pelanggan</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        {/* Nama Pelanggan */}
        <div className="mb-4">
          <label htmlFor="pelanggan_nama" className="block text-sm font-medium mb-2">
            Nama Pelanggan
          </label>
          <input
            type="text"
            id="pelanggan_nama"
            name="pelanggan_nama"
            value={formData.pelanggan_nama}
            onChange={handleChange}
            placeholder="Masukkan Nama Pelanggan"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Alamat Pelanggan */}
        <div className="mb-4">
          <label htmlFor="pelanggan_alamat" className="block text-sm font-medium mb-2">
            Alamat Pelanggan
          </label>
          <textarea
            id="pelanggan_alamat"
            name="pelanggan_alamat"
            value={formData.pelanggan_alamat}
            onChange={handleChange}
            placeholder="Masukkan Alamat Pelanggan"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Nomor Telepon */}
        <div className="mb-4">
          <label htmlFor="pelanggan_notelp" className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <input
            type="text"
            id="pelanggan_notelp"
            name="pelanggan_notelp"
            value={formData.pelanggan_notelp}
            onChange={handleChange}
            placeholder="Masukkan Nomor Telepon"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email Pelanggan */}
        <div className="mb-6">
          <label htmlFor="pelanggan_email" className="block text-sm font-medium mb-2">
            Email Pelanggan
          </label>
          <input
            type="email"
            id="pelanggan_email"
            name="pelanggan_email"
            value={formData.pelanggan_email}
            onChange={handleChange}
            placeholder="Masukkan Email Pelanggan"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>

      {/* Pesan Feedback */}
      {message && (
        <div
          className={`alert mt-6 ${isError ? "alert-error" : "alert-success"} max-w-lg mx-auto`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddPelanggan;