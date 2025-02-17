import React from "react";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DFF2EB]">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto text-[#050315]">Register</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#050315]">Username</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan username"
                className="input input-bordered border-[#4A628A] focus:border-[#7AB2D3] focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#050315]">Email</span>
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="input input-bordered border-[#4A628A] focus:border-[#7AB2D3] focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#050315]">Password</span>
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="input input-bordered border-[#4A628A] focus:border-[#7AB2D3] focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button className="btn bg-[#B9E5E8] text-[#050315] border-none hover:bg-[#7AB2D3]">
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-sm mt-2 text-[#050315]">
            Sudah punya akun?{" "}
            <a href="/login" className="text-[#7AB2D3] hover:text-[#4A628A]">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;