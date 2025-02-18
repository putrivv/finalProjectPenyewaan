"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const EquipmentCard = ({ name, stock, price, category }) => {
  return (
    <div className="relative w-72 bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden flex flex-col h-64 hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Kategori di pojok atas */}
      <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow">
        {category}
      </div>

      {/* Placeholder gambar */}
      <div className="h-40 bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-lg font-medium">📷 Gambar</span>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <h2 className="text-lg font-bold text-gray-900">{name}</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p>Stok: <span className="font-semibold">{stock}</span></p>
          <p>Harga: <span className="text-emerald-600 font-semibold">{price}</span></p>
        </div>
      </div>
    </div>
  );
};

const EquipmentList = () => {
  const router = useRouter(); // Inisialisasi useRouter
  const equipment = [
    { name: "Bor Listrik", stock: 5, price: "Rp 750.000", category: "Peralatan Listrik" },
    { name: "Gergaji Mesin", stock: 3, price: "Rp 1.200.000", category: "Peralatan Kayu" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-[#DFF2EB] min-h-screen">
      {/* Container untuk tombol "Kembali" */}
      <div className="w-full max-w-6xl px-4"> {/* Tambahkan container dengan lebar maksimal dan padding */}
        <button
          onClick={() => router.back()} // Fungsi untuk kembali ke halaman sebelumnya
          className="mb-8 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Kembali
        </button>
      </div>

      {/* Daftar Equipment */}
      <div className="w-full max-w-6xl px-4"> {/* Container untuk daftar peralatan */}
        <div className="flex flex-wrap gap-6 justify-center">
          {equipment.map((item, index) => (
            <EquipmentCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentList;