"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom"; // Untuk React Portal
import { registerUser } from "@/app/utils/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    admin_username: "",
    admin_email: "",
    admin_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal sukses

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(formData);
      console.log("Registrasi berhasil:", response);
      setIsModalOpen(true); // Tampilkan modal sukses
    } catch (error) {
      console.error("Registrasi gagal:", error);
      setError("Registrasi gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/login"); // Redirect ke halaman login setelah sukses
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DFF2EB]">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto text-[#050315]">Daftar</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Input untuk admin_username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#050315]">Username</span>
              </label>
              <input
                type="text"
                name="admin_username"
                placeholder="Masukkan username"
                className="input input-bordered border-[#4A628A] focus:border-[#7AB2D3] focus:outline-none"
                required
                value={formData.admin_username}
                onChange={handleChange}
              />
            </div>

            {/* Input untuk admin_email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#050315]">Email</span>
              </label>
              <input
                type="email"
                name="admin_email"
                placeholder="Masukkan email"
                className="input input-bordered border-[#4A628A] focus:border-[#7AB2D3] focus:outline-none"
                required
                value={formData.admin_email}
                onChange={handleChange}
              />
            </div>

            {/* Input untuk admin_password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#050315]">Password</span>
              </label>
              <input
                type="password"
                name="admin_password"
                placeholder="Masukkan password"
                className="input input-bordered border-[#4A628A] focus:border-[#7AB2D3] focus:outline-none"
                required
                value={formData.admin_password}
                onChange={handleChange}
              />
            </div>

            {/* Tombol Submit */}
            <div className="form-control mt-4">
              <button
                className={`btn bg-[#B9E5E8] text-[#050315] border-none hover:bg-[#7AB2D3] ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Mendaftarkan..." : "Daftar"}
              </button>
            </div>
          </form>

          {/* Link untuk Login */}
          <p className="text-center text-sm mt-2 text-[#050315]">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-[#7AB2D3] hover:text-[#4A628A]">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Modal sukses */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-bold text-[#050315] mb-4">
                Registrasi Berhasil
              </h3>
              <p className="text-[#050315] mb-4">
                Akun Anda berhasil dibuat. Silakan login.
              </p>
              <div className="flex justify-end">
                <button
                  className="btn bg-[#B9E5E8] text-[#050315] border-none hover:bg-[#7AB2D3] transition duration-300 ease-in-out"
                  onClick={closeModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}