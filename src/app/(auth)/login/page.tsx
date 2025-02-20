"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import ReactDOM from "react-dom"; // Untuk React Portal
import { loginUser } from "@/app/utils/api";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    admin_username: "",
    admin_email: "",
    admin_password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setIsModalOpen(true); // Buka modal setelah login berhasil
      }
    },
    onError: () => {
      alert("Login gagal. Periksa kembali username, email, dan password.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData); // Panggil API login
  };

  const closeModal = () => {
    setIsModalOpen(false); // Tutup modal
    router.push("/Admin/Beranda"); // Redirect ke halaman admin
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DFF2EB]">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto text-[#050315]">
            Login
          </h2>
          {mutation.isError && (
            <p className="text-red-500 text-center">Login gagal</p>
          )}
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
              <div className="text-right mt-1">
                <Link
                  href="/forgotpassword"
                  className="text-sm text-[#7AB2D3] hover:text-[#4A628A]"
                >
                  Lupa password?
                </Link>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="form-control mt-4">
              <button
                className={`btn bg-[#B9E5E8] text-[#050315] border-none hover:bg-[#7AB2D3] ${
                  mutation.isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Link untuk Register */}
          <p className="text-center text-sm mt-2 text-[#050315]">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-[#7AB2D3] hover:text-[#4A628A]"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>

      {/* Modal (Portal) */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-bold text-[#050315] mb-4">
                Login Berhasil
              </h3>
              <p className="text-[#050315] mb-4">
                Anda akan dialihkan ke halaman admin.
              </p>
              <div className="flex justify-end">
                <button
                  name="ok"
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
};

export default Login;
