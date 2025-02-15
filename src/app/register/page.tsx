import React from "react";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto">Register</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan username"
                className="input input-bordered"
                required
              />
            </div>
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
            <div className="form-control mt-4">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="text-center text-sm mt-2">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
