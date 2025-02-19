"use client"; // Menandai komponen ini sebagai Client Component
import React, { useState } from "react";
import ReactDOM from "react-dom";

const SewaAlat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka dan menutup modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-[#050315] text-center">
        Form Penyewaan Alat
      </h1>
      <hr className="border-t-2 border-[#d1fae5] mb-6" />

      {/* Form */}
      <form className="space-y-4">
        {/* Nama Barang */}
        <div>
          <label className="block text-sm font-medium text-[#050315] mb-2">
            Nama Barang
          </label>
          <input
            type="text"
            placeholder="Nama Barang"
            className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
          />
        </div>

        {/* Nama Pelanggan */}
        <div>
          <label className="block text-sm font-medium text-[#050315] mb-2">
            Nama Pelanggan
          </label>
          <input
            type="text"
            placeholder="Nama Pelanggan"
            className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
          />
        </div>

        {/* Tanggal Disewa & Tanggal Kembali */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#050315] mb-2">
              Tanggal Disewa
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#050315] mb-2">
              Tanggal Kembali
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-[#d1fae5] rounded-md focus:ring-2 focus:ring-[#7AB2D3] focus:border-transparent transition duration-300"
            />
          </div>
        </div>

        {/* Checkbox Sudah Kembali */}
        <div>
          <label className="flex items-center gap-2 text-sm text-[#050315]">
            <input
              type="checkbox"
              className="rounded border-[#d1fae5] text-[#7AB2D3] focus:ring-[#7AB2D3] focus:ring-offset-2"
            />
            Sudah Kembali
          </label>
        </div>

        {/* Checkbox Sudah Dibayar */}
        <div>
          <label className="flex items-center gap-2 text-sm text-[#050315]">
            <input
              type="checkbox"
              className="rounded border-[#d1fae5] text-[#7AB2D3] focus:ring-[#7AB2D3] focus:ring-offset-2"
            />
            Sudah Dibayar
          </label>
        </div>

        {/* Tombol Simpan */}
        <button
          type="button"
          className="w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
          onClick={openModal}
        >
          Simpan
        </button>
      </form>

      {/* Modal (Portal) */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-bold text-[#050315] mb-4 text-center">
                Konfirmasi Penyewaan
              </h3>
              <p className="text-sm text-[#050315] mb-6 text-center">
                Apakah Anda yakin ingin menyimpan data penyewaan ini?
              </p>
              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-gray-300 text-[#050315] font-medium rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-[#d1fae5] text-[#050315] font-medium rounded-md hover:bg-[#7AB2D3] hover:text-white transition duration-300 ease-in-out"
                  onClick={closeModal}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SewaAlat;