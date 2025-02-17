import React from "react";

const Beranda = () => {
  // Data dummy untuk keperluan demo
  const totalAlat = 50; // Total alat yang tersedia
  const totalPelanggan = 120; // Total pelanggan terdaftar
  const alatDisewa = 30; // Total alat yang sedang disewa

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Dashboard Admin Penyewaan
      </h1>
      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Card Total Alat */}
        <div className="card bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg p-4">
          <div className="card-body items-center text-center">
            <h2 className="card-title justify-center text-lg">Total Alat</h2>
            <p className="text-3xl font-bold">{totalAlat}</p>
          </div>
        </div>
        {/* Card Total Pelanggan */}
        <div className="card bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg p-4">
          <div className="card-body items-center text-center">
            <h2 className="card-title justify-center text-lg">Total Pelanggan</h2>
            <p className="text-3xl font-bold">{totalPelanggan}</p>
          </div>
        </div>
        {/* Card Alat yang Disewa */}
        <div className="card bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg p-4">
          <div className="card-body items-center text-center">
            <h2 className="card-title justify-center text-lg">Alat yang Disewa</h2>
            <p className="text-3xl font-bold">{alatDisewa}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;