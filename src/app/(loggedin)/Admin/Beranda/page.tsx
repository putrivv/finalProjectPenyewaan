import React from "react";

const Beranda = () => {
  // Data dummy untuk keperluan demo
  const totalAlat = 50; // Total alat yang tersedia
  const totalPelanggan = 120; // Total pelanggan terdaftar
  const alatDisewa = 30; // Total alat yang sedang disewa

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="bg-primary rounded-lg p-6 mb-6 flex items-center justify-between">
        {/* Logo dan Welcome Text */}
        <div className="flex items-center space-x-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current text-blue-500"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Welcome To Dashboard</h1> 
            <h6 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">ADMIN</h6>
        </div>
      </div>

      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Card Total Alat */}
        <div
          className="rounded-lg p-4 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
          style={{ backgroundColor: '#B9E5E8', color: '#050315' }}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-md font-semibold">Total Alat</h2>
            <p className="text-2xl font-bold">{totalAlat}</p>
          </div>
        </div>

        {/* Card Total Pelanggan */}
        <div
          className="rounded-lg p-4 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
          style={{ backgroundColor: '#7AB2D3', color: '#050315' }}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-md font-semibold">Total Pelanggan</h2>
            <p className="text-2xl font-bold">{totalPelanggan}</p>
          </div>
        </div>

        {/* Card Alat yang Disewa */}
        <div
          className="rounded-lg p-4 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
          style={{ backgroundColor: '#4A628A', color: '#FFFFFF' }}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-md font-semibold">Alat yang Disewa</h2>
            <p className="text-2xl font-bold">{alatDisewa}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;