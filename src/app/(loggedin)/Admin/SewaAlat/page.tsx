import React from "react";

const SewaAlat = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">FORM PENYEWAAN BARANG</h2>
      <form className="space-y-4">
        <div>
          <label className="block">Nama Barang</label>
          <input
            type="text"
            placeholder="Nama Barang"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block">Nama Pelanggan</label>
          <input
            type="text"
            placeholder="Nama Pelanggan"
            className="input input-bordered w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Tanggal Disewa</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block">Tanggal Kembali</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox" /> Sudah Kembali
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox" /> Sudah Dibayar
          </label>
        </div>
        <button className="btn btn-primary w-full">Simpan</button>
      </form>
    </div>
  );
};

export default SewaAlat;