import Link from "next/link";
import React from "react";

const Password = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto">Reset Password</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary">Kirim Link Reset</button>
            </div>
          </form>
          <p className="text-center text-sm mt-2">
            <Link href="/login" className="text-blue-500">
              Kembali ke Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Password;
