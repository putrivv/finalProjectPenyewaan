import Link from "next/link";
import React from "react";

const Guest = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#DFF2EB]">
      {/* Navbar */}
      <div className="navbar bg-[#DFF2EB] border-b border-gray-300 px-40">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold text-gray-800">
            MyWebsite
          </Link>
        </div>
        {/* Menu untuk layar besar */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-800">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        {/* Dropdown menu untuk layar kecil */}
        <div className="flex lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-gray-800">
              ☰
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 border border-gray-400 bg-[#DFF2EB] rounded-box w-52 text-gray-800">
              <li><Link href="/about">Barang</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center h-screen">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12">
          {/* Bagian Teks */}
          <div className=" pl-32 mt-0 mb-32 md:w-1/2 text-center md:text-left">
            <h1 className="text-6xl font-bold text-gray-800">
              Selamat Datang <span className="text-teal-600 "><br></br>di Sewa</span>
              Barang
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Discover the best services and experience the future with us.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#B9E5E8] text-gray-800 font-semibold rounded-lg shadow-md hover:bg-teal-600">
             lihat barang
            </button>
          </div>

          {/* Bagian Gambar */}
          <div className="ml-24 mb-20 md:w-1/2 flex justify-center">
            <img src="/hero-image.svg" alt="Hero Illustration" className="w-80 md:w-full"/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Guest;
