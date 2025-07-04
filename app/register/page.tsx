"use client";
import supabase from "@/lib/db";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Register user with Supabase
    const { error } = await supabase
      .from("users")
      .insert([
        {
          username: form.name,
          password: form.password,
          email: form.email,
          no_telpon: form.phone_number,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error registering user:", error);
      setLoading(false);
      return;
    }
    window.location.href = "/";
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background-home-desktop.svg')" }}
    >
      <nav
        className="fixed z-[200] w-full p-6 md:p-8 px-8 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <div className="flex items-center gap-4 shadow-xs">
          <Link href="/" className="font-heading text-4xl">
            TolongYuk!
          </Link>
        </div>
        <div className="flex items-center gap-4 shadow-xs">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
            <Link href="/login" className="hover:underline px-4">
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6"
        style={{
          backgroundImage: "url('/images/background-home-no-noise.svg')",
        }}
      >
        <div className="bg-white/75 flex flex-col border-1 gap-4 border-white backdrop-blur-sm rounded-2xl w-full p-4 max-w-[90%] md:max-w-[40rem]">
          <h1 className="text-2xl md:text-3xl font-bold text-[#163760] text-center mb-6 md:mb-12">
            Daftar
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-[#163760] font-semibold mb-1 text-sm md:text-base">
                Nama
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Masukkan Nama"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2 text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1 text-sm md:text-base">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Masukkan Email"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2 text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1 text-sm md:text-base">
                Nomor Telepon
              </label>
              <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
                placeholder="Masukkan Nomor Telepon"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2 text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1 text-sm md:text-base">
                Kata Sandi
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Masukkan Kata Sandi"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2 text-sm md:text-base"
              />
            </div>
            <div className="flex justify-center mt-8 md:mt-12">
              <button
                type="submit"
                className="px-6 md:px-12 bg-[#93CBDC] text-[#163760] text-lg md:text-xl font-semibold py-2 rounded-full shadow hover:bg-[#7fbccf] transition-colors"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Daftar"}
              </button>
            </div>
          </form>
          <div className="text-center text-xs md:text-sm text-[#163760]">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="font-semibold text-[#163760] underline hover:text-[#0f2f5c]"
            >
              Masuk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
