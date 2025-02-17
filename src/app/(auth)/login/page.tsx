"use client"; // Wajib karena ada useState & React Query

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/utils/api";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        router.push("/Admin/ListAlat");
      }
    },
    onError: () => {
      alert("Login gagal. Periksa kembali email dan password.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData); // Panggil API login
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto">Login</h2>
          {mutation.isError && <p className="text-red-500 text-center">Login gagal</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Masukkan email"
                className="input input-bordered"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                className="input input-bordered"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary" disabled={mutation.isPending}>
                {mutation.isPending ? "Logging in..." : "Login"}
              </button>
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
