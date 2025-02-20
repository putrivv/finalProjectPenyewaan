"use client";
import Link from "next/link";
import React, { useState } from "react";
import { forgotPassword } from "@/app/utils/api";

const Password = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await forgotPassword({ email });
      setMessage("Link reset password telah dikirim ke email Anda.");
    } catch (error) {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DFF2EB]">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto text-[#050315]">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#050315]">Email</span>
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="input input-bordered border-[#4A628A] focus:border-[#7AB2D3] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn bg-[#B9E5E8] text-[#050315] border-none hover:bg-[#7AB2D3]"
                disabled={isLoading}
              >
                {isLoading ? "Mengirim..." : "Kirim Link Reset"}
              </button>
            </div>
          </form>
          {message && (
            <p className="text-center text-sm mt-2 text-[#050315]">{message}</p>
          )}
          <p className="text-center text-sm mt-2 text-[#050315]">
            <Link href="/login" className="text-[#7AB2D3] hover:text-[#4A628A]">
              Kembali ke Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Password;
