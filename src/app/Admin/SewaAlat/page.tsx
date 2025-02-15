import React from "react";

const SewaAlat = () => {
  return (
    <div className="container mx-auto p-5 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Input Sewa Barang</h1>
      <form className="card bg-base-100 shadow-xl p-6">
        <div className="form-control mb-4">
          <label className="label font-semibold">Nama Barang</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Masukkan nama barang"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label font-semibold">Harga Sewa (Rp)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Masukkan harga sewa"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label font-semibold">URL Gambar</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Masukkan URL gambar"
          />
        </div>
        <button type="button" className="btn btn-primary w-full">
          Simpan
        </button>
      </form>

      <div className="mt-6 card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Hasil Sewa Barang
        </h2>
        <div className="text-center">
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
            Gambar
          </div>
          <h3 className="text-xl font-semibold mt-4">Nama Barang</h3>
          <p className="text-lg font-medium text-gray-600">Rp 0 / hari</p>
        </div>
      </div>
    </div>
  );
};

export default SewaAlat;
