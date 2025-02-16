import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto">Login</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email atau Username</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan email atau username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <Link href="/forgotpassword" className="text-blue-500">
                Lupa Password?
              </Link>
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center text-sm mt-2">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-500">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
