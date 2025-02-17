import React from "react";

const SewaAlat = () => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border-t-4 border-[#d1fae5]">
      <h2 className="text-xl font-bold mb-4 text-[#050315]">FORM PENYEWAAN BARANG</h2>
      <form className="space-y-4">
        {/* Nama Barang */}
        <div>
          <label className="block text-[#050315]">Nama Barang</label>
          <input
            type="text"
            placeholder="Nama Barang"
            className="input input-bordered w-full border-[#d1fae5] focus:border-[#d1fae5] focus:outline-none bg-white"
          />
        </div>

        {/* Nama Pelanggan */}
        <div>
          <label className="block text-[#050315]">Nama Pelanggan</label>
          <input
            type="text"
            placeholder="Nama Pelanggan"
            className="input input-bordered w-full border-[#d1fae5] focus:border-[#d1fae5] focus:outline-none bg-white"
          />
        </div>

        {/* Tanggal Disewa & Tanggal Kembali */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#050315]">Tanggal Disewa</label>
            <input
              type="date"
              className="input input-bordered w-full border-[#d1fae5] focus:border-[#d1fae5] focus:outline-none bg-white"
            />
          </div>
          <div>
            <label className="block text-[#050315]">Tanggal Kembali</label>
            <input
              type="date"
              className="input input-bordered w-full border-[#d1fae5] focus:border-[#d1fae5] focus:outline-none bg-white"
            />
          </div>
        </div>

        {/* Checkbox Sudah Kembali */}
        <div>
          <label className="flex items-center gap-2 text-[#050315]">
            <input
              type="checkbox"
              className="checkbox border-[#d1fae5] checked:bg-[#d1fae5]"
            />
            Sudah Kembali
          </label>
        </div>

        {/* Checkbox Sudah Dibayar */}
        <div>
          <label className="flex items-center gap-2 text-[#050315]">
            <input
              type="checkbox"
              className="checkbox border-[#d1fae5] checked:bg-[#d1fae5]"
            />
            Sudah Dibayar
          </label>
        </div>

        {/* Tombol Simpan */}
        <button className="btn bg-[#d1fae5] text-[#050315] border-none hover:bg-[#7AB2D3] w-full transition duration-300 ease-in-out">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default SewaAlat;